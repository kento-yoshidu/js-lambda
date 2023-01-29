import { DynamoDB } from "aws-sdk";
import crypt from "crypto"

export async function post(event, context) {
  const requestBody = JSON.parse(event.body);

  const item = {
    id: { S: crypt.randomUUID() },
    title: { S: requestBody.title }
  }

  const dynamoDB = new DynamoDB({
    region: "ap-northeast-1"
  })

  await dynamoDB.putItem({
    TableName: "tasks",
    Item: item
  }).promise()

  return item
}
