import AWS from 'aws-sdk'

import {
  AWS_ACCESS_KEY_ID,
  AWS_BUCKET_NAME,
  AWS_S3_ENDPOINT,
  AWS_SECRET_ACCESS_KEY,
} from '../config'

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID!,
    secretAccessKey: AWS_SECRET_ACCESS_KEY!,
  },
  endpoint: `${AWS_S3_ENDPOINT}${AWS_BUCKET_NAME}
  `,
  s3ForcePathStyle: true,
})

export const uploadAudio = (filename: any, file: any) => {
  return new Promise((resolve, reject) => {
    const params = {
      Key: filename,
      Bucket: AWS_BUCKET_NAME!,
      Body: file,
      ContentType: 'audio/mpeg',
      ACL: 'public-read',
    }

    s3.upload(params, (err: any, data: { Location: unknown }) => {
      if (err) {
        reject(err)
      } else {
        resolve(data.Location)
      }
    })
  })
}
