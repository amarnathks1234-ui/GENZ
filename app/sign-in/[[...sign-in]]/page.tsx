import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="auth-container">
      <div className="auth-header">
        <Link href="/" className="brand-logo">
          NEXORA
        </Link>
        <div>
          <span className="brand-badge">Member Portal</span>
        </div>
      </div>
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  );
}
