const fs = require("fs");
const { generateFileHash } = require("../services/hashService");
const { uploadToIPFS } = require("../services/ipfsService");
const { contract } = require("../config/blockchain");
const { generateQRCode } = require("../services/qrService");

const Institute = require("../models/Institute");
const Student = require("../models/Student");
const Certificate = require("../models/Certificate");

/**
 * ISSUE CERTIFICATE
 * Only APPROVED institute can issue
 * Certificate is linked to student + blockchain + IPFS
 */
const issueCertificate = async (req, res) => {
  try {
    // 0️⃣ Validate file
    if (!req.file) {
      return res.status(400).json({ message: "Certificate PDF required" });
    }

    // 1️⃣ Institute from JWT
    const instituteId = req.user.instituteId;
    const institute = await Institute.findById(instituteId);

    if (!institute || institute.status !== "APPROVED") {
      return res.status(403).json({ message: "Institute not approved" });
    }

    // 2️⃣ Wallet ownership check
    if (
      institute.walletAddress.toLowerCase() !==
      contract.runner.address.toLowerCase()
    ) {
      return res.status(403).json({
        message: "Wallet mismatch. Unauthorized issuer"
      });
    }

    // 3️⃣ Validate request body
    const {
      studentId,               // roll number
      type,                    // DIGITAL / PHYSICAL
      title,                   // Certificate title
      certificateCategory      // DEGREE / MARKSHEET etc.
    } = req.body;

    if (!studentId || !type || !certificateCategory) {
      return res.status(400).json({
        message: "studentId, type and certificateCategory are required"
      });
    }

    // 4️⃣ Validate student belongs to institute
    const student = await Student.findOne({
      studentId,
      instituteId
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found in this institute"
      });
    }

    // 5️⃣ Prepare file
    const certId = `CERT-${Date.now()}`;
    const filePath = req.file.path;
    const fileBuffer = fs.readFileSync(filePath);

    // 6️⃣ Hash generation
    const sha256Hash = generateFileHash(filePath);

    // 7️⃣ Upload to IPFS
    const ipfsCID = await uploadToIPFS(fileBuffer);

    // 8️⃣ Store on blockchain
    const tx = await contract.issueCertificate(
      certId,
      sha256Hash,
      ipfsCID
    );
    await tx.wait();

    // 🔟 Generate Verify URL + QR
    const verifyURL = `${process.env.BASE_URL}/api/public/verify/${certId}`;
    const qrCode = await generateQRCode(verifyURL);

    // 9️⃣ Store in MongoDB (WITH QR + VERIFY)
    const certificate = await Certificate.create({
      certId,
      certificateCategory,
      type,
      title,
      studentId: student._id,
      instituteId,
      sha256Hash,
      ipfsCID,
      ipfsURL: `https://green-decisive-rat-768.mypinata.cloud/ipfs/${ipfsCID}`,
      blockchainTx: tx.hash,
      verifyURL,
      qrCode,
      issuedAt: new Date()
    });


    // 🧹 Cleanup
    fs.unlinkSync(filePath);

    // ✅ Response
    res.json({
      message: "Certificate issued successfully",
      certId: certificate.certId,
      certificateCategory,
      verifyURL,
      qrCode,
      student: {
        name: student.name,
        rollNumber: student.studentId,
        program: student.program,
        department: student.department
      },
      ipfsURL: certificate.ipfsURL,
      blockchainTx: tx.hash,
      contractAddress: process.env.CONTRACT_ADDRESS
    });

  } catch (error) {
    console.error("Issue Certificate Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  issueCertificate
};
