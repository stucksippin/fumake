import { S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
    region: 'us-east-1', // фиктивно, MinIO не использует регион
    endpoint: 'https://minio.event-hub.space', // адрес MinIO API (через Traefik, порт 9000)
    forcePathStyle: true, // ВАЖНО: MinIO использует путь, а не поддомен
    credentials: {
        accessKeyId: process.env.MINIO_ROOT_USER,
        secretAccessKey: process.env.MINIO_ROOT_PASSWORD,
    },
});

export default s3Client;
