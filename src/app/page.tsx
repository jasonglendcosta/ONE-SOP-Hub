"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { departments, stats, type Department, type SOP } from "@/lib/data";

// ===== ICONS =====
const SearchIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
  <svg className={`w-[18px] h-[18px] transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [expandedSOP, setExpandedSOP] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Keyboard shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput')?.focus();
      }
      if (e.key === 'Escape') {
        setSelectedDept(null);
      }
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
      {/* ===== BACKGROUND EFFECTS ===== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating Orbs */}
        <div 
          className="absolute w-[700px] h-[700px] rounded-full opacity-50 -top-[250px] -right-[150px]"
          style={{ 
            background: 'linear-gradient(135deg, #D86DCB, #8B5CF6)',
            filter: 'blur(120px)',
            animation: 'float 25s ease-in-out infinite'
          }} 
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-50 -bottom-[200px] -left-[150px]"
          style={{ 
            background: 'linear-gradient(135deg, #B84CB8, #D86DCB)',
            filter: 'blur(120px)',
            animation: 'float 25s ease-in-out infinite',
            animationDelay: '-8s'
          }} 
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-40 top-[40%] left-[30%]"
          style={{ 
            background: 'linear-gradient(135deg, #8B5CF6, #B84CB8)',
            filter: 'blur(150px)',
            animation: 'float 25s ease-in-out infinite',
            animationDelay: '-16s'
          }} 
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full opacity-30 top-[20%] right-[25%]"
          style={{ 
            background: 'linear-gradient(135deg, #C4A062, #D86DCB)',
            filter: 'blur(120px)',
            animation: 'float 25s ease-in-out infinite',
            animationDelay: '-12s'
          }} 
        />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundImage: 'linear-gradient(rgba(216, 109, 203, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(216, 109, 203, 0.04) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} 
        />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-5 py-10 pb-24">
        
        {/* ===== HEADER ===== */}
        <header className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <div className="mb-6">
              <div className="space-grotesk text-[52px] font-light tracking-[14px] bg-gradient-to-r from-[#D86DCB] to-[#8B5CF6] bg-clip-text text-transparent">
                ONE
              </div>
              <div className="space-grotesk text-[11px] tracking-[10px] text-white/50 uppercase mt-1">
                Development
              </div>
            </div>

            {/* Badge */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-8 py-3 rounded-full text-[13px] font-bold tracking-[4px] uppercase mb-7"
              style={{ 
                background: 'linear-gradient(135deg, rgba(216, 109, 203, 0.2), rgba(139, 92, 246, 0.15))',
                border: '1px solid rgba(216, 109, 203, 0.3)',
                color: '#D86DCB',
                animation: 'pulse-glow 3s ease-in-out infinite',
                backdropFilter: 'blur(10px)'
              }}
            >
              <span style={{ animation: 'spin 4s linear infinite', display: 'inline-block' }}>⚡</span>
              GOD TIER EDITION
            </motion.div>

            {/* Title */}
            <h1 className="space-grotesk text-[clamp(38px,8vw,72px)] font-bold mb-5 leading-tight">
              <span className="gradient-text">SOP Command Center</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-white/70 max-w-[750px] mx-auto leading-relaxed mb-10">
              Enterprise-grade Standard Operating Procedures with complete process documentation, 
              responsible stakeholders, KPIs, and interactive workflows for{' '}
              <span className="text-[#D86DCB] font-semibold">{stats.totalDepartments} departments</span>.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-[650px] mx-auto relative mb-12"
          >
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#D86DCB]">
              <SearchIcon />
            </div>
            <input
              id="searchInput"
              type="text"
              placeholder="Search departments, SOPs, or keywords... (Ctrl+K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-5 pl-16 pr-7 rounded-[20px] text-base text-white placeholder:text-white/40 transition-all duration-300 focus:outline-none"
              style={{ 
                background: 'rgba(20, 20, 30, 0.6)',
                border: '1px solid rgba(216, 109, 203, 0.2)',
                backdropFilter: 'blur(20px)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#D86DCB';
                e.target.style.boxShadow = '0 0 40px rgba(216, 109, 203, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(216, 109, 203, 0.2)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-[900px] mx-auto"
          >
            {[
              { value: stats.totalSOPs, label: "Total SOPs" },
              { value: stats.totalDepartments, label: "Departments" },
              { value: stats.totalFlows, label: "Process Flows" },
              { value: stats.compliance, label: "RERA Compliant" }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ y: -8, borderColor: '#D86DCB', boxShadow: '0 20px 50px rgba(216, 109, 203, 0.25)' }}
                className="py-7 px-5 rounded-[20px] text-center transition-all duration-400 cursor-default"
                style={{ 
                  background: 'rgba(20, 20, 30, 0.6)',
                  border: '1px solid rgba(216, 109, 203, 0.15)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                <div className="space-grotesk text-[48px] font-bold bg-gradient-to-r from-[#D86DCB] to-[#8B5CF6] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-[11px] text-white/50 tracking-[2px] uppercase mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </header>

        {/* ===== DIVIDER ===== */}
        <div className="flex items-center justify-center gap-5 my-16">
          <div className="w-36 h-px" style={{ background: 'linear-gradient(90deg, transparent, #D86DCB, transparent)' }} />
          <div 
            className="w-4 h-4 rotate-45"
            style={{ 
              background: 'linear-gradient(135deg, #D86DCB, #8B5CF6)',
              boxShadow: '0 0 30px rgba(216, 109, 203, 0.4)',
              animation: 'pulse-diamond 2s ease-in-out infinite'
            }} 
          />
          <div className="w-36 h-px" style={{ background: 'linear-gradient(90deg, transparent, #D86DCB, transparent)' }} />
        </div>

        {/* ===== SECTION TITLE ===== */}
        <h2 className="space-grotesk text-center text-[13px] font-semibold tracking-[5px] uppercase text-white/50 mb-12">
          Department SOPs
        </h2>

        {/* ===== DEPARTMENT GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {filteredDepts.map((dept, i) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              whileHover={{ 
                y: -12, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              onClick={() => setSelectedDept(dept)}
              className="relative p-8 rounded-3xl cursor-pointer transition-all duration-500 overflow-hidden group"
              style={{ 
                background: 'rgba(20, 20, 30, 0.6)',
                border: '1px solid rgba(216, 109, 203, 0.12)',
                backdropFilter: 'blur(20px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(216, 109, 203, 0.5)';
                e.currentTarget.style.boxShadow = '0 30px 70px -20px rgba(216, 109, 203, 0.4), 0 0 0 1px rgba(216, 109, 203, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(216, 109, 203, 0.12)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Top gradient bar on hover */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, #D86DCB, #B84CB8, #8B5CF6)' }} 
              />
              
              {/* Radial glow on hover */}
              <div 
                className="absolute -inset-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(216, 109, 203, 0.08) 0%, transparent 40%)' }} 
              />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start gap-5 mb-6">
                  <div 
                    className="w-[68px] h-[68px] rounded-[18px] flex items-center justify-center text-[32px] shrink-0 transition-all duration-400 group-hover:scale-110 group-hover:rotate-[5deg]"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(216, 109, 203, 0.2), rgba(139, 92, 246, 0.15))',
                      border: '1px solid rgba(216, 109, 203, 0.25)'
                    }}
                  >
                    {dept.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span 
                      className="inline-block text-[10px] font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-md mb-2"
                      style={{ background: 'rgba(216, 109, 203, 0.12)', color: '#D86DCB' }}
                    >
                      {dept.id} DEPARTMENT
                    </span>
                    <h3 className="space-grotesk text-xl font-semibold mb-1.5 leading-tight">{dept.name}</h3>
                    <p className="text-[13px] text-white/50">
                      Process Owner: <strong className="text-[#D86DCB]">{dept.owner}</strong>
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-5 py-4 border-y border-white/5 mb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[#D86DCB]"><FileIcon /></span>
                    <span className="text-[13px] text-white/70">
                      <span className="font-bold text-white">{dept.sops.length}</span> SOPs
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-[#D86DCB]"><FlowIcon /></span>
                    <span className="text-[13px] text-white/70">
                      <span className="font-bold text-white">{dept.sops.length}</span> Flows
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <button 
                    className="flex items-center gap-2.5 px-7 py-3.5 rounded-[14px] text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                    style={{ 
                      background: 'linear-gradient(135deg, #D86DCB, #B84CB8)',
                      boxShadow: '0 6px 25px rgba(216, 109, 203, 0.35)'
                    }}
                  >
                    View All SOPs
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowIcon />
                    </span>
                  </button>
                  <div 
                    className="flex items-center gap-2 text-[11px] font-semibold px-3.5 py-2 rounded-full"
                    style={{ 
                      background: 'rgba(0, 210, 106, 0.1)',
                      border: '1px solid rgba(0, 210, 106, 0.2)',
                      color: '#00D26A'
                    }}
                  >
                    <span 
                      className="w-2 h-2 rounded-full"
                      style={{ background: '#00D26A', animation: 'pulse-dot 2s ease-in-out infinite' }} 
                    />
                    RERA Compliant
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredDepts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="space-grotesk text-2xl font-semibold mb-2">No Results Found</h3>
            <p className="text-white/50">Try searching for a different term</p>
          </motion.div>
        )}

        {/* ===== FOOTER ===== */}
        <footer className="text-center mt-24 pt-12 border-t border-white/5">
          <div className="space-grotesk text-2xl font-medium bg-gradient-to-r from-[#D86DCB] to-[#8B5CF6] bg-clip-text text-transparent mb-3">
            ONE DEVELOPMENT
          </div>
          <p className="text-sm text-white/50 mb-2">Enterprise-Grade Standard Operating Procedures</p>
          <p className="text-sm text-white/50">Created with GOD TIER Precision</p>
          <div 
            className="inline-flex items-center gap-2.5 mt-5 px-6 py-2.5 rounded-full text-[13px]"
            style={{ 
              background: 'rgba(216, 109, 203, 0.1)',
              border: '1px solid rgba(216, 109, 203, 0.2)',
              color: '#D86DCB'
            }}
          >
            <span>⚡</span> January 2026 | Dubai, UAE
          </div>
        </footer>
      </div>

      {/* ===== MODAL ===== */}
      <AnimatePresence>
        {selectedDept && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 md:p-8 overflow-y-auto"
            style={{ background: 'rgba(10, 10, 15, 0.97)', backdropFilter: 'blur(15px)' }}
            onClick={() => setSelectedDept(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-[1100px] my-8 rounded-[28px] overflow-hidden"
              style={{ 
                background: 'linear-gradient(180deg, rgba(25, 25, 35, 0.98) 0%, rgba(15, 15, 20, 0.98) 100%)',
                border: '1px solid rgba(216, 109, 203, 0.25)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div 
                className="flex items-center justify-between p-8 md:p-9 border-b border-white/5"
                style={{ background: 'linear-gradient(135deg, rgba(216, 109, 203, 0.12), rgba(139, 92, 246, 0.08))' }}
              >
                <div className="flex items-center gap-5">
                  <div 
                    className="w-16 h-16 rounded-[18px] flex items-center justify-center text-[32px]"
                    style={{ 
                      background: 'linear-gradient(135deg, #D86DCB, #8B5CF6)',
                      boxShadow: '0 15px 40px rgba(216, 109, 203, 0.4)'
                    }}
                  >
                    {selectedDept.icon}
                  </div>
                  <div>
                    <span className="space-grotesk text-xs font-bold tracking-[2px] text-[#D86DCB]">
                      {selectedDept.id} DEPARTMENT
                    </span>
                    <h2 className="space-grotesk text-2xl md:text-[28px] font-semibold mt-1">
                      {selectedDept.name}
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDept(null)}
                  className="w-[52px] h-[52px] rounded-[16px] flex items-center justify-center transition-all duration-300 hover:rotate-90"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.7)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(216, 109, 203, 0.2)';
                    e.currentTarget.style.borderColor = '#D86DCB';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                  }}
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-9">
                {/* Overview Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div 
                    className="p-6 rounded-[18px]"
                    style={{ background: 'rgba(216, 109, 203, 0.06)', border: '1px solid rgba(216, 109, 203, 0.12)' }}
                  >
                    <h4 className="space-grotesk text-[11px] font-bold tracking-[2px] uppercase text-[#D86DCB] mb-3.5 flex items-center gap-2">
                      <InfoIcon />
                      Department Overview
                    </h4>
                    <p className="text-sm text-white/70 leading-relaxed">{selectedDept.description}</p>
                  </div>
                  <div 
                    className="p-6 rounded-[18px]"
                    style={{ background: 'rgba(216, 109, 203, 0.06)', border: '1px solid rgba(216, 109, 203, 0.12)' }}
                  >
                    <h4 className="space-grotesk text-[11px] font-bold tracking-[2px] uppercase text-[#D86DCB] mb-3.5 flex items-center gap-2">
                      <UsersIcon />
                      Responsible Stakeholders
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedDept.responsible.map((r, i) => (
                        <span 
                          key={i}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px]"
                          style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)' }}
                        >
                          <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* KPIs */}
                <div 
                  className="p-6 rounded-[18px] mb-8"
                  style={{ background: 'rgba(216, 109, 203, 0.06)', border: '1px solid rgba(216, 109, 203, 0.12)' }}
                >
                  <h4 className="space-grotesk text-[11px] font-bold tracking-[2px] uppercase text-[#D86DCB] mb-4 flex items-center gap-2">
                    <ChartIcon />
                    Key Performance Indicators
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {selectedDept.kpis.map((kpi, i) => (
                      <div 
                        key={i}
                        className="p-4 rounded-xl text-center"
                        style={{ background: 'rgba(255, 255, 255, 0.03)' }}
                      >
                        <div className="space-grotesk text-[22px] font-bold text-[#00D26A]">{kpi.value}</div>
                        <div className="text-[10px] text-white/50 uppercase tracking-[1px] mt-1">{kpi.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SOPs Section */}
                <div className="space-grotesk text-xs font-semibold tracking-[3px] uppercase text-white/50 mb-5 flex items-center gap-3">
                  Standard Operating Procedures ({selectedDept.sops.length})
                  <div className="flex-1 h-px bg-white/5" />
                </div>

                <div className="space-y-3.5">
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

// ===== SOP CARD COMPONENT =====
function SOPCard({ sop, index, expanded, onToggle }: { sop: SOP; index: number; expanded: boolean; onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-[18px] overflow-hidden transition-all duration-300"
      style={{ 
        background: 'rgba(255, 255, 255, 0.02)',
        border: expanded ? '1px solid #D86DCB' : '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: expanded ? '0 15px 50px rgba(216, 109, 203, 0.15)' : 'none'
      }}
    >
      {/* SOP Header */}
      <div
        className="flex items-center gap-4 md:gap-5 p-5 md:p-6 cursor-pointer transition-colors duration-200 hover:bg-[rgba(216,109,203,0.06)]"
        onClick={onToggle}
      >
        <div 
          className="w-11 h-11 md:w-[46px] md:h-[46px] rounded-[14px] flex items-center justify-center shrink-0 space-grotesk text-base font-bold"
          style={{ 
            background: 'linear-gradient(135deg, rgba(216, 109, 203, 0.15), rgba(139, 92, 246, 0.1))',
            border: '1px solid rgba(216, 109, 203, 0.2)',
            color: '#D86DCB'
          }}
        >
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className="space-grotesk text-[11px] font-semibold tracking-[1.5px] text-white/50 mb-1">{sop.id}</div>
          <div className="text-[15px] font-medium truncate">{sop.title}</div>
        </div>
        <button 
          className="w-9 h-9 rounded-[10px] flex items-center justify-center transition-all duration-300"
          style={{ 
            background: expanded ? '#D86DCB' : 'rgba(255, 255, 255, 0.04)',
            color: expanded ? 'white' : 'rgba(255, 255, 255, 0.5)'
          }}
        >
          <ChevronIcon expanded={expanded} />
        </button>
      </div>

      {/* SOP Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-6 border-t border-white/5">
              {/* Purpose */}
              <div 
                className="my-5 p-4 md:p-5 rounded-r-[14px]"
                style={{ background: 'rgba(139, 92, 246, 0.08)', borderLeft: '3px solid #8B5CF6' }}
              >
                <h5 className="text-[11px] font-bold tracking-[1.5px] uppercase text-[#8B5CF6] mb-2.5">
                  Purpose & Objective
                </h5>
                <p className="text-sm text-white/70 leading-relaxed">{sop.purpose}</p>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 my-5">
                {[
                  { label: 'Process Owner', value: sop.owner, color: '#D86DCB' },
                  { label: 'Version', value: sop.version, color: 'white' },
                  { label: 'Target', value: sop.kpis.target, color: '#00D26A' },
                  { label: 'Accuracy', value: sop.kpis.accuracy, color: '#00D26A' },
                  { label: 'SLA', value: sop.kpis.sla, color: 'white' },
                  { label: 'Status', value: 'Active', color: '#00D26A' }
                ].map((item, j) => (
                  <div 
                    key={j}
                    className="p-4 rounded-xl"
                    style={{ background: 'rgba(255, 255, 255, 0.02)' }}
                  >
                    <div className="text-[10px] font-semibold tracking-[1px] uppercase text-white/50 mb-1.5">
                      {item.label}
                    </div>
                    <div className="text-sm font-semibold truncate" style={{ color: item.color }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Process Flow */}
              <div 
                className="p-5 md:p-6 rounded-[16px] my-5"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(216, 109, 203, 0.06), rgba(139, 92, 246, 0.04))',
                  border: '1px solid rgba(216, 109, 203, 0.12)'
                }}
              >
                <h5 className="text-[11px] font-bold tracking-[1.5px] uppercase text-[#D86DCB] mb-5 flex items-center gap-2.5">
                  <FlowIcon />
                  Interactive Process Flow
                </h5>
                <div className="flex flex-wrap items-center gap-3">
                  {sop.flow.map((step, j) => (
                    <div key={j} className="contents">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: j * 0.05 }}
                        whileHover={{ y: -2, background: 'rgba(216, 109, 203, 0.1)', borderColor: '#D86DCB' }}
                        className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-[13px] transition-all duration-200 cursor-default"
                        style={{ 
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)'
                        }}
                      >
                        <span 
                          className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold text-white"
                          style={{ background: 'linear-gradient(135deg, #D86DCB, #8B5CF6)' }}
                        >
                          {j + 1}
                        </span>
                        {step}
                      </motion.div>
                      {j < sop.flow.length - 1 && (
                        <span className="text-[#D86DCB] text-lg">➔</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3.5 mt-6">
                <button 
                  className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[14px] text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                  style={{ 
                    background: 'linear-gradient(135deg, #D86DCB, #B84CB8)',
                    boxShadow: '0 6px 25px rgba(216, 109, 203, 0.3)'
                  }}
                >
                  <FlowIcon />
                  View Full Process Flow
                </button>
                <button 
                  className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[14px] text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                  style={{ 
                    background: 'rgba(0, 210, 106, 0.1)',
                    border: '1px solid rgba(0, 210, 106, 0.25)',
                    color: '#00D26A'
                  }}
                >
                  <DownloadIcon />
                  Download DOCX
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
