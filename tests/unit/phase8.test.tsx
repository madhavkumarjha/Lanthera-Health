import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import UnderstandPage from '../../src/routes/UnderstandPage';
import ArticleDetailPage from '../../src/routes/ArticleDetailPage';
import PortalPage from '../../src/routes/PortalPage';
import CareersPage from '../../src/routes/CareersPage';
import AboutPage from '../../src/routes/AboutPage';
import ContactPage from '../../src/routes/ContactPage';
import SitemapPage from '../../src/routes/SitemapPage';
import AccessibilityPage from '../../src/routes/AccessibilityPage';
import DemoDisclosurePage from '../../src/routes/DemoDisclosurePage';
import { articles } from '../../src/data/articles';
import { demoReports } from '../../src/data/portal';
import { careerListings } from '../../src/data/careers';

describe('Phase 8 Patient Knowledge, Plain-Language Portal & Static Routes', () => {
  test('articles dataset contains valid 3-layer content and peer review data', () => {
    expect(articles.length).toBeGreaterThanOrEqual(2);
    const first = articles[0]!;
    expect(first.layers.s30.en).toBeDefined();
    expect(first.layers.m3.en).toBeDefined();
    expect(first.layers.deep.en).toBeDefined();
    expect(first.reviewedBy).toContain('Dr.');
  });

  test('renders UnderstandPage with knowledge articles', () => {
    render(
      <MemoryRouter>
        <UnderstandPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Patient Knowledge Library|मरीज ज्ञान केंद्र/i)).toBeInTheDocument();
    expect(screen.getByText(articles[0]!.title.en)).toBeInTheDocument();
  });

  test('renders ArticleDetailPage with 3-layer tab options', () => {
    render(
      <MemoryRouter>
        <ArticleDetailPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/30-Second Takeaway|30-सेकंड सारांश/i)).toBeInTheDocument();
    expect(screen.getByText(/3-Minute Understanding|3-मिनट की समझ/i)).toBeInTheDocument();
    expect(screen.getByText(/Deep Dive & Guidelines|गहन क्लिनिकल गाइड/i)).toBeInTheDocument();
  });

  test('renders PortalPage with plain-language lab report translator', () => {
    render(
      <MemoryRouter>
        <PortalPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Plain-Language Medical Report Explainer|सरल भाषा लैब रिपोर्ट अनुवादक/i)).toBeInTheDocument();
    expect(demoReports.length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/Serum Creatinine/i)).toBeInTheDocument();
  });

  test('renders CareersPage with clinical job opportunities', () => {
    render(
      <MemoryRouter>
        <CareersPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Careers at Lanthera Health|करियर व रोजगार/i)).toBeInTheDocument();
    expect(careerListings.length).toBeGreaterThanOrEqual(3);
  });

  test('renders AboutPage with hospital vision and NightWatchStory', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/About Lanthera Health|हमारे बारे में/i)).toBeInTheDocument();
    expect(screen.getAllByText(/The Night Watch/i).length).toBeGreaterThan(0);
  });

  test('renders ContactPage, SitemapPage, AccessibilityPage, and DemoDisclosurePage', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/24×7 Helplines|24×7 सहायता/i)).toBeInTheDocument();

    render(
      <MemoryRouter>
        <SitemapPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Complete Architecture & Route Map|संपूर्ण साइट नेविगेशन मानचित्र/i)).toBeInTheDocument();

    render(
      <MemoryRouter>
        <AccessibilityPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Accessibility Commitment|सुगमता कथन/i)).toBeInTheDocument();

    render(
      <MemoryRouter>
        <DemoDisclosurePage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Demonstration Web Application Notice|डेमो वेबसाइट प्रकटीकरण/i)).toBeInTheDocument();
  });
});
