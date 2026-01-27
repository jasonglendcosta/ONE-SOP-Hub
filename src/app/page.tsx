"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  FileText, 
  Building2, 
  ChevronRight, 
  Sparkles,
  Download,
  ExternalLink,
  X,
  ArrowRight,
  Zap,
  Shield,
  Target
} from "lucide-react";
import { departments, stats, searchSOPs, type Department, type SOPProcess } from "@/lib/sop-data";
import { cn } from "@/lib/utils";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [selectedProcess, setSelectedProcess] = useState<(SOPProcess & { department: Department }) | null>(null);

  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return searchSOPs(searchQuery);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-grid opacity-50" />
      <div className="fixed inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-purple-500/5" />
      
      {/* Floating Orbs */}
      <div className="fixed top-20 left-20 w-72 h-72 bg-pink-500/20 rounded-full blur-[100px] animate-pulse" />
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px]" />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <header className="relative min-h-[60vh] flex flex-col items-center justify-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Logo/Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 mb-8"
            >
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span className="text-sm font-medium text-pink-300">ONE Development</span>
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">SOP Hub</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Your central command center for all Standard Operating Procedures.
              <span className="text-pink-400"> 14 Departments. 50+ Processes. One Source of Truth.</span>
            </p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-8 mb-12"
            >
              {[
                { label: "Departments", value: stats.totalDepartments, icon: Building2 },
                { label: "Processes", value: stats.totalProcesses, icon: FileText },
                { label: "Last Updated", value: "Jan 2026", icon: Zap },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10">
                  <stat.icon className="w-5 h-5 text-pink-400" />
                  <div className="text-left">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search SOPs, departments, or processes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-lg placeholder:text-gray-600 focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-[#12121a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="max-h-96 overflow-y-auto">
                      {searchResults.map((result, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setSelectedProcess(result);
                            setSearchQuery("");
                          }}
                          className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors text-left"
                        >
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                            style={{ backgroundColor: `${result.department.color}20` }}
                          >
                            {result.department.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{result.name}</p>
                            <p className="text-sm text-gray-500">{result.department.name} • {result.code}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-500" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </header>

        {/* Departments Grid */}
        <section className="px-6 py-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore by <span className="gradient-text">Department</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Click on any department to view its processes and SOPs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {departments.map((dept, i) => (
              <motion.button
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedDept(dept)}
                className="group relative p-6 rounded-2xl bg-[#12121a] border border-white/5 hover:border-white/20 text-left transition-all overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ 
                    background: `radial-gradient(circle at 50% 50%, ${dept.color}15, transparent 70%)` 
                  }}
                />
                
                <div className="relative z-10">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${dept.color}20` }}
                  >
                    {dept.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-pink-400 transition-colors">
                    {dept.name}
                  </h3>
                  
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {dept.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-3 py-1 rounded-full bg-white/5" style={{ color: dept.color }}>
                      {dept.processes.length} Processes
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Target, title: "Standardized", desc: "Consistent processes across all departments" },
                { icon: Shield, title: "Compliant", desc: "Aligned with regulatory requirements" },
                { icon: Zap, title: "Efficient", desc: "Streamlined workflows for maximum productivity" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-8 rounded-2xl bg-white/5 border border-white/5"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-pink-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-500">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-400" />
              <span className="font-semibold">ONE Development</span>
              <span className="text-gray-500">• SOP Hub</span>
            </div>
            <p className="text-sm text-gray-500">
              © 2026 ONE Development. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      {/* Department Modal */}
      <AnimatePresence>
        {selectedDept && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedDept(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-[#12121a] border border-white/10 rounded-3xl"
            >
              {/* Header */}
              <div 
                className="sticky top-0 p-6 border-b border-white/10 flex items-center gap-4"
                style={{ background: `linear-gradient(135deg, ${selectedDept.color}10, transparent)` }}
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ backgroundColor: `${selectedDept.color}20` }}
                >
                  {selectedDept.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{selectedDept.name}</h2>
                  <p className="text-gray-400">{selectedDept.processes.length} Processes</p>
                </div>
                <button
                  onClick={() => setSelectedDept(null)}
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Processes List */}
              <div className="p-6 space-y-3">
                {selectedDept.processes.map((process, i) => (
                  <motion.button
                    key={process.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => {
                      setSelectedProcess({ ...process, department: selectedDept });
                      setSelectedDept(null);
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium group-hover:text-pink-400 transition-colors">
                        {process.name}
                      </p>
                      <p className="text-sm text-gray-500">{process.code}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Process Detail Modal */}
      <AnimatePresence>
        {selectedProcess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProcess(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#12121a] border border-white/10 rounded-3xl overflow-hidden"
            >
              {/* Header */}
              <div 
                className="p-6 border-b border-white/10"
                style={{ background: `linear-gradient(135deg, ${selectedProcess.department.color}15, transparent)` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span 
                    className="px-3 py-1 rounded-full text-sm"
                    style={{ 
                      backgroundColor: `${selectedProcess.department.color}20`,
                      color: selectedProcess.department.color 
                    }}
                  >
                    {selectedProcess.department.name}
                  </span>
                  <button
                    onClick={() => setSelectedProcess(null)}
                    className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <h2 className="text-2xl font-bold mb-2">{selectedProcess.name}</h2>
                <p className="text-gray-400">{selectedProcess.code}</p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-sm text-gray-400 mb-1">File Name</p>
                  <p className="font-mono text-sm">{selectedProcess.fileName}</p>
                </div>
                
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-sm text-gray-400 mb-1">Location</p>
                  <p className="font-mono text-sm text-gray-300">{selectedProcess.filePath}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 font-medium hover:opacity-90 transition-opacity">
                    <Download className="w-4 h-4" />
                    Download SOP
                  </button>
                  <button className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
