'use server';

import connectDB from '@/config/database';
import User from '@/models/Users';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function updateUserProfile(formData) {
  
  const role = formData.role;

  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;
  if (!sessionUser?.user?.email) return;

  const existingUser = await User.findById(userId);
  await connectDB();
  await User.updateOne({ email: sessionUser.user.email }, { role });
  revalidatePath('/', 'layout');
  if (role === "handyman") redirect("/profile/handyman");
  else redirect("/jobs/newjob");
}

export default updateUserProfile;
