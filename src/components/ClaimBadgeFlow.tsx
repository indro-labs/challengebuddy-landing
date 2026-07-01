import { useState, type KeyboardEvent } from 'react';
import Avatar from './Avatar';
import PixelIcon from './PixelIcon';
import type { AnimalType } from '../lib/pixelArt';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export type FlowStep = 'character' | 'email' | 'confirm';

const ANIMALS: { key: AnimalType; label: string }[] = [
  { key: 'cat', label: 'CAT' },
  { key: 'bear', label: 'BEAR' },
  { key: 'dog', label: 'DOG' },
];

const COLORS = [
  { name: 'pink', hex: '#f472b6' },
  { name: 'blue', hex: '#38bdf8' },
  { name: 'green', hex: '#34d399' },
  { name: 'purple', hex: '#a78bfa' },
  { name: 'orange', hex: '#fb923c' },
  { name: 'yellow', hex: '#fbbf24' },
  { name: 'red', hex: '#f87171' },
  { name: 'magenta', hex: '#e879f9' },
];

interface Props {
  step: FlowStep;
  animal: AnimalType;
  color: string;
  onSelectAnimal: (a: AnimalType) => void;
  onSelectColor: (c: string) => void;
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
  count: number;
  onSuccess: () => void;
}

export default function ClaimBadgeFlow({
  step, animal, color, onSelectAnimal, onSelectColor, onNext, onBack, onClose, count, onSuccess,
}: Props) {
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

  return (
    <div className="flow-overlay">
      <div className="flow-header">
        <div className="navbar-logo">
          <div className="navbar-logo-icon">
            <PixelIcon icon="trophy" color="#ffffff" size={20} />
          </div>
          <span className="navbar-logo-text">ChallengeBuddy</span>
        </div>
        <button className="flow-close" onClick={onClose} aria-label="Close">
          <PixelIcon icon="plus" color="#6b5b8e" size={14} />
        </button>
      </div>

      <div className="flow-body">
        {step === 'character' && (
          <>
            <div className="section-eyebrow" style={{ color: '#7c3aed', textAlign: 'center' }}>▸ STEP 1 OF 2 ◂</div>
            <h2 className="section-h2" style={{ textAlign: 'center', marginBottom: 14 }}>Pick your buddy.</h2>
            <p className="how-body" style={{ textAlign: 'center', marginBottom: 34 }}>Choose your animal and color. This is the buddy that unlocks your Stampede badge.</p>

            <div className="animal-picker">
              {ANIMALS.map(a => (
                <button
                  key={a.key}
                  className={`animal-card${a.key === animal ? ' selected' : ''}`}
                  onClick={() => onSelectAnimal(a.key)}
                >
                  <Avatar animal={a.key} color={color} size={84} />
                  <div className="animal-card-label">{a.label}</div>
                </button>
              ))}
            </div>

            <div className="color-picker">
              {COLORS.map(c => (
                <button
                  key={c.name}
                  className={`color-swatch${c.hex === color ? ' selected' : ''}`}
                  style={{ background: c.hex }}
                  onClick={() => onSelectColor(c.hex)}
                  aria-label={c.name}
                />
              ))}
            </div>

            <button className="btn-waitlist" onClick={onNext}>Next →</button>
          </>
        )}

        {step === 'email' && (
          <>
            <div className="section-eyebrow" style={{ color: '#7c3aed', textAlign: 'center' }}>▸ STEP 2 OF 2 ◂</div>
            <h2 className="section-h2" style={{ textAlign: 'center', marginBottom: 14 }}>Reserve your badge.</h2>
            <p className="how-body" style={{ textAlign: 'center', marginBottom: 28 }}>Enter your email so we know where to send it.</p>

            <div className="flow-preview">
              <Avatar animal={animal} color={color} size={100} />
            </div>

            <div className="form-row" style={{ maxWidth: 420 }}>
              <input
                type="email"
                className="form-input"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={onKey}
                disabled={loading}
              />
            </div>
            {error && (
              <div style={{ fontFamily: 'Nunito', fontSize: 13, color: '#f87171', marginBottom: 8 }}>{error}</div>
            )}
            <button className="btn-waitlist" onClick={submit} disabled={loading}>
              {loading ? '...' : 'Reserve my badge'}
            </button>
            <div>
              <button className="flow-back-link" onClick={onBack}>← Back</button>
            </div>
          </>
        )}

        {step === 'confirm' && (
          <div className="flow-confirm">
            <div className="flow-preview">
              <Avatar animal={animal} color={color} size={140} crown />
            </div>
            <div className="section-eyebrow" style={{ color: '#34d399', textAlign: 'center' }}>▸ WELCOME ABOARD ◂</div>
            <h2 className="section-h2" style={{ textAlign: 'center', marginBottom: 18 }}>You're in.</h2>
            <p className="how-body" style={{ textAlign: 'center', maxWidth: 480, margin: '0 auto 28px' }}>
              Your Stampede badge is reserved. We will send your login the moment ChallengeBuddy launches.
            </p>
            <div className="success-tag" style={{ marginBottom: 28 }}>YOU ARE #{count} IN LINE</div>
            <div>
              <button className="btn-waitlist" onClick={onClose}>Done</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
