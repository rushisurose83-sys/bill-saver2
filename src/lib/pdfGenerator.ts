import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Appliance } from '@/components/ui/ApplianceList';
import { calculateConsumption, calculateBilling, calculateCarbon, calculateTreesOffset, calculateGreenScore } from './calculations';

export function generateMonthlyReport(appliances: Appliance[]) {
  const doc = new jsPDF();

  // Calculate totals
  const totalMonthlyKwh = appliances.reduce((acc, app) => {
    return acc + calculateConsumption(app.powerWatts, app.hoursPerDay);
  }, 0);
  const estimatedCost = calculateBilling(totalMonthlyKwh);
  const carbonImpact = calculateCarbon(totalMonthlyKwh);
  const treesOffset = calculateTreesOffset(carbonImpact);
  const greenScore = calculateGreenScore(totalMonthlyKwh);

  // Title
  doc.setFontSize(22);
  doc.setTextColor(6, 78, 59); // Deep Forest
  doc.text('BillSaver Green - Monthly Report', 14, 22);

  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

  // Summary section
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text('Summary', 14, 45);

  doc.setFontSize(11);
  doc.text(`Total Estimated Units: ${totalMonthlyKwh.toFixed(1)} kWh`, 14, 53);
  doc.text(`Estimated Monthly Bill: ₹${estimatedCost.toFixed(2)}`, 14, 61);
  doc.text(`Carbon Footprint: ${carbonImpact.toFixed(1)} kg CO2`, 14, 69);
  doc.text(`Equivalent Trees Needed: ${treesOffset.toFixed(1)} trees`, 14, 77);
  doc.text(`Green Score: ${greenScore}/100`, 14, 85);

  // Appliance Breakdown Table
  doc.setFontSize(14);
  doc.text('Appliance Breakdown', 14, 100);

  const tableData = appliances.map((app) => {
    const monthlyKwh = calculateConsumption(app.powerWatts, app.hoursPerDay);
    return [
      app.name,
      `${app.powerWatts} W`,
      `${app.hoursPerDay} hrs/day`,
      `${monthlyKwh.toFixed(1)} kWh`,
      app.phantomLoad ? 'Yes' : 'No'
    ];
  });

  autoTable(doc, {
    startY: 105,
    head: [['Appliance', 'Power Rating', 'Daily Usage', 'Monthly Est.', 'Phantom Load']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [16, 185, 129] }, // Soft Emerald
    styles: { fontSize: 10 },
  });

  // Footer
  const finalY = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY : 150;
  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text('This is an estimated report. Actual billing may vary based on local tariffs and precise usage.', 14, finalY + 20);

  // Save the PDF
  doc.save('billsaver-monthly-report.pdf');
}
