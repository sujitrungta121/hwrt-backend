
const axios = require("axios");
const UploadService = require("../services/uploadImage");

const region = process.env.REGION;
const accessKey = process.env.ACCESS_KEY;
const baseHostName = process.env.BASE_HOSTNAME;
const hostName = region ? `${region}.${baseHostName}` : baseHostName;
const storageZoneName = process.env.STORAGE_ZONE_NAME;
exports.uploadImage = async (req, res) => {
  try {
    console.log(req.body, "printing the body of the request");
    
    const file = req.file;
   console.log(file,"printign hte file")
    let uploadData = await UploadService.uploadFile(file);
    

    console.log(uploadData, "Printing upload data");

    return res.send({
      success: true,
      message: "Upload successful",
      imageUrl: uploadData,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Error uploading image" });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    // console.log(req.userId, req.userType, req, "printing the req data");

   
    const fileName = req.body.fileName;

    // if (!userId)
    //   return res.status(400).json({ message: "user id is required" });
    // console.log(userId, "in the user id");
    // if (userType !== 1)
    //   return res.status(400).json({ message: "you cannot delete the store" });
    // console.log(userType, "printing the user type");
    if (!fileName)
      return res
        .status(400)
        .json({ message: "File name is required to delete the file" });
    console.log(fileName, "printing thee file name");

    

   

 
      path = `${storageZoneName}/${fileName}`;
    

    const options = {
      method: "DELETE",
      host: hostName,
      url: `https://${hostName}/${path}`,
      headers: { AccessKey: accessKey },
    };
    console.log(options, "printing options");
    axios
      .request(options)
      .then(function (response) {
        return res
          .status(200)
          .json({ message: "File deleted Successfully", data: response.data });
      })
      .catch(function (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Error deleting image" });
  }
};


