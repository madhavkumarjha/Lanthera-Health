import { jsPDF } from 'jspdf';
import { GuideResult } from '../types';
import { siteConfig } from '../config/site';

interface GeneratePdfOptions {
  result: GuideResult;
  locale: 'en' | 'hi';
  patientCategory: string;
}

export function generateVisitPrepSheetPdf({
  result,
  locale = 'en',
  patientCategory = 'Self',
}: GeneratePdfOptions) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const isHi = locale === 'hi';

  // Background Parchment Accent
  doc.setFillColor(247, 240, 230); // #F7F0E6
  doc.rect(0, 0, 210, 297, 'F');

  // Header Banner Block
  doc.setFillColor(33, 24, 38); // #211826 (Night Ward Surface)
  doc.rect(10, 10, 190, 32, 'F');

  // Header Brand Text
  doc.setTextColor(240, 178, 74); // Amber #F0B24A
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('LANTHERA HEALTH', 20, 24);

  doc.setTextColor(244, 236, 225); // #F4ECE1
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('The light stays on. • 24x7 Multi-Speciality Care Network', 20, 34);

  // Document Title
  doc.setTextColor(35, 26, 38); // #231A26
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  const titleText = isHi ? 'Visit Preparation Sheet' : 'Visit Preparation Sheet';
  doc.text(titleText, 20, 52);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(94, 79, 96);
  const dateStr = new Date().toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  doc.text(`Generated: ${dateStr} • Category: ${patientCategory}`, 20, 58);

  // Divider Line
  doc.setDrawColor(220, 205, 185);
  doc.setLineWidth(0.5);
  doc.line(20, 62, 190, 62);

  // 1. Care Recommendation Box
  let y = 70;

  let levelBgR = 239, levelBgG = 229, levelBgB = 214;
  let levelTextR = 35, levelTextG = 26, levelTextB = 38;

  if (result.level === 'emergency') {
    levelBgR = 255; levelBgG = 90; levelBgB = 79;
    levelTextR = 255; levelTextG = 255; levelTextB = 255;
  } else if (result.level === 'urgent') {
    levelBgR = 240; levelBgG = 178; levelBgB = 74;
    levelTextR = 42; levelTextG = 27; levelTextB = 5;
  }

  doc.setFillColor(levelBgR, levelBgG, levelBgB);
  doc.roundedRect(20, y, 170, 20, 3, 3, 'F');

  doc.setTextColor(levelTextR, levelTextG, levelTextB);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  const levelLabel = `Care Level Recommendation: ${result.level.toUpperCase()}`;
  doc.text(levelLabel, 26, y + 9);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const deptLabel = `Suggested Department(s): ${result.departments.join(', ')}`;
  doc.text(deptLabel, 26, y + 15);

  y += 28;

  // 2. What to Bring Checklist
  doc.setTextColor(35, 26, 38);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('What to Bring to the Hospital:', 20, y);
  y += 6;

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 50, 65);

  result.bring.forEach((item) => {
    doc.rect(20, y - 3, 3.5, 3.5); // Checkbox box
    doc.text(item, 26, y);
    y += 6;
  });

  y += 4;

  // 3. Questions to Ask Doctor
  doc.setTextColor(35, 26, 38);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Questions to Ask Your Doctor / Care Team:', 20, y);
  y += 6;

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 50, 65);

  result.ask.forEach((q, idx) => {
    const text = isHi ? q.hi : q.en;
    doc.text(`${idx + 1}. ${text}`, 20, y);
    y += 6;
  });

  y += 4;

  // 4. Expected Arrival Steps
  doc.setTextColor(35, 26, 38);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('What Will Happen Upon Arrival:', 20, y);
  y += 6;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 50, 65);

  result.nextSteps.forEach((step, idx) => {
    const stepText = isHi ? step.hi : step.en;
    doc.text(`Step ${idx + 1}: ${stepText}`, 20, y);
    y += 6;
  });

  // Footer Disclaimer Block
  doc.setFillColor(239, 229, 214);
  doc.rect(10, 265, 190, 22, 'F');

  doc.setFontSize(7.5);
  doc.setTextColor(94, 79, 96);
  doc.text(
    'MANDATORY DISCLAIMER: Indicative • General information • Not medical, legal or financial advice.',
    20,
    272
  );
  doc.text(
    `Lanthera Health 24x7 Helpline: ${siteConfig.emergencyNumber} • Emergency services available at all hours.`,
    20,
    277
  );

  // Save PDF file
  doc.save(`Lanthera-Visit-Prep-Sheet-${result.level}.pdf`);
}
