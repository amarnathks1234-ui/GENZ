import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="auth-container">
      <div className="auth-header">
        <Link href="/" className="brand-logo">
          NEXORA
        </Link>
        <div>
          <span className="brand-badge">Join Membership</span>
        </div>
      </div>
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
}
