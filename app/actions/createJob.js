'use server';

import connectDB from '@/config/database';
import Job from '@/models/Jobs';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import cloudinary from '@/utils/cloudinary';


export default async function createJob(formData) {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('Unauthorized');
  }

  const category = formData.get('category');
  const description = formData.get('description');
  const postcode = formData.get('postcode');
  const files = formData.getAll('images');

  let imageUrls = [];

  if (files && files.length > 0) {
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: 'job_images' }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });

      imageUrls.push(uploadResponse.secure_url);
    }
  }

  const newJob = await Job.create({
    userId: sessionUser.userId,
    category,
    description,
    postcode,
    images: imageUrls,
    status: 'open',
  });

  await newJob.save();

  return {
    success: true,
    jobId: newJob._id.toString(),
    category,
    postcode,
  };
}
