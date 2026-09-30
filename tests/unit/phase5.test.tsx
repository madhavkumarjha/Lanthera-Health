import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import { journeyPaths } from '../../src/data/path';
import { initialWaitTokens, boardStages } from '../../src/data/board';
import PathPage from '../../src/routes/PathPage';
import BoardPage from '../../src/routes/BoardPage';
import FamiliesPage from '../../src/routes/FamiliesPage';

describe('Phase 5 The Path & Waiting Room Live Components', () => {
  it('contains 5 detailed journey paths in path.ts dataset', () => {
    expect(journeyPaths.length).toBe(5);
    const ids = journeyPaths.map((j) => j.id);
    expect(ids).toEqual(['emergency', 'surgery', 'daycare', 'maternity', 'outpatient']);
  });

  it('renders PathPage with 5 journey selectors and timeline stops', () => {
    render(
      <MemoryRouter>
        <PathPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/What happens next — Step by Step/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Emergency & Trauma Journey/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Planned Surgical Admission/i)).toBeInTheDocument();
  });

  it('contains valid initial wait tokens and 4 stage definitions in board.ts', () => {
    expect(initialWaitTokens.length).toBeGreaterThanOrEqual(6);
    expect(Object.keys(boardStages)).toEqual(['prep', 'procedure', 'recovery', 'ready']);
  });

  it('renders BoardPage with status tokens and supports TV Mode toggle', () => {
    render(
      <MemoryRouter>
        <BoardPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Family Status Board — Real-Time Updates/i)).toBeInTheDocument();
    expect(screen.getAllByText(/L-204/i)[0]).toBeInTheDocument();

    // Toggle TV mode
    const tvButton = screen.getByRole('button', { name: /TV \/ Large-Screen Mode/i });
    fireEvent.click(tvButton);
    expect(screen.getByRole('button', { name: /Exit TV Mode/i })).toBeInTheDocument();
  });

  it('renders FamiliesPage hub with link to Waiting Room Live Board', () => {
    render(
      <MemoryRouter>
        <FamiliesPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Supporting Families at Every Hour/i)).toBeInTheDocument();
    expect(screen.getByText(/Open Waiting Room Live Board/i)).toBeInTheDocument();
  });
});
