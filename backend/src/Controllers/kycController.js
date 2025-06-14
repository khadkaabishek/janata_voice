const KYCModel = require("../Models/kyc");

const handleKYC = async (req, res) => {
  try {
    const { fullName, email, phone, nid } = req.body;

    if (!fullName || !email || !phone || !nid || !req.file) {
      return res
        .status(400)
        .json({ message: "All fields and file are required" });
    }

    const newKYC = new KYCModel({
      fullName,
      email,
      phone,
      nid,
      imagePath: req.file.path,
    });

  
    await newKYC.save();

    return res
      .status(201)
      .json({ message: "KYC data saved successfully", data: newKYC });
  } catch (error) {
    // console.error("Error saving KYC:", error);
    return res
      .status(500)
      .json({ message: "Failed to save KYC data", error: error.message });
  }
};

module.exports = handleKYC;
