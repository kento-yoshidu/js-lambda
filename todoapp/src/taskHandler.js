import { DynamoDB } from "aws-sdk";
import crypt from "crypto"

export async function list(event, context) {
  const dynamoDB = new DynamoDB({
    region: "ap-northeast-1"
  })

  const result = await dynamoDB.scan({
    TableName: "tasks",
  }).promise()

  const tasks = result.Items.map((item) => {
    return {
      id: item.id.S,
      title: item.title.S
    }
  })

  return { tasks: tasks }
}

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
