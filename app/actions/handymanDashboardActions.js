'use server';

import connectDB from '@/config/database';
import Job from '@/models/Jobs';
import User from '@/models/Users';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

// Fetch all jobs assigned/requested for a handyman
export async function getAssignedJobs() {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser?.userId) throw new Error('Unauthorized');

  const jobs = await Job.find({
    handymanId: sessionUser.userId,
    status: { $in: ['requested', 'accepted'] },
  }).select('category description status images')
    .populate('userId', 'username email')
    .lean();

  // Convert ObjectIds to strings
  return jobs.map(j => ({
    ...j,
    _id: j._id.toString(),
    handymanId: j.handymanId?.toString() || null,
    userId: j.userId?._id?.toString() || null,
  }));
}

// Toggle availability for handyman
export async function toggleAvailability(available) {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser?.userId) throw new Error('Unauthorized');

  await User.findByIdAndUpdate(sessionUser.userId, { available });
  revalidatePath('/handyman/dashboard');
}

// Accept or reject a job
export async function updateJobStatus(jobId, status) {
  await connectDB();

  if (!['accepted', 'rejected'].includes(status))
    throw new Error('Invalid status');

  await Job.findByIdAndUpdate(jobId, { status });
  revalidatePath('/handyman/dashboard');
}
