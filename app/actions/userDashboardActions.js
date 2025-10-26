'use server';

import connectDB from '@/config/database';
import Job from '@/models/Jobs';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { toPlainObject } from '@/utils/convertToObject';

// Fetch jobs created by the current user
export async function getUserJobs() {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser?.userId) throw new Error('Unauthorized');

  const jobs = await Job.find({ userId: sessionUser.userId })
  .select('category description status images')
    .populate('handymanId', 'username image phone')
    .lean();

    return toPlainObject(
        jobs.map(j => ({
          ...j,
          _id: j._id?.toString(),
          handymanId: j.handymanId
            ? {
                ...j.handymanId,
                _id: j.handymanId._id?.toString(),
              }
            : null,
        }))
      );
}
