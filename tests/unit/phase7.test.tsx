import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import LedgerPage from '../../src/routes/LedgerPage';
import PackagesPage from '../../src/routes/PackagesPage';
import InternationalPage from '../../src/routes/InternationalPage';
import DiagnosticsPage from '../../src/routes/DiagnosticsPage';
import { ledgerScenarios } from '../../src/data/ledger';
import { healthPackages } from '../../src/data/packages';
import { internationalDeskData } from '../../src/data/international';
import { diagnosticTests } from '../../src/data/diagnostics';

describe('Phase 7 Clear Ledger, Health Packages, International & Diagnostics', () => {
  test('ledgerScenarios contains valid indicative procedures and room multipliers', () => {
    expect(ledgerScenarios.length).toBeGreaterThanOrEqual(4);
    const first = ledgerScenarios[0]!;
    expect(first.components.length).toBeGreaterThan(0);
    expect(first.roomMultipliers.ward).toBe(1.0);
  });

  test('renders LedgerPage with pre-procedure calculator and disclaimer', () => {
    render(
      <MemoryRouter>
        <LedgerPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Transparent Financial Ledger|पारदर्शी वित्त प्रणाली/i)).toBeInTheDocument();
    expect(screen.getByText(/Calculated Indicative Total|अनुमानित कुल लागत सीमा/i)).toBeInTheDocument();
    expect(screen.getByText(/Important Compliance Disclosure|महत्वपूर्ण पारदर्शी प्रकटीकरण/i)).toBeInTheDocument();
  });

  test('renders PackagesPage with health packages and category filters', () => {
    render(
      <MemoryRouter>
        <PackagesPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Preventive Health Packages|स्वास्थ्य जांच पैकेज/i)).toBeInTheDocument();
    expect(healthPackages.length).toBeGreaterThanOrEqual(4);
    expect(screen.getByText(healthPackages[0]!.name.en)).toBeInTheDocument();
  });

  test('renders InternationalPage with 4-step care journey and services', () => {
    render(
      <MemoryRouter>
        <InternationalPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/International Patient Services|अंतरराष्ट्रीय मरीज डेस्क/i)).toBeInTheDocument();
    expect(internationalDeskData.visaSteps.length).toBe(4);
  });

  test('renders DiagnosticsPage with test directory and search filter', () => {
    render(
      <MemoryRouter>
        <DiagnosticsPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Diagnostic Imaging & Pathology Directory|डायग्नोस्टिक्स व लैब निर्देशिका/i)).toBeInTheDocument();
    expect(diagnosticTests.length).toBeGreaterThanOrEqual(6);

    const searchInput = screen.getByPlaceholderText(/Search test name or code|जांच या कोड खोजें/i);
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'MRI' } });
    expect(screen.getByText(/3T High-Definition Brain MRI/i)).toBeInTheDocument();
  });
});
