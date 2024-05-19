let multer = require("multer")




const https = require('https');
const fs = require('fs');







const region=process.env.REGION;
const baseHostName=process.env.BASE_HOSTNAME;
const accessKey=process.env.ACCESS_KEY;
const storageZoneName=process.env.STORAGE_ZONE_NAME;
const hostName=region?`${region}.${baseHostName}`:baseHostName;
const imgUrl=process.env.IMGURL;



exports.uploadFile = (file) => {
console.log(file,"in the services ")
    let path;
  
     
      path = `prescriptions/${file.originalname}`;
    
  
  return new Promise((resolve, reject) => {
    const options = {
      method: 'PUT',
      host: hostName,
      path: `/${storageZoneName}/${path}`,
      headers: {
        AccessKey: accessKey,
        'Content-Type': 'application/octet-stream',
      },
    };
   

    const req = https.request(options, (res) => {
      res.on('data', () => {}); 
      res.on('end', () => {
        const imageUrl = `${imgUrl}/${path}`;
        resolve(imageUrl);
      });
    });

    req.on('error', (error) => {
      console.error(error?.message);
      reject('Error occurred during upload');
    });

    req.write(file.buffer);
    req.end();
  });
};
