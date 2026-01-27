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
  X,
  ArrowRight,
  Zap,
  Shield,
  Target,
  Users,
  CheckCircle2,
  BookOpen,
  Workflow,
  Clock,
  AlertCircle,
  ChevronDown,
  ExternalLink
} from "lucide-react";
import { departments, stats, searchSOPs, type Department, type SOPProcess } from "@/lib/sop-data";
import { cn } from "@/lib/utils";

// Sample SOP content structure (would be parsed from DOCX in production)
const getSampleSOPContent = (process: SOPProcess) => ({
  objective: `To establish a standardized procedure for ${process.name.toLowerCase()} ensuring consistency, compliance, and efficiency across ONE Development.`,
  scope: "This procedure applies to all relevant departments and personnel involved in the process.",
  definitions: [
    { term: "SOP", definition: "Standard Operating Procedure - documented process to achieve quality output" },
    { term: "RACI", definition: "Responsible, Accountable, Consulted, Informed - responsibility matrix" },
    { term: "KPI", definition: "Key Performance Indicator - measurable value for success" },
  ],
  responsibilities: [
    { role: "Process Owner", tasks: ["Owns the end-to-end process", "Ensures compliance", "Reviews and updates SOP"] },
    { role: "Department Head", tasks: ["Approves process changes", "Allocates resources", "Monitors KPIs"] },
    { role: "Team Members", tasks: ["Execute process steps", "Report issues", "Suggest improvements"] },
  ],
  steps: [
    { step: 1, title: "Initiation", description: "Request is received and logged in the system", duration: "1 day" },
    { step: 2, title: "Review", description: "Initial review and validation of requirements", duration: "2 days" },
    { step: 3, title: "Processing", description: "Core process execution with quality checks", duration: "3-5 days" },
    { step: 4, title: "Approval", description: "Management review and approval", duration: "1-2 days" },
    { step: 5, title: "Completion", description: "Final documentation and closure", duration: "1 day" },
  ],
  kpis: [
    { metric: "Processing Time", target: "< 10 days", current: "8 days" },
    { metric: "Accuracy Rate", target: "> 98%", current: "99.2%" },
    { metric: "Customer Satisfaction", target: "> 90%", current: "94%" },
  ],
});

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [selectedProcess, setSelectedProcess] = useState<(SOPProcess & { department: Department }) | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "process" | "roles" | "kpis">("overview");

  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return searchSOPs(searchQuery);
  }, [searchQuery]);

  const sopContent = selectedProcess ? getSampleSOPContent(selectedProcess) : null;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[180px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <header className="px-6 py-16 md:py-24">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 mb-6"
            >
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span className="text-sm font-medium text-pink-300">ONE Development</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent"
            >
              SOP Command Center
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
            >
              Interactive access to all Standard Operating Procedures.
              <span className="text-pink-400 font-medium"> {stats.totalDepartments} Departments • {stats.totalProcesses} Processes</span>
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative max-w-xl mx-auto mb-12"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search any SOP..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-lg focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all"
              />
              
              {/* Search Results */}
              <AnimatePresence>
                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-[#15151f] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    {searchResults.slice(0, 6).map((result, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedProcess(result);
                          setSearchQuery("");
                        }}
                        className="w-full flex items-center gap-3 p-4 hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-0"
                      >
                        <span className="text-2xl">{result.department.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{result.name}</p>
                          <p className="text-sm text-gray-500">{result.department.name}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 md:gap-8"
            >
              {[
                { icon: Building2, value: stats.totalDepartments, label: "Departments", color: "pink" },
                { icon: FileText, value: stats.totalProcesses, label: "Processes", color: "purple" },
                { icon: Zap, value: "Live", label: "Status", color: "cyan" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10">
                  <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                  <div>
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </header>

        {/* Departments Grid */}
        <section className="px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Select a <span className="text-pink-500">Department</span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {departments.map((dept, i) => (
                <motion.button
                  key={dept.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedDept(dept)}
                  className="group relative p-5 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 text-center transition-all overflow-hidden"
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 50% 100%, ${dept.color}20, transparent 70%)` }}
                  />
                  <div className="relative z-10">
                    <div className="text-4xl mb-3">{dept.icon}</div>
                    <h3 className="font-semibold mb-1 group-hover:text-pink-400 transition-colors">{dept.name}</h3>
                    <p className="text-xs text-gray-500">{dept.processes.length} SOPs</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-gray-500">
            <span>© 2026 ONE Development</span>
            <span>SOP Hub v1.0</span>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedDept(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#12121a] border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 flex items-center gap-4">
                <span className="text-4xl">{selectedDept.icon}</span>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{selectedDept.name}</h2>
                  <p className="text-sm text-gray-400">{selectedDept.processes.length} Standard Operating Procedures</p>
                </div>
                <button onClick={() => setSelectedDept(null)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-4 max-h-[60vh] overflow-y-auto space-y-2">
                {selectedDept.processes.map((proc, i) => (
                  <motion.button
                    key={proc.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => {
                      setSelectedProcess({ ...proc, department: selectedDept });
                      setSelectedDept(null);
                      setActiveTab("overview");
                    }}
                    className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-pink-500/30 transition-all text-left group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-pink-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate group-hover:text-pink-400 transition-colors">{proc.name}</p>
                      <p className="text-xs text-gray-500">{proc.code}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SOP Detail Modal - INTERACTIVE */}
      <AnimatePresence>
        {selectedProcess && sopContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md overflow-y-auto"
          >
            <div className="min-h-screen p-4 md:p-8">
              <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="flex items-start justify-between mb-8"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{selectedProcess.department.icon}</span>
                      <span className="px-3 py-1 rounded-full text-sm bg-pink-500/20 text-pink-400">
                        {selectedProcess.department.name}
                      </span>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold mb-2">{selectedProcess.name}</h1>
                    <p className="text-gray-400">{selectedProcess.code}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProcess(null)}
                    className="p-3 hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </motion.div>

                {/* Tabs */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex gap-2 mb-8 overflow-x-auto pb-2"
                >
                  {[
                    { id: "overview", label: "Overview", icon: BookOpen },
                    { id: "process", label: "Process Flow", icon: Workflow },
                    { id: "roles", label: "Roles & Responsibilities", icon: Users },
                    { id: "kpis", label: "KPIs", icon: Target },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap",
                        activeTab === tab.id
                          ? "bg-pink-500 text-white"
                          : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </motion.div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  {activeTab === "overview" && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      {/* Objective */}
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20">
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Target className="w-5 h-5 text-pink-400" />
                          Objective
                        </h3>
                        <p className="text-gray-300 leading-relaxed">{sopContent.objective}</p>
                      </div>

                      {/* Scope */}
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Shield className="w-5 h-5 text-cyan-400" />
                          Scope
                        </h3>
                        <p className="text-gray-300">{sopContent.scope}</p>
                      </div>

                      {/* Key Definitions */}
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-purple-400" />
                          Key Definitions
                        </h3>
                        <div className="grid gap-3">
                          {sopContent.definitions.map((def, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5">
                              <span className="font-mono text-pink-400 font-semibold">{def.term}</span>
                              <span className="text-gray-400">{def.definition}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Download Button */}
                      <button className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 font-semibold hover:opacity-90 transition-opacity">
                        <Download className="w-5 h-5" />
                        Download Full SOP Document
                      </button>
                    </motion.div>
                  )}

                  {activeTab === "process" && (
                    <motion.div
                      key="process"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-xl font-semibold mb-6">Process Steps</h3>
                      {sopContent.steps.map((step, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="relative flex gap-4"
                        >
                          {/* Timeline line */}
                          {i < sopContent.steps.length - 1 && (
                            <div className="absolute left-6 top-14 w-0.5 h-full bg-gradient-to-b from-pink-500 to-purple-500" />
                          )}
                          
                          {/* Step number */}
                          <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center font-bold text-lg shrink-0">
                            {step.step}
                          </div>
                          
                          {/* Step content */}
                          <div className="flex-1 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/30 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="text-lg font-semibold">{step.title}</h4>
                              <span className="flex items-center gap-1 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                {step.duration}
                              </span>
                            </div>
                            <p className="text-gray-400">{step.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === "roles" && (
                    <motion.div
                      key="roles"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="grid md:grid-cols-3 gap-4"
                    >
                      {sopContent.responsibilities.map((resp, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/30 transition-colors"
                        >
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                            <Users className="w-6 h-6 text-pink-400" />
                          </div>
                          <h4 className="text-lg font-semibold mb-4">{resp.role}</h4>
                          <ul className="space-y-2">
                            {resp.tasks.map((task, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                                {task}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === "kpis" && (
                    <motion.div
                      key="kpis"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="grid md:grid-cols-3 gap-4"
                    >
                      {sopContent.kpis.map((kpi, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10"
                        >
                          <p className="text-sm text-gray-500 mb-2">{kpi.metric}</p>
                          <p className="text-3xl font-bold text-green-400 mb-1">{kpi.current}</p>
                          <p className="text-sm text-gray-500">Target: {kpi.target}</p>
                          <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-green-500 to-emerald-400" />
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
