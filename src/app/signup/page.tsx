
import { SignUpForm } from '@/app/components/auth/sign-up-form';
import { Logo } from '@/app/components/shared/logo';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
       <div className="absolute top-8 left-8">
        <Logo />
      </div>
      <SignUpForm />
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/signin" className="underline hover:text-primary">
          Sign In
        </Link>
      </p>
    </div>
  );
}
