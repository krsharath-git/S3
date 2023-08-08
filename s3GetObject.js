import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";
const s3 = new S3Client({region : 'us-east-1'});
const sts = new STSClient({region : 'us-east-1'});
import fs from 'fs';

class Main {
    async start(){
        const input = {
            "ExternalId": "123ABC",
            "RoleArn": "arn:aws:iam::175078736521:role/LambdaExecutionRole",
            "RoleSessionName": "testAssumeRoleSession",
            "Tags": [
                {
                "Key": "Project",
                "Value": "GetObject"
                }
            ]
        };
        let creds = await this.getCreds(input)
        const command = new GetObjectCommand({
            Bucket: "cf-templates-lx04lsd8m7w-us-east-1",        
            Key: "index.html"         
        });
        // let objectData = await this.getObject(command) 
        // console.log('data', objectData);
        // fs.promises.writeFile('D:/Project/Script/app.js', JSON.stringify(objectData));
    }

    async getCreds(input){       
          const command = new AssumeRoleCommand(input);
          const response = await sts.send(command);
          console.log('creds details', response);          
    }
    getObject(params){
        return new Promise(async(resolve, reject) => {
            try{
                let response = await s3.send(params)
                // console.log('response', response);               
                let data = await response.Body.transformToString(); 
                resolve(data);                               
            } catch(err){
                console.log('error', err.stack);
            }
        })
    }
}

let main = new Main()
main.start();