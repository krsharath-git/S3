import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
const s3 = new S3Client({region : 'us-east-1'});
import fs from 'fs';

class Main {
    async start(){        
        const command = new GetObjectCommand({
            Bucket: "cf-templates-lx04lsd8m7w-us-east-1",        
            Key: "index.html"         
        });
        let objectData = await this.getObject(command) 
        console.log('data', objectData);
        fs.promises.writeFile('D:/Project/Script/app.js', JSON.stringify(objectData));
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