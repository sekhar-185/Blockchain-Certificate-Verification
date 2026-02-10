const axios = require("axios");
const FormData = require("form-data");

const uploadToIPFS = async (fileBuffer) => {
  const formData = new FormData();
  formData.append("file", fileBuffer, { filename: "certificate.pdf" });

  const res = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    formData,
    {
      headers: {
        ...formData.getHeaders(),
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_API_SECRET,
      },
    }
  );

  return res.data.IpfsHash;
};

module.exports = { uploadToIPFS };
