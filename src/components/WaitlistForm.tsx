import { useState, type KeyboardEvent } from 'react';
import PixelIcon from './PixelIcon';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

interface Props {
  count: number;
  onSuccess: () => void;
  submitted: boolean;
  variant?: 'hero' | 'cta';
}

export default function WaitlistForm({ count, onSuccess, submitted, variant = 'hero' }: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    if (!email || !email.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        onSuccess();
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit();
  };

  if (submitted) {
    if (variant === 'cta') {
      return (
        <div className="success-box-sm">
          <div className="success-title-sm">You're in!</div>
          <div className="success-sub-sm">We'll reach out when it's launch day.</div>
          <div className="success-tag">FOUNDER SPOT SECURED ✓</div>
        </div>
      );
    }
    return (
      <div className="success-box">
        <div className="success-icon">
          <PixelIcon icon="check" color="#34d399" size={34} />
        </div>
        <div>
          <div className="success-title">You're on the list!</div>
          <div className="success-sub">We'll email you the day ChallengeBuddy launches.</div>
        </div>
        <div className="success-tag">YOU ARE #{count} IN LINE</div>
      </div>
    );
  }

  return (
    <div>
      <div className="form-row" style={variant === 'cta' ? { maxWidth: 450 } : undefined}>
        <input
          type="email"
          className="form-input"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={onKey}
          disabled={loading}
          style={variant === 'cta' ? { borderColor: '#c4b0f0' } : undefined}
        />
        <button className="btn-waitlist" onClick={submit} disabled={loading}>
          {loading ? '...' : variant === 'cta' ? "I'm In →" : 'Join Waitlist →'}
        </button>
      </div>
      {error && (
        <div style={{ fontFamily: 'Nunito', fontSize: 13, color: '#f87171', marginBottom: 8 }}>
          {error}
        </div>
      )}
      {variant === 'hero' ? (
        <div className="form-note">
          <PixelIcon icon="lock" color="#b0a4cc" size={10} />
          No spam ever · {count}+ people already in line
        </div>
      ) : (
        <div style={{ fontFamily: 'Silkscreen', fontSize: 9, color: '#8b7caa', letterSpacing: 1 }}>
          {count}+ early members and counting
        </div>
      )}
    </div>
  );
}
