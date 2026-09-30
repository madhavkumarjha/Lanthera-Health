import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { PortalLayout } from './layouts/PortalLayout';

// Non-lazy routes per File 06 §4
import EmergencyPage from './routes/EmergencyPage';
import PrivacyPage from './routes/PrivacyPage';
import TermsPage from './routes/TermsPage';

// Lazy loaded routes
const HomePage = lazy(() => import('./routes/HomePage'));
const AboutPage = lazy(() => import('./routes/AboutPage'));
const DepartmentsPage = lazy(() => import('./routes/DepartmentsPage'));
const DepartmentDetailPage = lazy(() => import('./routes/DepartmentDetailPage'));
const DoctorsPage = lazy(() => import('./routes/DoctorsPage'));
const DoctorDetailPage = lazy(() => import('./routes/DoctorDetailPage'));
const TeamPage = lazy(() => import('./routes/TeamPage'));
const GuidePage = lazy(() => import('./routes/GuidePage'));
const BookPage = lazy(() => import('./routes/BookPage'));
const PathPage = lazy(() => import('./routes/PathPage'));
const FamiliesPage = lazy(() => import('./routes/FamiliesPage'));
const BoardPage = lazy(() => import('./routes/BoardPage'));
const LedgerPage = lazy(() => import('./routes/LedgerPage'));
const PackagesPage = lazy(() => import('./routes/PackagesPage'));
const DiagnosticsPage = lazy(() => import('./routes/DiagnosticsPage'));
const PortalPage = lazy(() => import('./routes/PortalPage'));
const UnderstandPage = lazy(() => import('./routes/UnderstandPage'));
const ArticleDetailPage = lazy(() => import('./routes/ArticleDetailPage'));
const InternationalPage = lazy(() => import('./routes/InternationalPage'));
const CareersPage = lazy(() => import('./routes/CareersPage'));
const ContactPage = lazy(() => import('./routes/ContactPage'));
const DemoDisclosurePage = lazy(() => import('./routes/DemoDisclosurePage'));
const AccessibilityPage = lazy(() => import('./routes/AccessibilityPage'));
const SitemapPage = lazy(() => import('./routes/SitemapPage'));
const NotFoundPage = lazy(() => import('./routes/NotFoundPage'));

export function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="departments" element={<DepartmentsPage />} />
            <Route path="departments/:slug" element={<DepartmentDetailPage />} />
            <Route path="doctors" element={<DoctorsPage />} />
            <Route path="doctors/:slug" element={<DoctorDetailPage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="guide" element={<GuidePage />} />
            <Route path="book" element={<BookPage />} />
            <Route path="emergency" element={<EmergencyPage />} />
            <Route path="path" element={<PathPage />} />
            <Route path="families" element={<FamiliesPage />} />
            <Route path="families/board" element={<BoardPage />} />
            <Route path="ledger" element={<LedgerPage />} />
            <Route path="packages" element={<PackagesPage />} />
            <Route path="diagnostics" element={<DiagnosticsPage />} />
            <Route path="portal" element={<PortalLayout />}>
              <Route index element={<PortalPage />} />
            </Route>
            <Route path="understand" element={<UnderstandPage />} />
            <Route path="understand/:slug" element={<ArticleDetailPage />} />
            <Route path="international" element={<InternationalPage />} />
            <Route path="careers" element={<CareersPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="demo-disclosure" element={<DemoDisclosurePage />} />
            <Route path="accessibility" element={<AccessibilityPage />} />
            <Route path="sitemap" element={<SitemapPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
