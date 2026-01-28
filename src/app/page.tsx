"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { departments, stats, type Department, type SOP } from "@/lib/data";
import SOPAssistant from "@/components/SOPAssistant";

// ============================================
// ANIMATED COUNTER COMPONENT
// ============================================
function AnimatedCounter({ value, suffix = "", duration = 2 }: { value: number | string; suffix?: string; duration?: number }) {
  const numericValue = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '')) || 0 : value;
  const springValue = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const displayValue = useTransform(springValue, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    springValue.set(numericValue);
    const unsubscribe = displayValue.on("change", (v) => setDisplay(v));
    return () => unsubscribe();
  }, [numericValue, springValue, displayValue]);

  const displaySuffix = typeof value === 'string' ? value.replace(/[0-9]/g, '') : suffix;

  return <span>{display}{displaySuffix}</span>;
}

// ============================================
// 3D TILT CARD COMPONENT
// ============================================
function TiltCard({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -8;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 8;
    setTransform({ rotateX, rotateY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setIsHovering(false);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`card-3d ${className || ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="card-3d-inner w-full h-full"
        animate={{
          rotateX: transform.rotateX,
          rotateY: transform.rotateY,
          scale: isHovering ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ============================================
// ICONS
// ============================================
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

const SparkleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
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
    <div className="min-h-screen relative noise-overlay">
      {/* ============================================
          BACKGROUND EFFECTS
          ============================================ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Primary Orb - Top Right */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full opacity-40 -top-[300px] -right-[200px]"
          animate={{
            x: [0, 50, -30, 50, 0],
            y: [0, -40, 30, -20, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: 'radial-gradient(circle, rgba(216, 109, 203, 0.6) 0%, rgba(139, 92, 246, 0.3) 50%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Secondary Orb - Bottom Left */}
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full opacity-40 -bottom-[250px] -left-[200px]"
          animate={{
            x: [0, -40, 30, -50, 0],
            y: [0, 30, -40, 20, 0],
            scale: [1, 0.95, 1.1, 1, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          style={{
            background: 'radial-gradient(circle, rgba(184, 76, 184, 0.5) 0%, rgba(216, 109, 203, 0.2) 50%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />

        {/* Center Glow */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-25 top-[35%] left-[35%]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 60%)',
            filter: 'blur(120px)',
          }}
        />

        {/* Accent Orb */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-20 top-[15%] right-[20%]"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 10 }}
          style={{
            background: 'radial-gradient(circle, rgba(196, 160, 98, 0.4) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(216, 109, 203, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(216, 109, 203, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Radial Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, transparent 0%, rgba(10, 10, 15, 0.5) 70%)'
          }}
        />
      </div>

      {/* ============================================
          CONTENT
          ============================================ */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-5 py-12 pb-28">

        {/* ============================================
            HEADER / HERO SECTION
            ============================================ */}
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Logo */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="space-grotesk text-[56px] md:text-[64px] font-light tracking-[16px] gradient-text">
                ONE
              </div>
              <div className="space-grotesk text-[12px] tracking-[12px] text-white/40 uppercase mt-2 font-medium">
                Development
              </div>
            </motion.div>

            {/* GOD TIER Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-[12px] font-bold tracking-[4px] uppercase mb-10 relative overflow-hidden group cursor-default"
              style={{
                background: 'linear-gradient(135deg, rgba(216, 109, 203, 0.15), rgba(139, 92, 246, 0.1))',
                border: '1px solid rgba(216, 109, 203, 0.3)',
                color: '#D86DCB',
              }}
            >
              {/* Animated border */}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'conic-gradient(from 0deg, #D86DCB, #8B5CF6, #B84CB8, #D86DCB)',
                  padding: '1px',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  animation: 'spin 3s linear infinite',
                }}
              />
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="text-lg"
              >
                <SparkleIcon />
              </motion.span>
              <span className="relative z-10">GOD TIER EDITION</span>
              <motion.span
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="text-lg"
              >
                <SparkleIcon />
              </motion.span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="space-grotesk text-[clamp(42px,9vw,80px)] font-bold mb-6 leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="gradient-text">SOP Command Center</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-white/60 max-w-[800px] mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Enterprise-grade Standard Operating Procedures with complete process documentation,
              responsible stakeholders, KPIs, and interactive workflows for{' '}
              <span className="text-[#D86DCB] font-semibold">{stats.totalDepartments} departments</span>.
            </motion.p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="max-w-[700px] mx-auto relative mb-16"
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
              className="w-full py-5 pl-16 pr-8 rounded-2xl text-base text-white placeholder:text-white/35 transition-all duration-300 focus:outline-none glass-card-strong"
              style={{
                border: '1px solid rgba(216, 109, 203, 0.15)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(216, 109, 203, 0.5)';
                e.target.style.boxShadow = '0 0 50px rgba(216, 109, 203, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(216, 109, 203, 0.15)';
                e.target.style.boxShadow = 'none';
              }}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-white/40 font-mono">
              <span>Ctrl</span>
              <span>+</span>
              <span>K</span>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-[1000px] mx-auto"
          >
            {[
              { value: stats.totalSOPs, label: "Total SOPs", color: "#D86DCB" },
              { value: stats.totalDepartments, label: "Departments", color: "#8B5CF6" },
              { value: stats.totalFlows, label: "Process Flows", color: "#B84CB8" },
              { value: stats.compliance, label: "RERA Compliant", color: "#00D26A" }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="relative py-8 px-6 rounded-2xl text-center cursor-default overflow-hidden group glass-card shimmer"
                style={{
                  border: '1px solid rgba(216, 109, 203, 0.1)',
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${stat.color}15 0%, transparent 70%)`,
                  }}
                />

                <div
                  className="space-grotesk text-[52px] md:text-[56px] font-bold leading-none relative z-10"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}, ${stat.color}99)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  <AnimatedCounter value={stat.value} duration={2 + i * 0.3} />
                </div>
                <div className="text-[11px] text-white/50 tracking-[2px] uppercase mt-3 font-medium relative z-10">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </header>

        {/* ============================================
            DIVIDER
            ============================================ */}
        <div className="flex items-center justify-center gap-6 my-20">
          <motion.div
            className="w-40 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(216, 109, 203, 0.5), transparent)' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          />
          <motion.div
            className="w-4 h-4"
            style={{
              background: 'linear-gradient(135deg, #D86DCB, #8B5CF6)',
              boxShadow: '0 0 30px rgba(216, 109, 203, 0.5)',
            }}
            animate={{
              rotate: [45, 45, 225, 225, 45],
              scale: [1, 1.2, 1, 1.2, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="w-40 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(216, 109, 203, 0.5), transparent)' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          />
        </div>

        {/* ============================================
            SECTION TITLE
            ============================================ */}
        <motion.h2
          className="space-grotesk text-center text-[13px] font-semibold tracking-[6px] uppercase text-white/40 mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          Department SOPs
        </motion.h2>

        {/* ============================================
            DEPARTMENT GRID
            ============================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {filteredDepts.map((dept, i) => (
            <TiltCard
              key={dept.id}
              onClick={() => setSelectedDept(dept)}
              className="cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + i * 0.05, duration: 0.6 }}
                className="relative p-7 md:p-8 rounded-3xl overflow-hidden group h-full gradient-border shimmer"
                style={{
                  background: 'rgba(15, 15, 25, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(216, 109, 203, 0.08)',
                }}
              >
                {/* Top gradient bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #D86DCB, #8B5CF6, #D86DCB, transparent)',
                  }}
                />

                {/* Radial glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(216, 109, 203, 0.1) 0%, transparent 50%)',
                  }}
                />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start gap-5 mb-6">
                    <motion.div
                      className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center text-[34px] shrink-0 relative overflow-hidden"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      style={{
                        background: 'linear-gradient(135deg, rgba(216, 109, 203, 0.2), rgba(139, 92, 246, 0.15))',
                        border: '1px solid rgba(216, 109, 203, 0.25)',
                        boxShadow: '0 8px 32px rgba(216, 109, 203, 0.15)',
                      }}
                    >
                      {dept.icon}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <span
                        className="inline-block text-[10px] font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-lg mb-2.5"
                        style={{
                          background: 'rgba(216, 109, 203, 0.1)',
                          color: '#D86DCB',
                          border: '1px solid rgba(216, 109, 203, 0.15)',
                        }}
                      >
                        {dept.id} DEPARTMENT
                      </span>
                      <h3 className="space-grotesk text-xl md:text-[22px] font-semibold mb-2 leading-tight text-white">
                        {dept.name}
                      </h3>
                      <p className="text-[13px] text-white/50">
                        Process Owner: <strong className="text-[#D86DCB] font-medium">{dept.owner}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-6 py-4 border-y border-white/[0.06] mb-6">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#D86DCB]"><FileIcon /></span>
                      <span className="text-[13px] text-white/60">
                        <span className="font-bold text-white">{dept.sops.length}</span> SOPs
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#8B5CF6]"><FlowIcon /></span>
                      <span className="text-[13px] text-white/60">
                        <span className="font-bold text-white">{dept.sops.length}</span> Flows
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, #D86DCB, #B84CB8)',
                        boxShadow: '0 4px 20px rgba(216, 109, 203, 0.3)',
                      }}
                    >
                      View All SOPs
                      <motion.span
                        className="inline-block"
                        whileHover={{ x: 4 }}
                      >
                        <ArrowIcon />
                      </motion.span>
                    </motion.button>
                    <div
                      className="flex items-center gap-2 text-[11px] font-semibold px-3.5 py-2 rounded-full"
                      style={{
                        background: 'rgba(0, 210, 106, 0.08)',
                        border: '1px solid rgba(0, 210, 106, 0.2)',
                        color: '#00D26A',
                      }}
                    >
                      <motion.span
                        className="w-2 h-2 rounded-full"
                        style={{ background: '#00D26A' }}
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      RERA
                    </div>
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        {/* No Results */}
        {filteredDepts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <div className="text-7xl mb-5">🔍</div>
            <h3 className="space-grotesk text-2xl font-semibold mb-3">No Results Found</h3>
            <p className="text-white/50">Try searching for a different term</p>
          </motion.div>
        )}

        {/* ============================================
            FOOTER
            ============================================ */}
        <footer className="text-center mt-28 pt-14 border-t border-white/[0.05]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-grotesk text-2xl font-medium gradient-text-static mb-4">
              ONE DEVELOPMENT
            </div>
            <p className="text-sm text-white/40 mb-2">Enterprise-Grade Standard Operating Procedures</p>
            <p className="text-sm text-white/40 mb-6">Created with GOD TIER Precision</p>
            <div
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-[13px]"
              style={{
                background: 'rgba(216, 109, 203, 0.08)',
                border: '1px solid rgba(216, 109, 203, 0.15)',
                color: 'rgba(216, 109, 203, 0.8)',
              }}
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                ⚡
              </motion.span>
              January 2026 | Dubai, UAE
            </div>
          </motion.div>
        </footer>
      </div>

      {/* ============================================
          SOP ASSISTANT
          ============================================ */}
      <SOPAssistant />

      {/* ============================================
          MODAL
          ============================================ */}
      <AnimatePresence>
        {selectedDept && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 md:p-8 overflow-y-auto"
            style={{
              background: 'rgba(5, 5, 10, 0.95)',
              backdropFilter: 'blur(20px)',
            }}
            onClick={() => setSelectedDept(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="w-full max-w-[1150px] my-8 rounded-[32px] overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, rgba(20, 20, 30, 0.95) 0%, rgba(10, 10, 18, 0.98) 100%)',
                border: '1px solid rgba(216, 109, 203, 0.2)',
                boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.5), 0 0 50px rgba(216, 109, 203, 0.1)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div
                className="flex items-center justify-between p-8 md:p-10 border-b border-white/[0.06]"
                style={{
                  background: 'linear-gradient(135deg, rgba(216, 109, 203, 0.1), rgba(139, 92, 246, 0.05))',
                }}
              >
                <div className="flex items-center gap-5">
                  <motion.div
                    className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center text-[36px]"
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    style={{
                      background: 'linear-gradient(135deg, #D86DCB, #8B5CF6)',
                      boxShadow: '0 15px 50px rgba(216, 109, 203, 0.4)',
                    }}
                  >
                    {selectedDept.icon}
                  </motion.div>
                  <div>
                    <motion.span
                      className="space-grotesk text-xs font-bold tracking-[2px] text-[#D86DCB] block mb-1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {selectedDept.id} DEPARTMENT
                    </motion.span>
                    <motion.h2
                      className="space-grotesk text-2xl md:text-[30px] font-semibold"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      {selectedDept.name}
                    </motion.h2>
                  </div>
                </div>
                <motion.button
                  onClick={() => setSelectedDept(null)}
                  className="w-[56px] h-[56px] rounded-2xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: 'rgba(255, 255, 255, 0.6)',
                  }}
                  whileHover={{
                    rotate: 90,
                    background: 'rgba(216, 109, 203, 0.15)',
                    borderColor: 'rgba(216, 109, 203, 0.3)',
                    color: '#fff',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CloseIcon />
                </motion.button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-10">
                {/* Overview Cards */}
                <motion.div
                  className="grid md:grid-cols-2 gap-5 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div
                    className="p-6 rounded-2xl"
                    style={{
                      background: 'rgba(216, 109, 203, 0.05)',
                      border: '1px solid rgba(216, 109, 203, 0.1)',
                    }}
                  >
                    <h4 className="space-grotesk text-[11px] font-bold tracking-[2px] uppercase text-[#D86DCB] mb-4 flex items-center gap-2">
                      <InfoIcon />
                      Department Overview
                    </h4>
                    <p className="text-sm text-white/65 leading-relaxed">{selectedDept.description}</p>
                  </div>
                  <div
                    className="p-6 rounded-2xl"
                    style={{
                      background: 'rgba(139, 92, 246, 0.05)',
                      border: '1px solid rgba(139, 92, 246, 0.1)',
                    }}
                  >
                    <h4 className="space-grotesk text-[11px] font-bold tracking-[2px] uppercase text-[#8B5CF6] mb-4 flex items-center gap-2">
                      <UsersIcon />
                      Responsible Stakeholders
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedDept.responsible.map((r, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + i * 0.05 }}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px]"
                          style={{
                            background: 'rgba(139, 92, 246, 0.08)',
                            border: '1px solid rgba(139, 92, 246, 0.15)',
                          }}
                        >
                          <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                          {r}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* KPIs */}
                <motion.div
                  className="p-6 rounded-2xl mb-8"
                  style={{
                    background: 'rgba(216, 109, 203, 0.04)',
                    border: '1px solid rgba(216, 109, 203, 0.08)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <h4 className="space-grotesk text-[11px] font-bold tracking-[2px] uppercase text-[#D86DCB] mb-5 flex items-center gap-2">
                    <ChartIcon />
                    Key Performance Indicators
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedDept.kpis.map((kpi, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.08 }}
                        className="p-5 rounded-xl text-center"
                        style={{ background: 'rgba(255, 255, 255, 0.02)' }}
                      >
                        <div className="space-grotesk text-[26px] font-bold text-[#00D26A]">{kpi.value}</div>
                        <div className="text-[10px] text-white/45 uppercase tracking-[1px] mt-2">{kpi.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* SOPs Section */}
                <motion.div
                  className="space-grotesk text-xs font-semibold tracking-[3px] uppercase text-white/40 mb-6 flex items-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Standard Operating Procedures ({selectedDept.sops.length})
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </motion.div>

                <div className="space-y-4">
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
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.55 + index * 0.05 }}
      className="rounded-2xl overflow-hidden transition-all duration-400"
      style={{
        background: expanded ? 'rgba(216, 109, 203, 0.03)' : 'rgba(255, 255, 255, 0.015)',
        border: expanded ? '1px solid rgba(216, 109, 203, 0.25)' : '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: expanded ? '0 20px 60px rgba(216, 109, 203, 0.1)' : 'none',
      }}
    >
      {/* SOP Header */}
      <motion.div
        className="flex items-center gap-4 md:gap-5 p-5 md:p-6 cursor-pointer transition-colors duration-200 group"
        onClick={onToggle}
        whileHover={{ backgroundColor: 'rgba(216, 109, 203, 0.04)' }}
      >
        <motion.div
          className="w-12 h-12 md:w-[50px] md:h-[50px] rounded-xl flex items-center justify-center shrink-0 space-grotesk text-base font-bold"
          style={{
            background: expanded
              ? 'linear-gradient(135deg, #D86DCB, #8B5CF6)'
              : 'linear-gradient(135deg, rgba(216, 109, 203, 0.12), rgba(139, 92, 246, 0.08))',
            border: '1px solid rgba(216, 109, 203, 0.2)',
            color: expanded ? '#fff' : '#D86DCB',
          }}
          whileHover={{ scale: 1.05 }}
        >
          {index + 1}
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="space-grotesk text-[11px] font-semibold tracking-[1.5px] text-white/45 mb-1.5">{sop.id}</div>
          <div className="text-[15px] font-medium truncate text-white/90">{sop.title}</div>
        </div>
        <motion.button
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{
            background: expanded ? 'linear-gradient(135deg, #D86DCB, #8B5CF6)' : 'rgba(255, 255, 255, 0.03)',
            color: expanded ? 'white' : 'rgba(255, 255, 255, 0.45)',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronIcon expanded={expanded} />
        </motion.button>
      </motion.div>

      {/* SOP Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-6 border-t border-white/[0.04]">
              {/* Purpose */}
              <motion.div
                className="my-5 p-5 rounded-r-xl"
                style={{
                  background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.08), transparent)',
                  borderLeft: '3px solid #8B5CF6',
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h5 className="text-[11px] font-bold tracking-[1.5px] uppercase text-[#8B5CF6] mb-3">
                  Purpose & Objective
                </h5>
                <p className="text-sm text-white/65 leading-relaxed">{sop.purpose}</p>
              </motion.div>

              {/* Meta Grid */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 my-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                {[
                  { label: 'Process Owner', value: sop.owner, color: '#D86DCB' },
                  { label: 'Version', value: sop.version, color: '#fff' },
                  { label: 'Target', value: sop.kpis.target, color: '#00D26A' },
                  { label: 'Accuracy', value: sop.kpis.accuracy, color: '#00D26A' },
                  { label: 'SLA', value: sop.kpis.sla, color: '#fff' },
                  { label: 'Status', value: 'Active', color: '#00D26A' }
                ].map((item, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + j * 0.03 }}
                    className="p-4 rounded-xl"
                    style={{ background: 'rgba(255, 255, 255, 0.02)' }}
                  >
                    <div className="text-[10px] font-semibold tracking-[1px] uppercase text-white/40 mb-2">
                      {item.label}
                    </div>
                    <div className="text-sm font-semibold truncate" style={{ color: item.color }}>
                      {item.value}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Process Flow */}
              <motion.div
                className="p-6 rounded-2xl my-5"
                style={{
                  background: 'linear-gradient(135deg, rgba(216, 109, 203, 0.05), rgba(139, 92, 246, 0.03))',
                  border: '1px solid rgba(216, 109, 203, 0.1)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <h5 className="text-[11px] font-bold tracking-[1.5px] uppercase text-[#D86DCB] mb-5 flex items-center gap-2.5">
                  <FlowIcon />
                  Interactive Process Flow
                </h5>
                <div className="flex flex-wrap items-center gap-3">
                  {sop.flow.map((step, j) => (
                    <div key={j} className="contents">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + j * 0.05 }}
                        whileHover={{
                          y: -3,
                          backgroundColor: 'rgba(216, 109, 203, 0.1)',
                          borderColor: 'rgba(216, 109, 203, 0.4)',
                        }}
                        className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-[13px] transition-all duration-200 cursor-default"
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                        }}
                      >
                        <span
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold text-white"
                          style={{ background: 'linear-gradient(135deg, #D86DCB, #8B5CF6)' }}
                        >
                          {j + 1}
                        </span>
                        <span className="text-white/80">{step}</span>
                      </motion.div>
                      {j < sop.flow.length - 1 && (
                        <motion.span
                          className="text-[#D86DCB] text-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.35 + j * 0.05 }}
                        >
                          ➔
                        </motion.span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                className="flex flex-wrap gap-4 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-sm font-semibold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #D86DCB, #B84CB8)',
                    boxShadow: '0 8px 30px rgba(216, 109, 203, 0.35)',
                  }}
                >
                  <FlowIcon />
                  View Full Process Flow
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-sm font-semibold"
                  style={{
                    background: 'rgba(0, 210, 106, 0.08)',
                    border: '1px solid rgba(0, 210, 106, 0.2)',
                    color: '#00D26A',
                  }}
                >
                  <DownloadIcon />
                  Download DOCX
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
