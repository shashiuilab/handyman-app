'use server';

import connectDB from '@/config/database';
import User from '@/models/Users';
import Job from '@/models/Jobs';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

export async function getNearbyHandymen({ category, postcode }) {
  await connectDB();

  console.log('Searching for handymen:', {
    category,
    postcode,
    categoryRegex: new RegExp(`^${category}$`, 'i'),
    addressRegex: new RegExp(postcode, 'i'),
  });

  const handymenRes = await User.find({
    role: 'handyman',
    available: true,
    services: { $in: [new RegExp(`^${category}$`, 'i')] },
    address: { $regex: postcode, $options: 'i' }, // optional for testing
  }).lean();
  const handymen = handymenRes.map(handyman => ({
    ...handyman,
    _id: handyman._id.toString(),
  }));

  return handymen;
}

export async function sendJobRequest({ jobId, handymanId }) {
    await connectDB();
  
    const sessionUser = await getSessionUser();
    if (!sessionUser?.userId) throw new Error('Unauthorized');
  
    // Fetch the job as a Mongoose document
    const job = await Job.findById(jobId);
    if (!job) throw new Error('Job not found');
  
    // Update the job
    job.handymanId = handymanId;
    job.status = 'requested';
    await job.save();
  
    // Optional: trigger revalidation of dashboards
    revalidatePath('/user/jobs');
    revalidatePath('/handyman/dashboard');
  
    // Convert to plain object for Client Component
    const plainJob = job.toObject();
    plainJob._id = job._id.toString();
    plainJob.userId = job.userId.toString();
    if (job.handymanId) plainJob.handymanId = job.handymanId.toString();
    plainJob.createdAt = job.createdAt.toISOString();
    plainJob.updatedAt = job.updatedAt.toISOString();
  
    return plainJob;
  }
