import { cloudinary } from '../../config/cloudinary.config';
import { UploadApiResponse } from 'cloudinary';

export const uploadToCloudinary = async (
  file: Express.Multer.File,
  folder: string,
): Promise<UploadApiResponse> => {
  console.log('📤 Uploading file to Cloudinary...');
  console.log('🧾 File info:', {
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
  });

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error || !result) {
          console.error('❌ Cloudinary upload error:', error || 'No result');
          return reject(error || new Error('Upload failed without error'));
        }

        console.log('✅ Cloudinary upload success:', {
          public_id: result.public_id,
          url: result.secure_url,
        });

        resolve(result); 
      },
    );

    uploadStream.end(file.buffer);
  });
};
