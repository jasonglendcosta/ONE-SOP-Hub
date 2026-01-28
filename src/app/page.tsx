"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { departments, stats, type Department, type SOP } from "@/lib/data";
import SOPAssistant from "@/components/SOPAssistant";

// ============================================
// ANIMATED COUNTER
// ============================================
function AnimatedCounter({ value, duration = 2 }: { value: number | string; duration?: number }) {
  const numericValue = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '')) || 0 : value;
  const suffix = typeof value === 'string' ? value.replace(/[0-9]/g, '') : '';
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (v) => Math.round(v));
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    spring.set(numericValue);
    const unsubscribe = display.on("change", (v) => setCurrent(v));
    return () => unsubscribe();
  }, [numericValue, spring, display]);

  return <span>{current}{suffix}</span>;
}

// ============================================
// ICONS
// ============================================
const SearchIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const FileIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const FlowIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
  <svg
    className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const SparkleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
  </svg>
);

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [expandedSOP, setExpandedSOP] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput')?.focus();
      }
      if (e.key === 'Escape') setSelectedDept(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredDepts = useMemo(() => {
    if (!searchQuery.trim()) return departments;
    const q = searchQuery.toLowerCase();
    return departments.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.id.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.sops.some(s => s.title.toLowerCase().includes(q) || s.id.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative">
      {/* ===== BACKGROUND ===== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Orbs */}
        <div
          className="absolute w-[700px] h-[700px] rounded-full opacity-50 -top-[250px] -right-[150px] animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(216, 109, 203, 0.5) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-50 -bottom-[200px] -left-[150px] animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(184, 76, 184, 0.5) 0%, rgba(216, 109, 203, 0.2) 50%, transparent 70%)',
            filter: 'blur(100px)',
            animationDelay: '-8s'
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-30 top-[40%] left-[30%] animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 60%)',
            filter: 'blur(120px)',
            animationDelay: '-16s'
          }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(216, 109, 203, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(216, 109, 203, 0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ===== HEADER ===== */}
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <div className="mb-8">
              <h1 className="font-display text-6xl md:text-7xl font-light tracking-[0.3em] text-gradient">
                ONE
              </h1>
              <p className="font-display text-xs tracking-[0.5em] text-white/40 uppercase mt-2">
                Development
              </p>
            </div>

            {/* Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-8 animate-pulse-glow"
              style={{
                background: 'linear-gradient(135deg, rgba(216, 109, 203, 0.15), rgba(139, 92, 246, 0.1))',
                border: '1px solid rgba(216, 109, 203, 0.3)',
                color: '#D86DCB',
              }}
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <SparkleIcon />
              </motion.span>
              <span>GOD TIER EDITION</span>
              <motion.span
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <SparkleIcon />
              </motion.span>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              SOP Command Center
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="text-lg text-white/60 max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Enterprise-grade Standard Operating Procedures with complete process documentation,
              stakeholders, KPIs, and workflows for{' '}
              <span className="text-[#D86DCB] font-semibold">{stats.totalDepartments} departments</span>.
            </motion.p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-xl mx-auto mb-12"
          >
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D86DCB]">
                <SearchIcon />
              </div>
              <input
                id="searchInput"
                type="text"
                placeholder="Search departments, SOPs, keywords... (Ctrl+K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-4 pl-12 pr-4 rounded-2xl text-white placeholder:text-white/40 bg-white/5 border border-white/10 focus:border-[#D86DCB]/50 focus:outline-none focus:ring-2 focus:ring-[#D86DCB]/20 transition-all"
              />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { value: stats.totalSOPs, label: "Total SOPs", color: "#D86DCB" },
              { value: stats.totalDepartments, label: "Departments", color: "#8B5CF6" },
              { value: stats.totalFlows, label: "Workflows", color: "#B84CB8" },
              { value: stats.compliance, label: "RERA Compliant", color: "#00D26A" }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass rounded-2xl p-6 text-center cursor-default shimmer-container"
              >
                <div
                  className="font-display text-4xl md:text-5xl font-bold mb-2"
                  style={{ color: stat.color }}
                >
                  <AnimatedCounter value={stat.value} duration={2 + i * 0.3} />
                </div>
                <div className="text-xs text-white/50 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </header>

        {/* ===== DIVIDER ===== */}
        <div className="flex items-center justify-center gap-4 my-16">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D86DCB]/50 to-transparent" />
          <motion.div
            className="w-3 h-3 bg-gradient-to-br from-[#D86DCB] to-[#8B5CF6] rounded-sm"
            animate={{ rotate: [45, 225, 45], scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ boxShadow: '0 0 20px rgba(216, 109, 203, 0.5)' }}
          />
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D86DCB]/50 to-transparent" />
        </div>

        {/* ===== SECTION TITLE ===== */}
        <h3 className="font-display text-center text-xs font-semibold tracking-[0.3em] uppercase text-white/40 mb-10">
          Department SOPs
        </h3>

        {/* ===== DEPARTMENT GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepts.map((dept, i) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedDept(dept)}
              className="glass rounded-3xl p-6 cursor-pointer card-hover shimmer-container group"
            >
              {/* Top Bar */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'linear-gradient(90deg, transparent, #D86DCB, #8B5CF6, #D86DCB, transparent)' }}
              />

              {/* Header */}
              <div className="flex items-start gap-4 mb-5">
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(216, 109, 203, 0.15), rgba(139, 92, 246, 0.1))',
                    border: '1px solid rgba(216, 109, 203, 0.2)',
                  }}
                >
                  {dept.icon}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <span
                    className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-md mb-2"
                    style={{
                      background: 'rgba(216, 109, 203, 0.1)',
                      color: '#D86DCB',
                      border: '1px solid rgba(216, 109, 203, 0.15)',
                    }}
                  >
                    {dept.id}
                  </span>
                  <h4 className="font-display text-lg font-semibold text-white truncate">
                    {dept.name}
                  </h4>
                  <p className="text-xs text-white/50 mt-1">
                    Owner: <span className="text-[#D86DCB]">{dept.owner}</span>
                  </p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex gap-4 py-3 border-t border-b border-white/5 mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-[#D86DCB]"><FileIcon /></span>
                  <span className="text-sm text-white/60">
                    <strong className="text-white">{dept.sops.length}</strong> SOPs
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#8B5CF6]"><FlowIcon /></span>
                  <span className="text-sm text-white/60">
                    <strong className="text-white">{dept.sops.length}</strong> Flows
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #D86DCB, #B84CB8)',
                    boxShadow: '0 4px 15px rgba(216, 109, 203, 0.3)',
                  }}
                >
                  View SOPs
                  <ArrowIcon />
                </motion.button>
                <div
                  className="flex items-center gap-1.5 text-[10px] font-semibold px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(0, 210, 106, 0.1)',
                    border: '1px solid rgba(0, 210, 106, 0.2)',
                    color: '#00D26A',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D26A] animate-pulse" />
                  RERA
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredDepts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-display text-xl font-semibold mb-2">No Results Found</h3>
            <p className="text-white/50">Try a different search term</p>
          </motion.div>
        )}

        {/* ===== FOOTER ===== */}
        <footer className="text-center mt-24 pt-12 border-t border-white/5">
          <div className="font-display text-xl font-medium text-gradient-static mb-3">
            ONE DEVELOPMENT
          </div>
          <p className="text-sm text-white/40 mb-4">Enterprise-Grade SOPs • GOD TIER Precision</p>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs"
            style={{
              background: 'rgba(216, 109, 203, 0.08)',
              border: '1px solid rgba(216, 109, 203, 0.15)',
              color: 'rgba(216, 109, 203, 0.8)',
            }}
          >
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
              ⚡
            </motion.span>
            January 2026 • Dubai, UAE
          </div>
        </footer>
      </div>

      {/* ===== SOP ASSISTANT ===== */}
      <SOPAssistant />

      {/* ===== MODAL ===== */}
      <AnimatePresence>
        {selectedDept && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
            style={{ background: 'rgba(5, 5, 10, 0.95)', backdropFilter: 'blur(10px)' }}
            onClick={() => setSelectedDept(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="w-full max-w-4xl my-8 rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, rgba(20, 20, 30, 0.98) 0%, rgba(10, 10, 18, 0.99) 100%)',
                border: '1px solid rgba(216, 109, 203, 0.2)',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div
                className="flex items-center justify-between p-6 border-b border-white/5"
                style={{ background: 'linear-gradient(135deg, rgba(216, 109, 203, 0.08), rgba(139, 92, 246, 0.04))' }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    style={{
                      background: 'linear-gradient(135deg, #D86DCB, #8B5CF6)',
                      boxShadow: '0 10px 30px rgba(216, 109, 203, 0.3)',
                    }}
                  >
                    {selectedDept.icon}
                  </motion.div>
                  <div>
                    <span className="font-display text-xs font-bold tracking-wider text-[#D86DCB]">
                      {selectedDept.id} DEPARTMENT
                    </span>
                    <h2 className="font-display text-2xl font-semibold text-white">
                      {selectedDept.name}
                    </h2>
                  </div>
                </div>
                <motion.button
                  onClick={() => setSelectedDept(null)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CloseIcon />
                </motion.button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {/* Info Cards */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl" style={{ background: 'rgba(216, 109, 203, 0.05)', border: '1px solid rgba(216, 109, 203, 0.1)' }}>
                    <h4 className="font-display text-xs font-bold tracking-wider uppercase text-[#D86DCB] mb-3 flex items-center gap-2">
                      <InfoIcon /> Overview
                    </h4>
                    <p className="text-sm text-white/60 leading-relaxed">{selectedDept.description}</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.1)' }}>
                    <h4 className="font-display text-xs font-bold tracking-wider uppercase text-[#8B5CF6] mb-3 flex items-center gap-2">
                      <UsersIcon /> Stakeholders
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDept.responsible.map((r, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
                          style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.15)' }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* KPIs */}
                <div className="p-4 rounded-xl mb-6" style={{ background: 'rgba(216, 109, 203, 0.03)', border: '1px solid rgba(216, 109, 203, 0.08)' }}>
                  <h4 className="font-display text-xs font-bold tracking-wider uppercase text-[#D86DCB] mb-4 flex items-center gap-2">
                    <ChartIcon /> KPIs
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {selectedDept.kpis.map((kpi, i) => (
                      <div key={i} className="p-3 rounded-lg text-center" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                        <div className="font-display text-xl font-bold text-[#00D26A]">{kpi.value}</div>
                        <div className="text-[10px] text-white/40 uppercase mt-1">{kpi.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SOPs */}
                <div className="font-display text-xs font-semibold tracking-wider uppercase text-white/40 mb-4 flex items-center gap-3">
                  SOPs ({selectedDept.sops.length})
                  <div className="flex-1 h-px bg-white/5" />
                </div>

                <div className="space-y-3">
                  {selectedDept.sops.map((sop, i) => (
                    <SOPCard
                      key={sop.id}
                      sop={sop}
                      index={i}
                      expanded={expandedSOP === sop.id}
                      onToggle={() => setExpandedSOP(expandedSOP === sop.id ? null : sop.id)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// SOP CARD COMPONENT
// ============================================
function SOPCard({ sop, index, expanded, onToggle }: { sop: SOP; index: number; expanded: boolean; onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className="rounded-xl overflow-hidden transition-all"
      style={{
        background: expanded ? 'rgba(216, 109, 203, 0.03)' : 'rgba(255, 255, 255, 0.02)',
        border: expanded ? '1px solid rgba(216, 109, 203, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
        onClick={onToggle}
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center font-display text-sm font-bold shrink-0"
          style={{
            background: expanded ? 'linear-gradient(135deg, #D86DCB, #8B5CF6)' : 'rgba(216, 109, 203, 0.1)',
            color: expanded ? 'white' : '#D86DCB',
          }}
        >
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-display text-[10px] font-semibold tracking-wider text-white/40 mb-0.5">{sop.id}</div>
          <div className="text-sm font-medium text-white/90 truncate">{sop.title}</div>
        </div>
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          style={{
            background: expanded ? 'linear-gradient(135deg, #D86DCB, #8B5CF6)' : 'rgba(255, 255, 255, 0.05)',
            color: expanded ? 'white' : 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <ChevronIcon expanded={expanded} />
        </button>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-white/5 pt-4">
              {/* Purpose */}
              <div
                className="p-4 rounded-lg mb-4"
                style={{ background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.08), transparent)', borderLeft: '3px solid #8B5CF6' }}
              >
                <h5 className="text-xs font-bold tracking-wider uppercase text-[#8B5CF6] mb-2">Purpose</h5>
                <p className="text-sm text-white/60 leading-relaxed">{sop.purpose}</p>
              </div>

              {/* Meta */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
                {[
                  { label: 'Owner', value: sop.owner, color: '#D86DCB' },
                  { label: 'Version', value: sop.version, color: '#fff' },
                  { label: 'Target', value: sop.kpis.target, color: '#00D26A' },
                  { label: 'Accuracy', value: sop.kpis.accuracy, color: '#00D26A' },
                  { label: 'SLA', value: sop.kpis.sla, color: '#fff' },
                  { label: 'Status', value: 'Active', color: '#00D26A' }
                ].map((item, j) => (
                  <div key={j} className="p-2.5 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                    <div className="text-[9px] font-semibold tracking-wider uppercase text-white/40 mb-1">{item.label}</div>
                    <div className="text-xs font-semibold truncate" style={{ color: item.color }}>{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Flow */}
              <div className="p-4 rounded-xl mb-4" style={{ background: 'rgba(216, 109, 203, 0.03)', border: '1px solid rgba(216, 109, 203, 0.08)' }}>
                <h5 className="text-xs font-bold tracking-wider uppercase text-[#D86DCB] mb-3 flex items-center gap-2">
                  <FlowIcon /> Process Flow
                </h5>
                <div className="flex flex-wrap items-center gap-2">
                  {sop.flow.map((step, j) => (
                    <div key={j} className="contents">
                      <div
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                        style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}
                      >
                        <span
                          className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ background: 'linear-gradient(135deg, #D86DCB, #8B5CF6)' }}
                        >
                          {j + 1}
                        </span>
                        <span className="text-white/70">{step}</span>
                      </div>
                      {j < sop.flow.length - 1 && <span className="text-[#D86DCB]">→</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #D86DCB, #B84CB8)',
                    boxShadow: '0 4px 15px rgba(216, 109, 203, 0.3)',
                  }}
                >
                  <FlowIcon /> View Full Flow
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold"
                  style={{
                    background: 'rgba(0, 210, 106, 0.1)',
                    border: '1px solid rgba(0, 210, 106, 0.2)',
                    color: '#00D26A',
                  }}
                >
                  <DownloadIcon /> Download DOCX
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
