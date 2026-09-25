import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { ShieldCheck, ArrowRight, Activity, Lock, Users, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {/* Navigation Header */}
      <nav className="app-nav">
        <div className="nav-left">
          <Link href="/" className="brand-logo" style={{ marginBottom: 0 }}>
            NEXORA
          </Link>
        </div>
        <div className="nav-right">
          <SignedIn>
            <Link href="/dashboard" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
              Member Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
              Sign In
            </Link>
            <Link href="/sign-up" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
              Get Started
            </Link>
          </SignedOut>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="landing-hero">
        <div className="hero-tag">
          <Sparkles size={14} /> Next.js + Clerk Auth Engine
        </div>

        <h1 className="hero-title">
          Empowering Member Training & Mastery.
        </h1>

        <p className="hero-desc">
          Secure, authenticated portal with dedicated member status tracking, exclusive training history, and pro performance analytics.
        </p>

        <div className="hero-actions">
          <SignedIn>
            <Link href="/dashboard" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '15px' }}>
              Open Member Dashboard <ArrowRight size={18} />
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '15px' }}>
              Sign In to Member Portal <ArrowRight size={18} />
            </Link>
            <Link href="/sign-up" className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '15px' }}>
              Create Account
            </Link>
          </SignedOut>
        </div>

        {/* Feature Highlights Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          maxWidth: '1000px',
          width: '100%',
          marginTop: '64px',
          textAlign: 'left'
        }}>
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ color: 'var(--accent-blue)', marginBottom: '12px' }}>
              <Lock size={24} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>Clerk Route Protection</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Middleware-level route guarding automatically redirects unauthenticated traffic from <code>/dashboard</code> to <code>/sign-in</code>.
            </p>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <div style={{ color: 'var(--accent-blue)', marginBottom: '12px' }}>
              <Users size={24} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>Membership Status</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Live member identification, verified account status badge, and renewal timeline for subscribers.
            </p>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <div style={{ color: 'var(--accent-blue)', marginBottom: '12px' }}>
              <Activity size={24} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>Training History</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Full history placeholder for completed training modules, mastery streaks, scores, and active curriculum progress.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
