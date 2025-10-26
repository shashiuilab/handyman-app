import { authOptions } from '@/utils/authOptions';
import NextAuth from 'next-auth/next';

const handler = NextAuth(authOptions);

console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET);

export { handler as GET, handler as POST };
