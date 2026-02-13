import { useState, useMemo, useEffect, useRef } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

/* ═══════════════════════════════════════════════════════
   BEEMOK CAPITAL · 4TH FLOOR RENOVATION TRACKER
   Brand palette: #30395C · #1A1F2B · #4A6491 · #85A5CC · #ADD5F7
   ═══════════════════════════════════════════════════════ */

// ── DATA ──

const CHOATE_INVOICES = [
  { invoiceNo: "7109-25-01", date: "2025-07-28", period: "Jul 2025", amount: 45347.44, foundation: 0, forProfit: 45347.44, label: "Pay App #1" },
  { invoiceNo: "7109-25-02", date: "2025-08-27", period: "Aug 2025", amount: 252739.52, foundation: 0, forProfit: 252739.52, label: "Pay App #2" },
  { invoiceNo: "7109-25-03", date: "2025-09-26", period: "Sep 2025", amount: 130721.02, foundation: 0, forProfit: 130721.02, label: "Pay App #3" },
  { invoiceNo: "7109-25-04", date: "2025-10-27", period: "Oct 2025", amount: 44519.13, foundation: 0, forProfit: 44519.13, label: "Pay App #4" },
  { invoiceNo: "7109-25-05", date: "2025-12-01", period: "Nov 2025", amount: 111503.83, foundation: 0, forProfit: 111503.83, label: "Pay App #5" },
  { invoiceNo: "7109-25-06", date: "2025-12-31", period: "Dec 2025", amount: 349712.26, foundation: 0, forProfit: 349712.26, label: "Pay App #6" },
  { invoiceNo: "7109-25-07", date: "2026-01-29", period: "Jan 2026", amount: 560601.34, foundation: 91719.28, forProfit: 468882.06, label: "Pay App #7" },
];

const LS3P_INVOICES = [
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

const MD_INVOICES = [
  { invoiceNo: "2025-1117-001", date: "2025-12-19", period: "Dec 2025", amount: 27500, label: "Design thru Dec 19", design: 27500, ffePackage: 0, mdRenderings: 0, designHourly: 0, reimbursables: 0 },
  { invoiceNo: "2025-1117-002", date: "2026-01-23", period: "Jan 2026", amount: 63600, label: "Design thru Dec 31", design: 17500, ffePackage: 0, mdRenderings: 2200, designHourly: 43900, reimbursables: 0 },
];

const CONTRACTS = {
  Choate: { contractValue: 16330347 },
  LS3P: {
    contracted: { testFit: { l: "4th Floor Test Fit", c: 29250 }, basicServices: { l: "Basic Services", c: 298250 }, consultantServices: { l: "Consultant Services", c: 288882.50 }, renderings: { l: "Additional Renderings", c: 8000 } },
    get totalContracted() { return Object.values(this.contracted).reduce((s, x) => s + x.c, 0); },
  },
  MD: {
    contracted: { design: { l: "Conservatory Design", c: 45000 }, ffePackage: { l: "FF&E Package (ASR 1)", c: 36250 }, mdRenderings: { l: "Renderings", c: 2200 } },
    get totalContracted() { return Object.values(this.contracted).reduce((s, x) => s + x.c, 0); },
  },
};

const ALL_INVOICES = [
  ...CHOATE_INVOICES.map(i => ({ ...i, vendor: "Choate" })),
  ...LS3P_INVOICES.map(i => ({ ...i, vendor: "LS3P" })),
  ...MD_INVOICES.map(i => ({ ...i, vendor: "Meyer Davis" })),
];

const VENDORS = ["All Vendors", "Choate", "LS3P", "Meyer Davis"];

// ── BRAND PALETTE ──
const P = {
  navy: "#30395C", dark: "#1A1F2B", steel: "#4A6491", mid: "#85A5CC", light: "#ADD5F7",
  bg: "#0F1219", surface: "#161C28", surfaceAlt: "#1C2433", surfaceHover: "#212C3E",
  border: "#283348", borderLight: "#344060",
  text: "#E4EAF4", textSub: "#94A3BF", textDim: "#5E6F8A",
  accent: "#85A5CC", accentBright: "#ADD5F7", accentDark: "#4A6491",
  paid: "#5E9E82", remaining: "#6B8DC4", foundation: "#8B7BBF", retainage: "#C4976B",
  choate: "#85A5CC", ls3p: "#6B8DC4", md: "#8B7BBF",
  basic: "#5E9E82", consultant: "#6B8DC4", testFit: "#7A97B0", rend: "#8B7BBF",
  ca: "#C4976B", redesign: "#C46B88", reimb: "#5E6F8A",
  mdDesign: "#8B7BBF", mdFFE: "#C4976B", mdRend: "#7A97B0", mdHourly: "#C46B88",
  progressTrack: "#1E2840",
};
const vColors = { Choate: P.choate, LS3P: P.ls3p, "Meyer Davis": P.md };

// ── UTILS ──
const fmt = n => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(n);
const fmtK = n => { if (Math.abs(n) >= 1e6) return `$${(n/1e6).toFixed(2)}M`; if (Math.abs(n) >= 1e3) return `$${(n/1e3).toFixed(0)}K`; return fmt(n); };
const fmtPct = n => `${(n * 100).toFixed(1)}%`;

// ── ANIMATIONS CSS ──
const cssAnim = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideRight {
  from { width: 0%; }
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
.fade-up { animation: fadeUp 0.5s ease-out both; }
.fade-in { animation: fadeIn 0.4s ease-out both; }
.stagger-1 { animation-delay: 0.05s; }
.stagger-2 { animation-delay: 0.1s; }
.stagger-3 { animation-delay: 0.15s; }
.stagger-4 { animation-delay: 0.2s; }
.stagger-5 { animation-delay: 0.25s; }
.stagger-6 { animation-delay: 0.3s; }

.card-hover {
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.3);
  border-color: ${P.borderLight};
}

.row-hover {
  transition: background 0.15s ease;
}
.row-hover:hover {
  background: ${P.surfaceHover} !important;
}

.btn-toggle {
  transition: all 0.2s ease;
}
.btn-toggle:hover {
  background: ${P.surfaceAlt};
}

.progress-bar-animated {
  animation: slideRight 0.8s ease-out both;
}

.table-container {
  animation: fadeUp 0.5s ease-out 0.35s both;
}

.glow-line {
  background: linear-gradient(90deg, transparent, ${P.accentDark}40, transparent);
  background-size: 200% 100%;
  animation: shimmer 3s linear infinite;
}
`;

// ── COMPONENTS ──

const Tip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: P.surface, border: `1px solid ${P.border}`, borderRadius: 10, padding: "12px 16px", boxShadow: "0 12px 40px rgba(0,0,0,0.5)", backdropFilter: "blur(12px)" }}>
      <p style={{ color: P.textSub, fontSize: 10, margin: 0, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "Outfit" }}>{payload[0].name || payload[0].payload?.name}</p>
      <p style={{ color: P.text, fontSize: 16, margin: 0, fontWeight: 600, fontFamily: "Outfit" }}>{fmt(payload[0].value)}</p>
    </div>
  );
};

function AnimBar({ paid, total, height = 6, color, delay = 0 }) {
  const pct = total > 0 ? Math.min((paid / total) * 100, 100) : 0;
  return (
    <div style={{ width: "100%", height, background: P.progressTrack, borderRadius: height, overflow: "hidden", position: "relative" }}>
      <div className="progress-bar-animated" style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${color}90, ${color})`, borderRadius: height, animationDelay: `${delay}s`, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)`, borderRadius: height }} />
      </div>
    </div>
  );
}

function Card({ label, value, sub, color, stagger = 0 }) {
  return (
    <div className={`fade-up card-hover stagger-${stagger}`} style={{ background: `linear-gradient(135deg, ${P.surface} 0%, ${P.surfaceAlt} 100%)`, border: `1px solid ${P.border}`, borderRadius: 14, padding: "22px 24px", position: "relative", overflow: "hidden", cursor: "default" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: 60, height: 2, background: `linear-gradient(90deg, ${color}, transparent)` }} />
      <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: P.textDim, fontWeight: 600, fontFamily: "Outfit" }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color, marginTop: 12, marginBottom: 6, fontFamily: "Outfit", lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 11, color: P.textDim, fontFamily: "Outfit" }}>{sub}</div>
    </div>
  );
}

function Legend({ items }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 10, flexWrap: "wrap" }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: it.color, boxShadow: `0 0 8px ${it.color}60` }} />
          <span style={{ fontSize: 11, color: P.textSub, fontFamily: "Outfit" }}>{it.label}</span>
          <span style={{ fontSize: 11, color: P.textDim, fontFamily: "Outfit", fontWeight: 600 }}>{it.value}</span>
        </div>
      ))}
    </div>
  );
}

function ContractRow({ label, paid, contract, color, delay = 0 }) {
  const pct = contract > 0 ? paid / contract : 0;
  const done = pct >= 0.999;
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <span style={{ fontSize: 12, color: P.textSub, fontWeight: 500, fontFamily: "Outfit" }}>{label}</span>
        <span style={{ fontSize: 12, color: done ? P.paid : color, fontWeight: 700, fontFamily: "Outfit" }}>{done ? "Complete" : fmtPct(pct)}</span>
      </div>
      <AnimBar paid={paid} total={contract} height={5} color={color} delay={delay} />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, fontFamily: "Outfit" }}>
        <span style={{ color: P.textDim }}>{fmt(paid)} billed</span>
        <span style={{ color: P.textDim }}>{done ? fmt(contract) + " contract" : fmt(contract - paid) + " remaining"}</span>
      </div>
    </div>
  );
}

function TH({ children, onClick, right }) {
  return <th onClick={onClick} style={{ padding: "13px 18px", textAlign: right ? "right" : "left", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: P.textDim, fontWeight: 600, fontFamily: "Outfit", whiteSpace: "nowrap", userSelect: "none", cursor: onClick ? "pointer" : "default", borderBottom: `1px solid ${P.border}` }}>{children}</th>;
}
function TD({ val, color }) {
  const v = val || 0;
  return <td style={{ padding: "14px 18px", fontSize: 13, color: v > 0 ? color : P.textDim + "60", whiteSpace: "nowrap", fontFamily: "Outfit", textAlign: "right", fontWeight: v > 0 ? 500 : 400 }}>{v > 0 ? fmt(v) : "—"}</td>;
}

// ── LOGO ──
const BeemokLogo = () => (
  <svg width="140" height="28" viewBox="0 0 140 28" fill="none">
    <text x="0" y="20" fill="white" fontFamily="Playfair Display, serif" fontSize="18" fontWeight="700" letterSpacing="3">BEEMOK</text>
    <text x="82" y="26" fill={P.mid} fontFamily="Outfit, sans-serif" fontSize="9" fontWeight="400" letterSpacing="4">CAPITAL</text>
  </svg>
);

// ── BOX STYLES ──
const box = { background: `linear-gradient(135deg, ${P.surface} 0%, ${P.surfaceAlt} 100%)`, border: `1px solid ${P.border}`, borderRadius: 14, padding: "24px 28px" };
const lbl = { fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: P.textDim, fontWeight: 600, fontFamily: "Outfit" };
const td = { padding: "14px 18px", fontSize: 13, color: P.text, whiteSpace: "nowrap", fontFamily: "Outfit" };

// ═══════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════

export default function InvoiceTracker() {
  const [activeVendor, setActiveVendor] = useState("All Vendors");
  const [sortField, setSortField] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const isAll = activeVendor === "All Vendors";
  const isChoate = activeVendor === "Choate";
  const isLS3P = activeVendor === "LS3P";
  const isMD = activeVendor === "Meyer Davis";

  const ch = useMemo(() => {
    const paid = CHOATE_INVOICES.reduce((s, i) => s + i.amount, 0);
    const ct = CONTRACTS.Choate.contractValue;
    return { paid, ct, rem: ct - paid, pct: paid / ct, fndn: CHOATE_INVOICES.reduce((s, i) => s + (i.foundation || 0), 0), fp: CHOATE_INVOICES.reduce((s, i) => s + (i.forProfit || 0), 0), ret: 138447.61 };
  }, []);

  const ls = useMemo(() => {
    const sum = k => LS3P_INVOICES.reduce((s, i) => s + (i[k] || 0), 0);
    const tf=sum("testFit"),bs=sum("basicServices"),cs=sum("consultantServices"),rn=sum("renderings");
    const ca=sum("constructionAdmin"),sp=sum("spacePlanRedesign"),re=sum("reimbursables");
    const contracted=tf+bs+cs+rn, variable=ca+sp+re, totalCt=CONTRACTS.LS3P.totalContracted;
    return { tf,bs,cs,rn,ca,sp,re,contracted,variable,total:contracted+variable,totalCt,ctRem:totalCt-contracted,ctPct:contracted/totalCt };
  }, []);

  const md = useMemo(() => {
    const sum = k => MD_INVOICES.reduce((s, i) => s + (i[k] || 0), 0);
    const design=sum("design"),ffe=sum("ffePackage"),rend=sum("mdRenderings"),hourly=sum("designHourly"),reimb=sum("reimbursables");
    const contracted=design+ffe+rend, variable=hourly+reimb, totalCt=CONTRACTS.MD.totalContracted;
    return { design,ffe,rend,hourly,reimb,contracted,variable,total:contracted+variable,totalCt,ctRem:totalCt-contracted,ctPct:contracted/totalCt };
  }, []);

  const all = useMemo(() => {
    const totalPaid=ch.paid+ls.total+md.total, knownCt=CONTRACTS.Choate.contractValue+ls.totalCt+md.totalCt;
    return { totalPaid, knownCt, ctRem: knownCt-(ch.paid+ls.contracted+md.contracted), variable: ls.variable+md.variable };
  }, [ch, ls, md]);

  const filtered = useMemo(() => {
    let inv;
    if (isAll) inv = ALL_INVOICES;
    else if (isChoate) inv = CHOATE_INVOICES.map(i => ({ ...i, vendor: "Choate" }));
    else if (isLS3P) inv = LS3P_INVOICES.map(i => ({ ...i, vendor: "LS3P" }));
    else inv = MD_INVOICES.map(i => ({ ...i, vendor: "Meyer Davis" }));
    return [...inv].sort((a, b) => {
      let va=a[sortField],vb=b[sortField];
      if (sortField==="amount") return sortDir==="asc"?va-vb:vb-va;
      return sortDir==="asc"?String(va||"").localeCompare(String(vb||"")):String(vb||"").localeCompare(String(va||""));
    });
  }, [activeVendor, sortField, sortDir]);

  const tableTotal = useMemo(() => filtered.reduce((s, i) => s + i.amount, 0), [filtered]);
  const handleSort = f => { if (sortField===f) setSortDir(d => d==="asc"?"desc":"asc"); else { setSortField(f); setSortDir("desc"); } };
  const SI = ({ field }) => {
    if (sortField !== field) return <span style={{ opacity: 0.3, marginLeft: 4, fontSize: 9 }}>↕</span>;
    return <span style={{ color: P.accentBright, marginLeft: 4, fontSize: 9 }}>{sortDir === "asc" ? "↑" : "↓"}</span>;
  };
  const showFndn = isChoate || isAll;

  return (
    <div style={{ fontFamily: "Outfit, sans-serif", background: `linear-gradient(180deg, ${P.bg} 0%, ${P.dark} 100%)`, minHeight: "100vh", color: P.text }}>
      <style>{cssAnim}</style>

      {/* ── HEADER ── */}
      <div className="fade-in" style={{ borderBottom: `1px solid ${P.border}`, padding: "24px 44px 22px", background: `linear-gradient(135deg, ${P.dark} 0%, ${P.navy}30 50%, ${P.dark} 100%)`, position: "relative", overflow: "hidden" }}>
        <div className="glow-line" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <BeemokLogo />
            <div style={{ width: 1, height: 36, background: P.border }} />
            <div>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: P.textDim, marginBottom: 4, fontWeight: 600 }}>Project 7109-25</div>
              <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 26, fontWeight: 500, margin: 0, color: P.text, letterSpacing: "0.02em" }}>4th Floor Renovation</h1>
              <div style={{ fontSize: 12, color: P.textSub, marginTop: 4 }}>200 Meeting Street · 36,000 SF</div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            {isChoate && (<><div style={lbl}>Choate Contract</div><div style={{ fontFamily: "Playfair Display, serif", fontSize: 26, fontWeight: 600, color: P.accent, marginTop: 6 }}>{fmtK(ch.ct)}</div><div style={{ fontSize: 10, color: P.textDim, marginTop: 2 }}>Original $547K + $15.78M CO</div></>)}
            {isLS3P && (<><div style={lbl}>LS3P Contracted</div><div style={{ fontFamily: "Playfair Display, serif", fontSize: 26, fontWeight: 600, color: P.ls3p, marginTop: 6 }}>{fmtK(ls.totalCt)}</div><div style={{ fontSize: 10, color: P.textDim, marginTop: 2 }}>+ hourly &amp; reimbursable</div></>)}
            {isMD && (<><div style={lbl}>Meyer Davis Contracted</div><div style={{ fontFamily: "Playfair Display, serif", fontSize: 26, fontWeight: 600, color: P.md, marginTop: 6 }}>{fmtK(md.totalCt)}</div><div style={{ fontSize: 10, color: P.textDim, marginTop: 2 }}>+ hourly design &amp; FF&amp;E</div></>)}
            {isAll && (<><div style={lbl}>Total Contracted Value</div><div style={{ fontFamily: "Playfair Display, serif", fontSize: 26, fontWeight: 600, color: P.accent, marginTop: 6 }}>{fmtK(all.knownCt)}</div><div style={{ fontSize: 10, color: P.textDim, marginTop: 2 }}>All vendors combined</div></>)}
          </div>
        </div>
      </div>

      <div style={{ padding: "28px 44px 48px" }}>

        {/* ── TOGGLE ── */}
        <div className="fade-up" style={{ display: "flex", gap: 3, marginBottom: 32, background: P.surface, borderRadius: 12, padding: 4, border: `1px solid ${P.border}`, width: "fit-content" }}>
          {VENDORS.map(v => (
            <button key={v} className="btn-toggle" onClick={() => setActiveVendor(v)} style={{
              padding: "10px 24px", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 12, fontWeight: activeVendor===v?600:400, fontFamily: "Outfit",
              background: activeVendor===v ? `linear-gradient(135deg, ${P.steel}, ${P.navy})` : "transparent",
              color: activeVendor===v ? "#fff" : P.textSub,
              boxShadow: activeVendor===v ? `0 2px 12px ${P.navy}80` : "none",
            }}>{v}</button>
          ))}
        </div>

        {/* ═══ CHOATE ═══ */}
        {isChoate && (<div key="choate">
          <div className="fade-up" style={{ ...box, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                <span style={lbl}>Contract Progress</span>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: 28, fontWeight: 600, color: P.accent }}>{fmtPct(ch.pct)}</span>
              </div>
              <div style={{ fontSize: 12, color: P.textSub, fontFamily: "Outfit" }}>{fmtK(ch.paid)} of {fmtK(ch.ct)}</div>
            </div>
            <AnimBar paid={ch.paid} total={ch.ct} height={10} color={P.paid} delay={0.2} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
              <span style={{ fontSize: 12, color: P.paid, fontWeight: 600 }}>Paid: {fmt(ch.paid)}</span>
              <span style={{ fontSize: 12, color: P.remaining, fontWeight: 600 }}>Remaining: {fmt(ch.rem)}</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, margin: "0 0 28px" }}>
            <Card label="Remaining to Pay" value={fmt(ch.rem)} sub={`${fmtPct(1-ch.pct)} of contract`} color={P.remaining} stagger={1} />
            <Card label="Paid to Date" value={fmt(ch.paid)} sub={`${CHOATE_INVOICES.length} pay applications`} color={P.paid} stagger={2} />
            <Card label="Retainage Held" value={fmt(ch.ret)} sub="8.48% current rate" color={P.retainage} stagger={3} />
            <Card label="Foundation Allocation" value={fmt(ch.fndn)} sub="tax-exempt carve-out" color={P.foundation} stagger={4} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
            <div className="fade-up stagger-3" style={box}>
              <div style={lbl}>Contract Progress</div>
              <div style={{ marginTop: 16 }}><ResponsiveContainer width="100%" height={180}><PieChart><Pie data={[{ name: "Paid", value: ch.paid }, { name: "Remaining", value: ch.rem }]} dataKey="value" cx="50%" cy="50%" outerRadius={70} innerRadius={44} strokeWidth={0} startAngle={90} endAngle={-270}><Cell fill={P.paid} /><Cell fill={P.progressTrack} /></Pie><Tooltip content={<Tip />} /></PieChart></ResponsiveContainer></div>
              <Legend items={[{ color: P.paid, label: "Paid", value: fmtK(ch.paid) }, { color: P.remaining, label: "Remaining", value: fmtK(ch.rem) }]} />
            </div>
            <div className="fade-up stagger-4" style={box}>
              <div style={lbl}>Foundation vs. For-Profit</div>
              <div style={{ marginTop: 16 }}><ResponsiveContainer width="100%" height={180}><PieChart><Pie data={[{ name: "For-Profit", value: ch.fp }, { name: "Foundation", value: ch.fndn }]} dataKey="value" cx="50%" cy="50%" outerRadius={70} innerRadius={44} strokeWidth={0}><Cell fill={P.accent} /><Cell fill={P.foundation} /></Pie><Tooltip content={<Tip />} /></PieChart></ResponsiveContainer></div>
              <Legend items={[{ color: P.accent, label: "For-Profit", value: fmtK(ch.fp) }, { color: P.foundation, label: "Foundation", value: fmtK(ch.fndn) }]} />
            </div>
          </div>
        </div>)}

        {/* ═══ LS3P ═══ */}
        {isLS3P && (<div key="ls3p">
          <div className="fade-up" style={{ ...box, marginBottom: 20 }}>
            <div style={{ ...lbl, marginBottom: 22 }}>Contracted Scope Progress</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 36px" }}>
              <ContractRow label="Basic Services" paid={ls.bs} contract={298250} color={P.basic} delay={0.15} />
              <ContractRow label="Consultant Services" paid={ls.cs} contract={288882.50} color={P.consultant} delay={0.25} />
              <ContractRow label="4th Floor Test Fit" paid={ls.tf} contract={29250} color={P.testFit} delay={0.35} />
              <ContractRow label="Additional Renderings" paid={ls.rn} contract={8000} color={P.rend} delay={0.45} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
            <Card label="Contracted Remaining" value={fmt(ls.ctRem)} sub={`${fmtPct(1-ls.ctPct)} of ${fmtK(ls.totalCt)}`} color={P.remaining} stagger={1} />
            <Card label="Contracted Paid" value={fmt(ls.contracted)} sub="all fixed-fee scopes" color={P.paid} stagger={2} />
            <Card label="Hourly & Additional" value={fmt(ls.variable)} sub="CA + Redesign + Reimb." color={P.ca} stagger={3} />
            <Card label="Total Paid" value={fmt(ls.total)} sub={`${LS3P_INVOICES.length} invoices`} color={P.accent} stagger={4} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
            <div className="fade-up stagger-3" style={box}>
              <div style={lbl}>Spend by Category</div>
              <div style={{ marginTop: 16 }}><ResponsiveContainer width="100%" height={200}><PieChart><Pie data={[{name:"Basic Services",value:ls.bs},{name:"Consultant Services",value:ls.cs},{name:"Test Fit",value:ls.tf},{name:"Renderings",value:ls.rn},{name:"Construction Admin",value:ls.ca},{name:"Space Plan Redesign",value:ls.sp},...(ls.re>0?[{name:"Reimbursables",value:ls.re}]:[])].filter(d=>d.value>0)} dataKey="value" cx="50%" cy="50%" outerRadius={75} innerRadius={46} strokeWidth={0}><Cell fill={P.basic}/><Cell fill={P.consultant}/><Cell fill={P.testFit}/><Cell fill={P.rend}/><Cell fill={P.ca}/><Cell fill={P.redesign}/>{ls.re>0&&<Cell fill={P.reimb}/>}</Pie><Tooltip content={<Tip/>}/></PieChart></ResponsiveContainer></div>
              <Legend items={[{color:P.basic,label:"Basic",value:fmtK(ls.bs)},{color:P.consultant,label:"Consultant",value:fmtK(ls.cs)},{color:P.redesign,label:"Redesign",value:fmtK(ls.sp)},{color:P.ca,label:"CA",value:fmtK(ls.ca)}]} />
            </div>
            <div className="fade-up stagger-4" style={box}>
              <div style={lbl}>Contracted vs. Variable</div>
              <div style={{ marginTop: 16 }}><ResponsiveContainer width="100%" height={200}><PieChart><Pie data={[{name:"Contracted",value:ls.contracted},{name:"Variable",value:ls.variable}]} dataKey="value" cx="50%" cy="50%" outerRadius={75} innerRadius={46} strokeWidth={0}><Cell fill={P.ls3p}/><Cell fill={P.ca}/></Pie><Tooltip content={<Tip/>}/></PieChart></ResponsiveContainer></div>
              <Legend items={[{color:P.ls3p,label:"Contracted",value:fmtK(ls.contracted)},{color:P.ca,label:"Variable",value:fmtK(ls.variable)}]} />
            </div>
          </div>
        </div>)}

        {/* ═══ MEYER DAVIS ═══ */}
        {isMD && (<div key="md">
          <div className="fade-up" style={{ ...box, marginBottom: 20 }}>
            <div style={{ ...lbl, marginBottom: 22 }}>Contracted Scope Progress</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 36px" }}>
              <ContractRow label="Conservatory Design" paid={md.design} contract={45000} color={P.mdDesign} delay={0.15} />
              <ContractRow label="FF&E Package (ASR 1)" paid={md.ffe} contract={36250} color={P.mdFFE} delay={0.25} />
              <ContractRow label="Renderings" paid={md.rend} contract={2200} color={P.mdRend} delay={0.35} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
            <Card label="Contracted Remaining" value={fmt(md.ctRem)} sub={`${fmtPct(1-md.ctPct)} of ${fmtK(md.totalCt)}`} color={P.remaining} stagger={1} />
            <Card label="Contracted Paid" value={fmt(md.contracted)} sub="design + renderings" color={P.paid} stagger={2} />
            <Card label="Hourly Design" value={fmt(md.hourly)} sub="open-ended" color={P.mdHourly} stagger={3} />
            <Card label="Total Paid" value={fmt(md.total)} sub={`${MD_INVOICES.length} invoices`} color={P.accent} stagger={4} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
            <div className="fade-up stagger-3" style={box}>
              <div style={lbl}>Spend by Category</div>
              <div style={{ marginTop: 16 }}><ResponsiveContainer width="100%" height={200}><PieChart><Pie data={[{name:"Design",value:md.design},{name:"Hourly",value:md.hourly},...(md.rend>0?[{name:"Renderings",value:md.rend}]:[])].filter(d=>d.value>0)} dataKey="value" cx="50%" cy="50%" outerRadius={75} innerRadius={46} strokeWidth={0}><Cell fill={P.mdDesign}/><Cell fill={P.mdHourly}/>{md.rend>0&&<Cell fill={P.mdRend}/>}</Pie><Tooltip content={<Tip/>}/></PieChart></ResponsiveContainer></div>
              <Legend items={[{color:P.mdDesign,label:"Design",value:fmtK(md.design)},{color:P.mdHourly,label:"Hourly",value:fmtK(md.hourly)},{color:P.mdRend,label:"Renderings",value:fmtK(md.rend)}]} />
            </div>
            <div className="fade-up stagger-4" style={box}>
              <div style={lbl}>Contracted vs. Variable</div>
              <div style={{ marginTop: 16 }}><ResponsiveContainer width="100%" height={200}><PieChart><Pie data={[{name:"Contracted",value:md.contracted},{name:"Variable",value:md.variable}]} dataKey="value" cx="50%" cy="50%" outerRadius={75} innerRadius={46} strokeWidth={0}><Cell fill={P.md}/><Cell fill={P.mdHourly}/></Pie><Tooltip content={<Tip/>}/></PieChart></ResponsiveContainer></div>
              <Legend items={[{color:P.md,label:"Contracted",value:fmtK(md.contracted)},{color:P.mdHourly,label:"Variable",value:fmtK(md.variable)}]} />
            </div>
          </div>
        </div>)}

        {/* ═══ ALL VENDORS ═══ */}
        {isAll && (<div key="all">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
            <Card label="Total Paid" value={fmt(all.totalPaid)} sub={`${ALL_INVOICES.length} invoices · 3 vendors`} color={P.accent} stagger={1} />
            <Card label="Contracted Remaining" value={fmt(all.ctRem)} sub="all vendors" color={P.remaining} stagger={2} />
            <Card label="Variable Spend" value={fmt(all.variable)} sub="LS3P + Meyer Davis hourly" color={P.ca} stagger={3} />
            <Card label="Choate Progress" value={fmtPct(ch.pct)} sub={`${fmtK(ch.rem)} remaining`} color={P.choate} stagger={4} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
            <div className="fade-up stagger-3" style={box}>
              <div style={lbl}>Paid by Vendor</div>
              <div style={{ marginTop: 16 }}><ResponsiveContainer width="100%" height={180}><PieChart><Pie data={[{name:"Choate",value:ch.paid},{name:"LS3P",value:ls.total},{name:"Meyer Davis",value:md.total}]} dataKey="value" cx="50%" cy="50%" outerRadius={70} innerRadius={44} strokeWidth={0}><Cell fill={P.choate}/><Cell fill={P.ls3p}/><Cell fill={P.md}/></Pie><Tooltip content={<Tip/>}/></PieChart></ResponsiveContainer></div>
              <Legend items={[{color:P.choate,label:"Choate",value:fmtK(ch.paid)},{color:P.ls3p,label:"LS3P",value:fmtK(ls.total)},{color:P.md,label:"Meyer Davis",value:fmtK(md.total)}]} />
            </div>
            <div className="fade-up stagger-4" style={box}>
              <div style={lbl}>Choate Contract</div>
              <div style={{ marginTop: 16 }}><ResponsiveContainer width="100%" height={180}><PieChart><Pie data={[{name:"Paid",value:ch.paid},{name:"Remaining",value:ch.rem}]} dataKey="value" cx="50%" cy="50%" outerRadius={70} innerRadius={44} strokeWidth={0} startAngle={90} endAngle={-270}><Cell fill={P.paid}/><Cell fill={P.progressTrack}/></Pie><Tooltip content={<Tip/>}/></PieChart></ResponsiveContainer></div>
              <Legend items={[{color:P.paid,label:"Paid",value:fmtK(ch.paid)},{color:P.remaining,label:"Remaining",value:fmtK(ch.rem)}]} />
            </div>
          </div>
        </div>)}

        {/* ═══ TABLE ═══ */}
        {filtered.length > 0 && (
          <div className="table-container" style={{ background: `linear-gradient(135deg, ${P.surface} 0%, ${P.surfaceAlt} 100%)`, border: `1px solid ${P.border}`, borderRadius: 14, overflow: "hidden" }}>
            <div style={{ padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${P.border}` }}>
              <div style={lbl}>Payment History {!isAll && `· ${activeVendor}`}</div>
              <div style={{ fontSize: 11, color: P.textDim, fontFamily: "Outfit" }}>{filtered.length} payment{filtered.length!==1?"s":""} · {fmt(tableTotal)}</div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr>
                    {isAll && <TH onClick={() => handleSort("vendor")}>Vendor <SI field="vendor" /></TH>}
                    <TH onClick={() => handleSort("invoiceNo")}>Invoice # <SI field="invoiceNo" /></TH>
                    <TH>Description</TH>
                    <TH onClick={() => handleSort("period")}>Period <SI field="period" /></TH>
                    <TH onClick={() => handleSort("amount")} right>Amount <SI field="amount" /></TH>
                    {isLS3P && <TH right>Basic</TH>}
                    {isLS3P && <TH right>Consultant</TH>}
                    {isLS3P && <TH right>CA</TH>}
                    {isLS3P && <TH right>Redesign</TH>}
                    {isLS3P && <TH right>Other</TH>}
                    {isMD && <TH right>Design</TH>}
                    {isMD && <TH right>Hourly</TH>}
                    {isMD && <TH right>Other</TH>}
                    {showFndn && !isLS3P && !isMD && <TH right>Foundation</TH>}
                    {showFndn && !isLS3P && !isMD && <TH right>For-Profit</TH>}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((inv, i) => {
                    const lsOther = (inv.testFit||0)+(inv.renderings||0)+(inv.reimbursables||0);
                    const mdOther = (inv.ffePackage||0)+(inv.mdRenderings||0)+(inv.reimbursables||0);
                    return (
                      <tr key={inv.invoiceNo+i} className="row-hover" style={{ borderBottom: `1px solid ${P.border}20` }}>
                        {isAll && <td style={td}><span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: vColors[inv.vendor], boxShadow: `0 0 6px ${vColors[inv.vendor]}50`, flexShrink: 0 }} />{inv.vendor}</span></td>}
                        <td style={{ ...td, fontWeight: 600, color: P.text }}>{inv.invoiceNo}</td>
                        <td style={{ ...td, color: P.textSub }}>{inv.label}</td>
                        <td style={{ ...td, color: P.textSub }}>{inv.period}</td>
                        <td style={{ ...td, textAlign: "right", fontWeight: 700, color: P.text }}>{fmt(inv.amount)}</td>
                        {isLS3P && <TD val={inv.basicServices} color={P.basic} />}
                        {isLS3P && <TD val={inv.consultantServices} color={P.consultant} />}
                        {isLS3P && <TD val={inv.constructionAdmin} color={P.ca} />}
                        {isLS3P && <TD val={inv.spacePlanRedesign} color={P.redesign} />}
                        {isLS3P && <TD val={lsOther} color={P.textSub} />}
                        {isMD && <TD val={inv.design} color={P.mdDesign} />}
                        {isMD && <TD val={inv.designHourly} color={P.mdHourly} />}
                        {isMD && <TD val={mdOther} color={P.textSub} />}
                        {showFndn && !isLS3P && !isMD && <TD val={inv.foundation} color={P.foundation} />}
                        {showFndn && !isLS3P && !isMD && <TD val={inv.forProfit} color={P.textSub} />}
                      </tr>
                    );
                  })}
                  <tr style={{ background: `${P.navy}20` }}>
                    {isAll && <td style={td} />}
                    <td style={{ ...td, fontWeight: 700, color: P.accentBright }}>TOTAL</td>
                    <td style={td} /><td style={td} />
                    <td style={{ ...td, textAlign: "right", fontWeight: 700, color: P.accentBright, fontSize: 14 }}>{fmt(tableTotal)}</td>
                    {isLS3P && <td style={{ ...td, textAlign: "right", fontWeight: 600, color: P.basic, fontSize: 12 }}>{fmt(ls.bs)}</td>}
                    {isLS3P && <td style={{ ...td, textAlign: "right", fontWeight: 600, color: P.consultant, fontSize: 12 }}>{fmt(ls.cs)}</td>}
                    {isLS3P && <td style={{ ...td, textAlign: "right", fontWeight: 600, color: P.ca, fontSize: 12 }}>{fmt(ls.ca)}</td>}
                    {isLS3P && <td style={{ ...td, textAlign: "right", fontWeight: 600, color: P.redesign, fontSize: 12 }}>{fmt(ls.sp)}</td>}
                    {isLS3P && <td style={{ ...td, textAlign: "right", fontWeight: 600, color: P.textSub, fontSize: 12 }}>{fmt(ls.tf+ls.rn+ls.re)}</td>}
                    {isMD && <td style={{ ...td, textAlign: "right", fontWeight: 600, color: P.mdDesign, fontSize: 12 }}>{fmt(md.design)}</td>}
                    {isMD && <td style={{ ...td, textAlign: "right", fontWeight: 600, color: P.mdHourly, fontSize: 12 }}>{fmt(md.hourly)}</td>}
                    {isMD && <td style={{ ...td, textAlign: "right", fontWeight: 600, color: P.textSub, fontSize: 12 }}>{fmt(md.rend+md.ffe+md.reimb)}</td>}
                    {showFndn && !isLS3P && !isMD && <td style={{ ...td, textAlign: "right", fontWeight: 600, color: P.foundation }}>{fmt(ch.fndn)}</td>}
                    {showFndn && !isLS3P && !isMD && <td style={{ ...td, textAlign: "right", fontWeight: 600, color: P.textSub }}>{fmt(ch.fp)}</td>}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── FOOTER ── */}
        <div style={{ marginTop: 24, padding: "16px 0", borderTop: `1px solid ${P.border}40`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 10, color: P.textDim, fontFamily: "Outfit", letterSpacing: "0.02em" }}>Choate: Pay Apps 1–7 · LS3P: 10 invoices · Meyer Davis: 2 invoices</div>
          <div style={{ fontSize: 10, color: P.textDim, fontFamily: "Outfit" }}>Updated Feb 7, 2026</div>
        </div>
      </div>
    </div>
  );
}
