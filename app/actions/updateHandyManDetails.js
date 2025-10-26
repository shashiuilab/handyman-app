'use server';

import connectDB from '@/config/database';
import User from '@/models/Users';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function updateHandyManDetails(formData) {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('Unauthorized: No user session found');
  }

  const { userId } = sessionUser;

  // Extract form data
  const services = formData.getAll('services');
  const hourlyRate = formData.get('rates.hourly');
  const username = formData.get('service_name');
  const email = formData.get('service_email');
  const phone = formData.get('service_phone');
  const experience = formData.get('service_experience');
  const available = formData.get('service_available') === 'true';
  console.log(available, formData.get('service_available'));

  const address = `${formData.get('location.street') || ''}, ${formData.get('location.city') || ''}, ${formData.get('location.state') || ''}, ${formData.get('location.zipcode') || ''}`;

  // Update the handyman details
  await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        username,
        email,
        phone,
        address,
        services,
        rate: hourlyRate,
        experience,
        available,
        role: 'handyman', // ensure role is updated
      },
    },
    { new: true }
  );

  // Revalidate and redirect
  revalidatePath('/profile/handyman');
  redirect('/dashboard/handyman');
}
