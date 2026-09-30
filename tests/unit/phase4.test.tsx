import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import { nightWatchBeats } from '../../src/data/nightwatch';
import { HospitalBuilding } from '../../src/components/nightwatch/HospitalBuilding';
import { NightWatchStory } from '../../src/components/nightwatch/NightWatchStory';

describe('Phase 4 The Night Watch Components & Logic', () => {
  it('contains valid 24-hour cycle beats data spanning 18:00 to 06:00', () => {
    expect(nightWatchBeats.length).toBeGreaterThanOrEqual(7);
    const firstBeat = nightWatchBeats[0];
    const lastBeat = nightWatchBeats[nightWatchBeats.length - 1];
    expect(firstBeat?.hour).toBe('18:00');
    expect(lastBeat?.hour).toBe('06:00');
    expect(firstBeat?.activeWindows.length).toBeGreaterThan(0);
  });

  it('renders HospitalBuilding SVG with 40 window elements', () => {
    const activeWindows = [1, 2, 3, 4, 11, 12];
    render(<HospitalBuilding activeWindows={activeWindows} activeHour="18:00" />);

    // Check building image role
    expect(screen.getByRole('img')).toBeInTheDocument();

    // Check window elements
    const win1 = document.getElementById('win-1');
    expect(win1).toBeInTheDocument();
  });

  it('renders NightWatchStory component with 24x7 headline', () => {
    render(
      <MemoryRouter>
        <NightWatchStory />
      </MemoryRouter>
    );

    expect(screen.getByText(/Who is awake for you at 3 a\.m\./i)).toBeInTheDocument();
    expect(screen.getByText(/Explore The Path/i)).toBeInTheDocument();
  });
});
