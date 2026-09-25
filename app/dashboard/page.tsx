import { currentUser } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { 
  UserCheck, 
  ShieldCheck, 
  Activity, 
  Flame, 
  Clock, 
  Calendar, 
  Award, 
  ChevronRight, 
  Sparkles,
  BookOpen
} from 'lucide-react';

export default async function DashboardPage() {
  const user = await currentUser();

  // Redirect if unauthenticated (failsafe on top of middleware)
  if (!user) {
    redirect('/sign-in');
  }

  const memberName = 
    user.firstName && user.lastName 
      ? `${user.firstName} ${user.lastName}` 
      : user.firstName || user.username || user.emailAddresses[0]?.emailAddress.split('@')[0] || 'Member';

  const memberEmail = user.emailAddresses[0]?.emailAddress || 'No email attached';
  const memberInitials = (memberName[0] || 'N').toUpperCase();
  const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Jan 2026';

  // Placeholder data for training history
  const trainingMetrics = [
    { label: 'Completed Sessions', value: '14 Modules', icon: Award },
    { label: 'Total Training Time', value: '38.5 Hours', icon: Clock },
    { label: 'Current Streak', value: '6 Days Active', icon: Flame },
    { label: 'Skill Mastery Rate', value: '92% Score', icon: Activity },
  ];

  const trainingHistoryPlaceholder = [
    {
      id: 'TRN-101',
      title: 'E-Commerce Store Optimization & Scaling',
      category: 'Growth Mastery',
      date: 'Aug 12, 2026',
      duration: '45 mins',
      status: 'Completed',
      score: '98%',
    },
    {
      id: 'TRN-102',
      title: 'High-Converting Product Sourcing & Logistics',
      category: 'Supply Chain',
      date: 'Aug 08, 2026',
      duration: '60 mins',
      status: 'Completed',
      score: '94%',
    },
    {
      id: 'TRN-103',
      title: 'Paid Acquisition & Facebook/TikTok Ads Engine',
      category: 'Marketing',
      date: 'Jul 29, 2026',
      duration: '90 mins',
      status: 'Completed',
      score: '91%',
    },
    {
      id: 'TRN-104',
      title: 'Brand Retention & Customer Lifetime Value (LTV)',
      category: 'Customer Retention',
      date: 'Jul 15, 2026',
      duration: '50 mins',
      status: 'In Progress',
      score: '75%',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {/* Top Navbar */}
      <nav className="app-nav">
        <div className="nav-left">
          <Link href="/" className="brand-logo" style={{ marginBottom: 0 }}>
            NEXORA
          </Link>
          <ul className="nav-links-list">
            <li><Link href="/" className="nav-item-link">Storefront</Link></li>
            <li><Link href="/dashboard" className="nav-item-link active">Dashboard</Link></li>
            <li><Link href="#training" className="nav-item-link">Training</Link></li>
            <li><Link href="#membership" className="nav-item-link">Membership</Link></li>
          </ul>
        </div>
        <div className="nav-right">
          <span className="brand-badge">PRO MEMBER</span>
          <UserButton 
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox: {
                  width: '38px',
                  height: '38px',
                  border: '2px solid rgba(59, 130, 246, 0.4)',
                }
              }
            }}
          />
        </div>
      </nav>

      {/* Main Dashboard Container */}
      <main className="dashboard-container">
        {/* Welcome Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="welcome-title">
              Welcome back, {memberName}
            </h1>
            <p className="welcome-subtitle">
              Manage your member profile, review membership status, and track your ongoing training milestones.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary">
              <BookOpen size={16} /> Course Catalog
            </button>
            <button className="btn btn-primary">
              <Sparkles size={16} /> Resume Next Module
            </button>
          </div>
        </div>

        {/* Info Grid: Member Info & Membership Status */}
        <div className="dashboard-grid">
          {/* Card 1: Member Profile */}
          <div className="card card-member">
            <div className="card-head">
              <h2 className="card-title">
                <UserCheck size={18} /> Member Profile
              </h2>
              <span className="badge-tag">ID: {user.id.slice(0, 10)}...</span>
            </div>
            
            <div className="member-profile">
              <div className="member-avatar">
                {memberInitials}
              </div>
              <div className="member-details">
                <h3>{memberName}</h3>
                <p className="member-email">
                  {memberEmail}
                </p>
                <p className="member-meta">
                  Member since {joinDate} • Verified Account
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Membership Status */}
          <div id="membership" className="card card-status">
            <div className="card-head">
              <h2 className="card-title">
                <ShieldCheck size={18} /> Membership Status
              </h2>
              <div className="status-pill status-active">
                <span className="status-dot"></span>
                ACTIVE
              </div>
            </div>

            <div className="status-stats">
              <div className="stat-box">
                <div className="stat-label">Plan Tier</div>
                <div className="stat-value" style={{ color: 'var(--accent-blue)' }}>
                  VIP All-Access
                </div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Auto Renewal</div>
                <div className="stat-value">
                  Dec 31, 2026
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Training History Section */}
          <div id="training" className="card card-training">
            <div className="card-head">
              <div>
                <h2 className="card-title">
                  <Activity size={18} /> Training History & Progress
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Log of completed curriculum, active mastery modules, and performance metrics.
                </p>
              </div>
              <span className="brand-badge">UPDATED LIVE</span>
            </div>

            {/* Quick Metrics Bar */}
            <div className="metrics-row">
              {trainingMetrics.map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <div key={idx} className="metric-mini-card">
                    <div className="metric-icon-wrap">
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="stat-label">{metric.label}</div>
                      <div className="stat-value" style={{ fontSize: '15px' }}>{metric.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Training Sessions Table Placeholder */}
            <div className="training-table-wrap">
              <table className="training-table">
                <thead>
                  <tr>
                    <th>Module / Session</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Duration</th>
                    <th>Score / Progress</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {trainingHistoryPlaceholder.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="session-name">
                          <BookOpen size={14} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
                          {item.title}
                        </div>
                      </td>
                      <td>
                        <span className="badge-tag">{item.category}</span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>
                        {item.date}
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>
                        {item.duration}
                      </td>
                      <td>
                        <span style={{ fontWeight: 600, color: item.status === 'Completed' ? 'var(--accent-emerald)' : 'var(--accent-blue)' }}>
                          {item.score}
                        </span>
                      </td>
                      <td>
                        <span className={`status-pill ${item.status === 'Completed' ? 'status-active' : ''}`} style={item.status !== 'Completed' ? { background: 'rgba(59, 130, 246, 0.12)', color: 'var(--accent-blue)', border: '1px solid rgba(59, 130, 246, 0.3)' } : {}}>
                          {item.status === 'Completed' && <span className="status-dot"></span>}
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Notice */}
            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Showing 4 latest completed training records. Detailed certificates are available in your member downloads.
              </p>
              <button className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }}>
                View Full Training Log <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
