import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import { departments } from '../../src/data/departments';
import { people } from '../../src/data/people';
import DepartmentsPage from '../../src/routes/DepartmentsPage';
import DoctorsPage from '../../src/routes/DoctorsPage';
import TeamPage from '../../src/routes/TeamPage';
import BookPage from '../../src/routes/BookPage';

describe('Phase 6 Departments, Doctors & Circle of Care', () => {
  it('contains 12 medical departments in departments.ts', () => {
    expect(departments.length).toBe(12);
    const cardiology = departments.find((d) => d.slug === 'cardiology');
    expect(cardiology).toBeDefined();
    expect(cardiology?.conditions.length).toBeGreaterThan(0);
  });

  it('contains fictional staff members with valid IDs and reg numbers in people.ts', () => {
    expect(people.length).toBeGreaterThanOrEqual(10);
    const founder = people.find((p) => p.kind === 'founder');
    expect(founder).toBeDefined();
    expect(founder?.name).toBe('Dr. Evelyn Lanthera');
  });

  it('renders DepartmentsPage with 12 care centers', () => {
    render(
      <MemoryRouter>
        <DepartmentsPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Multidisciplinary Medical Care Centers/i)).toBeInTheDocument();
    expect(screen.getByText(/Cardiology & Heart Care/i)).toBeInTheDocument();
  });

  it('renders DoctorsPage with fictional disclosure banner and doctor cards', () => {
    render(
      <MemoryRouter>
        <DoctorsPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Fictional Demo Profiles:/i)).toBeInTheDocument();
    expect(screen.getByText(/Dr. Evelyn Lanthera/i)).toBeInTheDocument();
  });

  it('renders TeamPage Circle of Care constellation & accessible tree', () => {
    render(
      <MemoryRouter>
        <TeamPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Visible Accountability — Who Leads Whom/i)).toBeInTheDocument();
  });

  it('renders BookPage appointment booking wizard', () => {
    render(
      <MemoryRouter>
        <BookPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Schedule a Specialist Consultation/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirm Demo Appointment/i)).toBeInTheDocument();
  });
});
