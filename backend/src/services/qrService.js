const QRCode = require("qrcode");

/**
 * Generate QR code (base64)
 */
const generateQRCode = async (data) => {
  try {
    const qr = await QRCode.toDataURL(data);
    return qr;
  } catch (error) {
    throw new Error("QR generation failed");
  }
};

module.exports = {
  generateQRCode
};
