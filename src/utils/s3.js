require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})
const multer = require('multer');
const multerS3 = require('multer-s3');

const upload = multer({
  storage: multerS3({
      s3: s3,
      acl: "public-read",
      bucket: bucketName,
      key: function (req, file, cb) {
          console.log(file);
          cb(null, file.originalname)
      }
  })
})


exports.upload = upload

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile


// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream



// Delete File from S3
const deleteFile = async (fileKey) => {
  console.log("DeleteFileKey", fileKey)
  const deleteParams = {
    Key: fileKey,
    Bucket: bucketName
  }
  return s3.deleteObject(deleteParams).promise();
}

exports.deleteFile = deleteFile