import { S3, PutObjectCommand } from "@aws-sdk/client-s3";
import { error } from "console";
import fs from 'fs';

const s3 = new S3({ region: "us-east-1" });
const fileToUpload = await fs.readFileSync('D:/Project/index.js', 'utf8', (err, data) => {
    if (err) {
      console.error(err); 
      return;
    }
    console.log(data);
  });
const input = {
  Body: fileToUpload,
  Bucket: "cf-templates-lx04lsd8m7w-us-east-1",
  Key: "main.js"
};
function putObject(input) {
  return new Promise(async (resolve, reject) => {
    console.log("inside getFile", input);
    try {
        const command = new PutObjectCommand(input);
        const response = await s3.send(command); 
        resolve(response);       
    } catch (error) {
        console.log(`error in uploading object to bucket ${input.Bucket}`);
        reject(error);
    }
  });
}

await putObject(input);
