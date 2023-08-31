import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
const client = new DynamoDBClient({region : 'ap-south-1'});
import fs from 'fs/promises';
import { resolve } from "path";


class Main {

    async start(){
        let fileData = [
            { id: '1', name: 'Item 1', category: 'Category A' },
            { id: '2', name: 'Item 2', category: 'Category ' }
        ]        
        let promiseArr = [];            
        for(let item of fileData){
            promiseArr.push(this.putItem(item))
        }
        let response = await Promise.allSettled(promiseArr);
        for(let res of response) {
            console.log('status : ', res.status);
        }
        console.log('putItem operation completed');  
    }
    putItem(item){
        return new Promise(async(resolve, reject) => {
            try{
                let input = {
                    "Item" : {
                        "id" : {
                            N : item.id
                        },
                        "name" : {
                            S : item.name
                        },
                        "scores" : {
                            S : item.category
                        }
                    },
                    "ReturnConsumedCapacity": "TOTAL",
                    "TableName": "Student"
                }
                const command = new PutItemCommand(input);            
                await client.send(command)                
                resolve(); 
            } catch (error){
                console.log('error in putItem ',error.stack);
            }
                           
        })    
     
    }
}

let mainObj = new Main()
mainObj.start();