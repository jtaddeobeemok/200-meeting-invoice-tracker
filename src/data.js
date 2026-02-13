/* ═══════════════════════════════════════════════════════
   BEEMOK CAPITAL · 4TH FLOOR RENOVATION
   Invoice & Contract Data
   ─────────────────────────────────────────────────────
   Update this file to add new invoices or modify
   contract values. The dashboard reads from these
   exports automatically.
   ═══════════════════════════════════════════════════════ */

// ── CHOATE CONSTRUCTION ──

export const CHOATE_INVOICES = [
  { invoiceNo: "7109-25-01", date: "2025-07-28", period: "Jul 2025", amount: 45347.44, foundation: 0, forProfit: 45347.44, label: "Pay App #1" },
  { invoiceNo: "7109-25-02", date: "2025-08-27", period: "Aug 2025", amount: 252739.52, foundation: 0, forProfit: 252739.52, label: "Pay App #2" },
  { invoiceNo: "7109-25-03", date: "2025-09-26", period: "Sep 2025", amount: 130721.02, foundation: 0, forProfit: 130721.02, label: "Pay App #3" },
  { invoiceNo: "7109-25-04", date: "2025-10-27", period: "Oct 2025", amount: 44519.13, foundation: 0, forProfit: 44519.13, label: "Pay App #4" },
  { invoiceNo: "7109-25-05", date: "2025-12-01", period: "Nov 2025", amount: 111503.83, foundation: 0, forProfit: 111503.83, label: "Pay App #5" },
  { invoiceNo: "7109-25-06", date: "2025-12-31", period: "Dec 2025", amount: 349712.26, foundation: 0, forProfit: 349712.26, label: "Pay App #6" },
  { invoiceNo: "7109-25-07", date: "2026-01-29", period: "Jan 2026", amount: 560601.34, foundation: 91719.28, forProfit: 468882.06, label: "Pay App #7" },
];

// ── LS3P ARCHITECTURE ──

export const LS3P_INVOICES = [
  { invoiceNo: "0092790", date: "2025-04-10", period: "Mar 2025", amount: 11700.00, label: "4th Floor Test Fit", testFit: 11700, basicServices: 0, consultantServices: 0, renderings: 0, constructionAdmin: 0, spacePlanRedesign: 0, reimbursables: 0 },
  { invoiceNo: "0093727", date: "2025-05-12", period: "Apr 2025", amount: 11700.00, label: "4th Floor Test Fit", testFit: 11700, basicServices: 0, consultantServices: 0, renderings: 0, constructionAdmin: 0, spacePlanRedesign: 0, reimbursables: 0 },
  { invoiceNo: "0094077", date: "2025-06-12", period: "May 2025", amount: 11853.02, label: "Services thru May 2025", testFit: 5850, basicServices: 5337.50, consultantServices: 0, renderings: 0, constructionAdmin: 0, spacePlanRedesign: 0, reimbursables: 665.52 },
  { invoiceNo: "0094562", date: "2025-07-11", period: "Jun 2025", amount: 70696.34, label: "Services thru Jun 2025", testFit: 0, basicServices: 61927.50, consultantServices: 8587.50, renderings: 0, constructionAdmin: 0, spacePlanRedesign: 0, reimbursables: 181.34 },
  { invoiceNo: "0095409", date: "2025-08-11", period: "Jul 2025", amount: 95851.50, label: "Services thru Jul 2025", testFit: 0, basicServices: 72541.50, consultantServices: 22680, renderings: 0, constructionAdmin: 190, spacePlanRedesign: 0, reimbursables: 440 },
  { invoiceNo: "0095909", date: "2025-09-11", period: "Aug 2025", amount: 114484.00, label: "Services thru Aug 2025", testFit: 0, basicServices: 52963.50, consultantServices: 51280.50, renderings: 0, constructionAdmin: 1762.50, spacePlanRedesign: 8477.50, reimbursables: 0 },
  { invoiceNo: "0096263", date: "2025-10-10", period: "Sep 2025", amount: 152778.00, label: "Services thru Sep 2025", testFit: 0, basicServices: 25180, consultantServices: 83756.50, renderings: 0, constructionAdmin: 415, spacePlanRedesign: 43365, reimbursables: 61.50 },
  { invoiceNo: "0096871", date: "2025-11-10", period: "Oct 2025", amount: 87106.25, label: "Services thru Oct 2025", testFit: 0, basicServices: 8820, consultantServices: 2430, renderings: 8000, constructionAdmin: 2117.50, spacePlanRedesign: 65738.75, reimbursables: 0 },
  { invoiceNo: "0097238", date: "2025-12-10", period: "Nov 2025", amount: 42091.75, label: "Services thru Nov 2025", testFit: 0, basicServices: 4410, consultantServices: 26000.50, renderings: 0, constructionAdmin: 2548.75, spacePlanRedesign: 9132.50, reimbursables: 0 },
  { invoiceNo: "0097766", date: "2026-01-13", period: "Dec 2025", amount: 45066.63, label: "Services thru Dec 2025", testFit: 0, basicServices: 8820, consultantServices: 10727.75, renderings: 0, constructionAdmin: 2382.50, spacePlanRedesign: 23065, reimbursables: 71.38 },
];

// ── MEYER DAVIS INTERIOR DESIGN ──

export const MD_INVOICES = [
  { invoiceNo: "2025-1117-001", date: "2025-12-19", period: "Dec 2025", amount: 27500, label: "Design thru Dec 19", design: 27500, ffePackage: 0, mdRenderings: 0, designHourly: 0, reimbursables: 0 },
  { invoiceNo: "2025-1117-002", date: "2026-01-23", period: "Jan 2026", amount: 63600, label: "Design thru Dec 31", design: 17500, ffePackage: 0, mdRenderings: 2200, designHourly: 43900, reimbursables: 0 },
];

// ── CONTRACTS ──

export const CONTRACTS = {
  Choate: { contractValue: 16330347 },
  LS3P: {
    contracted: {
      testFit: { l: "4th Floor Test Fit", c: 29250 },
      basicServices: { l: "Basic Services", c: 298250 },
      consultantServices: { l: "Consultant Services", c: 288882.50 },
      renderings: { l: "Additional Renderings", c: 8000 },
    },
    get totalContracted() {
      return Object.values(this.contracted).reduce((s, x) => s + x.c, 0);
    },
  },
  MD: {
    contracted: {
      design: { l: "Conservatory Design", c: 45000 },
      ffePackage: { l: "FF&E Package (ASR 1)", c: 36250 },
      mdRenderings: { l: "Renderings", c: 2200 },
    },
    get totalContracted() {
      return Object.values(this.contracted).reduce((s, x) => s + x.c, 0);
    },
  },
};

// ── DERIVED ──

export const ALL_INVOICES = [
  ...CHOATE_INVOICES.map((i) => ({ ...i, vendor: "Choate" })),
  ...LS3P_INVOICES.map((i) => ({ ...i, vendor: "LS3P" })),
  ...MD_INVOICES.map((i) => ({ ...i, vendor: "Meyer Davis" })),
];

export const VENDORS = ["All Vendors", "Choate", "LS3P", "Meyer Davis"];
