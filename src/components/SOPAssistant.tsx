"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { departments, type Department, type SOP } from "@/lib/data";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: { dept: string; sop: string; relevance: string }[];
}

// Smart search through SOPs
function searchSOPs(query: string): { dept: Department; sop: SOP; relevance: number }[] {
  const q = query.toLowerCase();
  const results: { dept: Department; sop: SOP; relevance: number }[] = [];

  const keywords = q.split(/\s+/).filter(w => w.length > 2);

  for (const dept of departments) {
    for (const sop of dept.sops) {
      let relevance = 0;

      if (sop.title.toLowerCase().includes(q)) relevance += 10;
      keywords.forEach(kw => {
        if (sop.title.toLowerCase().includes(kw)) relevance += 3;
      });

      if (sop.purpose.toLowerCase().includes(q)) relevance += 5;
      keywords.forEach(kw => {
        if (sop.purpose.toLowerCase().includes(kw)) relevance += 2;
      });

      sop.flow.forEach(step => {
        if (step.toLowerCase().includes(q)) relevance += 3;
        keywords.forEach(kw => {
          if (step.toLowerCase().includes(kw)) relevance += 1;
        });
      });

      if (dept.name.toLowerCase().includes(q)) relevance += 4;
      if (dept.id.toLowerCase().includes(q)) relevance += 4;
      if (sop.id.toLowerCase().includes(q)) relevance += 8;

      if (relevance > 0) {
        results.push({ dept, sop, relevance });
      }
    }
  }

  return results.sort((a, b) => b.relevance - a.relevance).slice(0, 5);
}

// Generate intelligent response
function generateResponse(query: string): { content: string; sources: Message["sources"] } {
  const q = query.toLowerCase();
  const results = searchSOPs(query);

  if (q.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
    return {
      content: "Hello! I'm your **ONE Development SOP Assistant**.\n\nI have access to all 80 SOPs across 16 departments. Ask me anything about processes, workflows, responsibilities, or KPIs!\n\n**Try asking:**\n• \"How do we process broker commissions?\"\n• \"What's the URRF process?\"\n• \"Show me HR SOPs\"",
      sources: []
    };
  }

  if (q.match(/^(help|what can you do|how do you work)/)) {
    return {
      content: "I'm your intelligent SOP guide! Here's what I can help with:\n\n**Find SOPs** - Search by topic, department, or process name\n**Process Steps** - Get detailed workflow steps for any procedure\n**Responsibilities** - Find out who's responsible for what\n**KPIs** - Learn about performance targets and SLAs\n**Departments** - Explore SOPs by department\n\nJust ask me anything about ONE Development's processes!",
      sources: []
    };
  }

  if (q.match(/^(list|show|what).*(department|dept)/)) {
    const deptList = departments.map(d => `• **${d.name}** (${d.id}) - ${d.sops.length} SOPs`).join("\n");
    return {
      content: `Here are all 16 departments at ONE Development:\n\n${deptList}\n\nWhich department would you like to explore?`,
      sources: []
    };
  }

  for (const dept of departments) {
    if (q.includes(dept.id.toLowerCase()) || q.includes(dept.name.toLowerCase())) {
      const sopList = dept.sops.map(s => `• ${s.id}: ${s.title}`).join("\n");
      return {
        content: `**${dept.icon} ${dept.name}**\n\n${dept.description}\n\n**Process Owner:** ${dept.owner}\n\n**SOPs in this department:**\n${sopList}\n\n**KPIs:**\n${dept.kpis.map(k => `• ${k.label}: ${k.value}`).join("\n")}`,
        sources: [{ dept: dept.name, sop: "Department Overview", relevance: "Direct Match" }]
      };
    }
  }

  if (results.length > 0) {
    const top = results[0];
    const otherResults = results.slice(1, 4);

    let response = `**${top.sop.id}: ${top.sop.title}**\n\n`;
    response += `**Purpose:** ${top.sop.purpose}\n\n`;
    response += `**Process Owner:** ${top.sop.owner}\n`;
    response += `**Department:** ${top.dept.name}\n`;
    response += `**Version:** ${top.sop.version}\n\n`;
    response += `**KPIs:**\n`;
    response += `• Target: ${top.sop.kpis.target}\n`;
    response += `• Accuracy: ${top.sop.kpis.accuracy}\n`;
    response += `• SLA: ${top.sop.kpis.sla}\n\n`;
    response += `**Process Flow:**\n`;
    response += top.sop.flow.map((step, i) => `${i + 1}. ${step}`).join("\n");

    if (otherResults.length > 0) {
      response += `\n\n---\n**Related SOPs:**\n`;
      response += otherResults.map(r => `• ${r.sop.id}: ${r.sop.title}`).join("\n");
    }

    return {
      content: response,
      sources: results.map(r => ({
        dept: r.dept.name,
        sop: r.sop.id,
        relevance: r.relevance > 8 ? "High" : r.relevance > 4 ? "Medium" : "Low"
      }))
    };
  }

  return {
    content: "I couldn't find a specific SOP matching your query. Here are some suggestions:\n\n• Try searching by department name (e.g., \"Sales\", \"Finance\", \"HR\")\n• Search by process type (e.g., \"commission\", \"booking\", \"handover\")\n• Ask about specific topics (e.g., \"RERA compliance\", \"payment collection\")\n\nWould you like me to list all departments?",
    sources: []
  };
}

// Icons
const SendIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 2L11 13" />
    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
  </svg>
);

const BotIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <circle cx="8" cy="16" r="1" fill="currentColor" />
    <circle cx="16" cy="16" r="1" fill="currentColor" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const MinimizeIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const SparkleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
  </svg>
);

export default function SOPAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your **ONE Development SOP Assistant**.\n\nI have access to all 80 SOPs across 16 departments. Ask me anything about processes, workflows, responsibilities, or KPIs!\n\n**Try asking:**\n• \"How do we handle broker commissions?\"\n• \"What's the URRF process?\"\n• \"Show me HR SOPs\"",
      timestamp: new Date(),
      sources: []
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    const { content, sources } = generateResponse(input.trim());

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content,
      timestamp: new Date(),
      sources
    };

    setIsTyping(false);
    setMessages(prev => [...prev, assistantMessage]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatContent = (content: string) => {
    return content
      .split("\n")
      .map((line, i) => {
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
        if (line.startsWith("**") && line.endsWith("**")) {
          return <p key={i} className="font-semibold text-white mb-2" dangerouslySetInnerHTML={{ __html: line }} />;
        }
        if (line.startsWith("• ") || line.startsWith("- ")) {
          return <p key={i} className="ml-4 mb-1" dangerouslySetInnerHTML={{ __html: line }} />;
        }
        if (line.match(/^\d+\./)) {
          return <p key={i} className="ml-4 mb-1" dangerouslySetInnerHTML={{ __html: line }} />;
        }
        if (line === "---") {
          return <hr key={i} className="border-white/10 my-3" />;
        }
        return line ? <p key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: line }} /> : <br key={i} />;
      });
  };

  return (
    <>
      {/* Floating Button with Orbit Effect */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            {/* Orbit Ring - Hidden on mobile for performance */}
            <motion.div
              className="absolute inset-[-8px] rounded-full pointer-events-none hidden sm:block"
              style={{
                border: '1px dashed rgba(216, 109, 203, 0.3)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            {/* Orbiting Dot - Hidden on mobile for performance */}
            <motion.div
              className="absolute w-2 h-2 rounded-full pointer-events-none hidden sm:block"
              style={{
                background: '#D86DCB',
                boxShadow: '0 0 10px #D86DCB',
                top: '50%',
                left: '50%',
              }}
              animate={{
                x: [0, 35, 0, -35, 0],
                y: [-35, 0, 35, 0, -35],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white touch-manipulation"
              style={{
                background: "linear-gradient(135deg, #D86DCB, #8B5CF6)",
                boxShadow: "0 8px 40px rgba(216, 109, 203, 0.5), 0 0 0 1px rgba(216, 109, 203, 0.3)",
              }}
            >
              {/* Pulse ring */}
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ border: '2px solid rgba(216, 109, 203, 0.5)' }}
                animate={{
                  scale: [1, 1.5],
                  opacity: [0.5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <span className="text-xl sm:text-2xl relative z-10">🤖</span>

              {/* Online indicator */}
              <motion.span
                className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center"
                style={{
                  background: '#00D26A',
                  border: '2px solid #0a0a0f',
                  boxShadow: '0 0 10px rgba(0, 210, 106, 0.5)',
                }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : undefined
            }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 w-full sm:w-[440px] sm:max-w-[calc(100vw-48px)] rounded-t-[28px] sm:rounded-[28px] overflow-hidden flex flex-col"
            style={{
              background: "linear-gradient(180deg, rgba(15, 15, 25, 0.98) 0%, rgba(8, 8, 15, 0.99) 100%)",
              border: "1px solid rgba(216, 109, 203, 0.25)",
              boxShadow: "0 -10px 40px rgba(0, 0, 0, 0.4), 0 30px 100px rgba(0, 0, 0, 0.6), 0 0 50px rgba(216, 109, 203, 0.15)",
              backdropFilter: "blur(20px)",
              height: isMinimized ? "auto" : "min(650px, calc(100vh - 80px))",
              maxHeight: isMinimized ? "auto" : "calc(100vh - env(safe-area-inset-top) - 20px)",
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
          >
            {/* Drag Handle for mobile */}
            <div className="sm:hidden flex justify-center py-2 shrink-0">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div
              className="flex items-center justify-between p-4 sm:p-5 border-b border-white/[0.06] shrink-0"
              style={{
                background: "linear-gradient(135deg, rgba(216, 109, 203, 0.12), rgba(139, 92, 246, 0.08))",
              }}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <motion.div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center relative shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #D86DCB, #8B5CF6)",
                    boxShadow: '0 8px 24px rgba(216, 109, 203, 0.3)',
                  }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-lg sm:text-xl">🤖</span>
                </motion.div>
                <div>
                  <h3 className="font-semibold text-white text-sm sm:text-[15px] flex items-center gap-2">
                    SOP Assistant
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <SparkleIcon />
                    </motion.span>
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5 sm:mt-1">
                    <motion.span
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                      style={{ background: '#00D26A' }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-[10px] sm:text-[11px] text-white/50 tracking-wide">
                      ONE Development • 80 SOPs
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <motion.button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center text-white/50 transition-all duration-200 touch-manipulation"
                  style={{ background: 'rgba(255, 255, 255, 0.03)' }}
                  whileHover={{ background: 'rgba(255, 255, 255, 0.08)', color: '#fff' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MinimizeIcon />
                </motion.button>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center text-white/50 transition-all duration-200 touch-manipulation"
                  style={{ background: 'rgba(255, 255, 255, 0.03)' }}
                  whileHover={{ background: 'rgba(216, 109, 203, 0.15)', color: '#D86DCB' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CloseIcon />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4 sm:space-y-5 scroll-container">
                  {messages.map((message, i) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`flex gap-2 sm:gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <motion.div
                        className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 ${
                          message.role === "user"
                            ? "bg-[#8B5CF6]"
                            : ""
                        }`}
                        style={message.role === "assistant" ? {
                          background: 'linear-gradient(135deg, #D86DCB, #8B5CF6)',
                        } : {}}
                        whileHover={{ scale: 1.05 }}
                      >
                        {message.role === "user" ? <UserIcon /> : <span className="text-sm sm:text-base">🤖</span>}
                      </motion.div>
                      <div
                        className={`flex-1 rounded-xl sm:rounded-2xl p-3 sm:p-4 ${
                          message.role === "user"
                            ? "rounded-tr-md"
                            : "rounded-tl-md"
                        }`}
                        style={{
                          maxWidth: "85%",
                          background: message.role === "user"
                            ? "linear-gradient(135deg, #8B5CF6, #7C3AED)"
                            : "rgba(255, 255, 255, 0.04)",
                          border: message.role === "assistant" ? "1px solid rgba(255,255,255,0.06)" : "none",
                          boxShadow: message.role === "user"
                            ? "0 4px 20px rgba(139, 92, 246, 0.3)"
                            : "none",
                        }}
                      >
                        <div className="text-xs sm:text-[13px] leading-relaxed text-white/85">
                          {formatContent(message.content)}
                        </div>
                        {message.sources && message.sources.length > 0 && (
                          <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/[0.06]">
                            <p className="text-[9px] sm:text-[10px] uppercase tracking-[1.5px] text-white/35 mb-2 font-medium">Sources</p>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {message.sources.map((source, j) => (
                                <motion.span
                                  key={j}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: j * 0.05 }}
                                  className="text-[9px] sm:text-[10px] px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md sm:rounded-lg font-medium"
                                  style={{
                                    background: "rgba(216, 109, 203, 0.1)",
                                    border: "1px solid rgba(216, 109, 203, 0.15)",
                                    color: "#D86DCB"
                                  }}
                                >
                                  {source.sop}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex gap-2 sm:gap-3"
                      >
                        <div
                          className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center"
                          style={{ background: 'linear-gradient(135deg, #D86DCB, #8B5CF6)' }}
                        >
                          <span className="text-sm sm:text-base">🤖</span>
                        </div>
                        <div
                          className="rounded-xl sm:rounded-2xl rounded-tl-md p-3 sm:p-4"
                          style={{
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                          }}
                        >
                          <div className="flex gap-1.5 sm:gap-2 items-center">
                            {[0, 1, 2].map((i) => (
                              <motion.span
                                key={i}
                                className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                                style={{ background: '#D86DCB' }}
                                animate={{
                                  y: [0, -6, 0],
                                  opacity: [0.4, 1, 0.4],
                                }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  delay: i * 0.15,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 sm:p-4 border-t border-white/[0.06] shrink-0">
                  <div
                    className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl transition-all duration-300"
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.08)"
                    }}
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      inputMode="text"
                      autoComplete="off"
                      autoCorrect="off"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about any SOP..."
                      className="flex-1 bg-transparent text-white text-sm sm:text-[14px] placeholder:text-white/35 focus:outline-none px-2 sm:px-3"
                    />
                    <motion.button
                      onClick={handleSend}
                      disabled={!input.trim() || isTyping}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed touch-manipulation shrink-0"
                      style={{
                        background: input.trim()
                          ? "linear-gradient(135deg, #D86DCB, #8B5CF6)"
                          : "rgba(255,255,255,0.06)",
                        boxShadow: input.trim()
                          ? "0 4px 20px rgba(216, 109, 203, 0.3)"
                          : "none",
                      }}
                      whileHover={input.trim() ? { scale: 1.05 } : {}}
                      whileTap={input.trim() ? { scale: 0.95 } : {}}
                    >
                      <SendIcon />
                    </motion.button>
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-white/25 text-center mt-2 sm:mt-3 tracking-wide">
                    <span className="hidden sm:inline">Press Enter to send • </span>80 SOPs • 16 Departments
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
