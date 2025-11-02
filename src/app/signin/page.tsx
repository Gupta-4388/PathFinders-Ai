
import { SignInForm } from '@/app/components/auth/sign-in-form';
import { Logo } from '@/app/components/shared/logo';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute top-8 left-8">
        <Logo />
      </div>
      <SignInForm />
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="underline hover:text-primary">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
