import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const REGION = process.env.R2_REGION || 'auto';
const ENDPOINT = process.env.R2_ENDPOINT || `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;

if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
  // don't throw here; routes will check and return errors — but log for dev
  console.warn('R2 access keys not set: R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY');
}

export const s3Client = new S3Client({
  region: REGION,
  endpoint: ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
  forcePathStyle: false,
});

export async function uploadObject(bucket: string, key: string, body: Uint8Array | Buffer, contentType?: string) {
  const cmd = new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: contentType });
  return s3Client.send(cmd);
}

export async function deleteObject(bucket: string, key: string) {
  const cmd = new DeleteObjectCommand({ Bucket: bucket, Key: key });
  return s3Client.send(cmd);
}

export default s3Client;
