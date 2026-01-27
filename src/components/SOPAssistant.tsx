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
      
      // Check title
      if (sop.title.toLowerCase().includes(q)) relevance += 10;
      keywords.forEach(kw => {
        if (sop.title.toLowerCase().includes(kw)) relevance += 3;
      });
      
      // Check purpose
      if (sop.purpose.toLowerCase().includes(q)) relevance += 5;
      keywords.forEach(kw => {
        if (sop.purpose.toLowerCase().includes(kw)) relevance += 2;
      });
      
      // Check flow steps
      sop.flow.forEach(step => {
        if (step.toLowerCase().includes(q)) relevance += 3;
        keywords.forEach(kw => {
          if (step.toLowerCase().includes(kw)) relevance += 1;
        });
      });
      
      // Check department
      if (dept.name.toLowerCase().includes(q)) relevance += 4;
      if (dept.id.toLowerCase().includes(q)) relevance += 4;
      
      // Check SOP ID
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
  
  // Greeting patterns
  if (q.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
    return {
      content: "Hello! 👋 I'm your ONE Development SOP Assistant. I can help you find information about any of our 80 Standard Operating Procedures across 16 departments.\n\nTry asking me:\n• \"How do we process broker commissions?\"\n• \"What's the SPA execution process?\"\n• \"Who handles RERA complaints?\"\n• \"Show me the lead qualification flow\"",
      sources: []
    };
  }
  
  // Help patterns
  if (q.match(/^(help|what can you do|how do you work)/)) {
    return {
      content: "I'm your intelligent SOP guide! Here's what I can help with:\n\n🔍 **Find SOPs** - Search by topic, department, or process name\n📋 **Process Steps** - Get detailed workflow steps for any procedure\n👥 **Responsibilities** - Find out who's responsible for what\n📊 **KPIs** - Learn about performance targets and SLAs\n🏢 **Departments** - Explore SOPs by department\n\nJust ask me anything about ONE Development's processes!",
      sources: []
    };
  }
  
  // Department listing
  if (q.match(/^(list|show|what).*(department|dept)/)) {
    const deptList = departments.map(d => `• **${d.name}** (${d.id}) - ${d.sops.length} SOPs`).join("\n");
    return {
      content: `Here are all 16 departments at ONE Development:\n\n${deptList}\n\nWhich department would you like to explore?`,
      sources: []
    };
  }
  
  // Specific department query
  for (const dept of departments) {
    if (q.includes(dept.id.toLowerCase()) || q.includes(dept.name.toLowerCase())) {
      const sopList = dept.sops.map(s => `• ${s.id}: ${s.title}`).join("\n");
      return {
        content: `**${dept.icon} ${dept.name}**\n\n${dept.description}\n\n**Process Owner:** ${dept.owner}\n\n**SOPs in this department:**\n${sopList}\n\n**KPIs:**\n${dept.kpis.map(k => `• ${k.label}: ${k.value}`).join("\n")}`,
        sources: [{ dept: dept.name, sop: "Department Overview", relevance: "Direct Match" }]
      };
    }
  }
  
  // SOP-specific query
  if (results.length > 0) {
    const top = results[0];
    const otherResults = results.slice(1, 4);
    
    let response = `**${top.sop.id}: ${top.sop.title}**\n\n`;
    response += `📋 **Purpose:** ${top.sop.purpose}\n\n`;
    response += `👤 **Process Owner:** ${top.sop.owner}\n`;
    response += `🏢 **Department:** ${top.dept.name}\n`;
    response += `📌 **Version:** ${top.sop.version}\n\n`;
    response += `**📊 KPIs:**\n`;
    response += `• Target: ${top.sop.kpis.target}\n`;
    response += `• Accuracy: ${top.sop.kpis.accuracy}\n`;
    response += `• SLA: ${top.sop.kpis.sla}\n\n`;
    response += `**🔄 Process Flow:**\n`;
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
  
  // No results found
  return {
    content: "I couldn't find a specific SOP matching your query. Here are some suggestions:\n\n• Try searching by department name (e.g., \"Sales\", \"Finance\", \"HR\")\n• Search by process type (e.g., \"commission\", \"booking\", \"handover\")\n• Ask about specific topics (e.g., \"RERA compliance\", \"payment collection\")\n\nWould you like me to list all departments?",
    sources: []
  };
}

// Icons
const SendIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const BotIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" />
    <line x1="16" y1="16" x2="16" y2="16" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SparkleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" />
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

export default function SOPAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 Hi! I'm your **ONE Development SOP Assistant**.\n\nI have access to all 80 SOPs across 16 departments. Ask me anything about processes, workflows, responsibilities, or KPIs!\n\n**Try asking:**\n• \"How do we handle broker commissions?\"\n• \"What's the URRF process?\"\n• \"Show me HR SOPs\"",
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

    // Simulate thinking delay
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

  // Format message content with markdown-like styling
  const formatContent = (content: string) => {
    return content
      .split("\n")
      .map((line, i) => {
        // Bold
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
        // Headers
        if (line.startsWith("**") && line.endsWith("**")) {
          return <p key={i} className="font-semibold text-white mb-2" dangerouslySetInnerHTML={{ __html: line }} />;
        }
        // Bullet points
        if (line.startsWith("• ") || line.startsWith("- ")) {
          return <p key={i} className="ml-4 mb-1" dangerouslySetInnerHTML={{ __html: line }} />;
        }
        // Numbered list
        if (line.match(/^\d+\./)) {
          return <p key={i} className="ml-4 mb-1" dangerouslySetInnerHTML={{ __html: line }} />;
        }
        // Divider
        if (line === "---") {
          return <hr key={i} className="border-white/10 my-3" />;
        }
        // Regular line
        return line ? <p key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: line }} /> : <br key={i} />;
      });
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #D86DCB, #8B5CF6)",
              boxShadow: "0 8px 32px rgba(216, 109, 203, 0.4)",
              animation: "pulse-glow 3s ease-in-out infinite"
            }}
          >
            <div className="relative">
              <span className="text-2xl">🤖</span>
              <span 
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                style={{ background: "#00D26A", animation: "pulse-dot 2s ease-in-out infinite" }}
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "auto" : "600px"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[420px] max-w-[calc(100vw-48px)] rounded-[24px] overflow-hidden flex flex-col"
            style={{
              background: "linear-gradient(180deg, rgba(20, 20, 30, 0.98) 0%, rgba(10, 10, 15, 0.98) 100%)",
              border: "1px solid rgba(216, 109, 203, 0.3)",
              boxShadow: "0 25px 80px rgba(0, 0, 0, 0.5), 0 0 40px rgba(216, 109, 203, 0.2)",
              backdropFilter: "blur(20px)"
            }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between p-4 border-b border-white/10"
              style={{ background: "linear-gradient(135deg, rgba(216, 109, 203, 0.15), rgba(139, 92, 246, 0.1))" }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #D86DCB, #8B5CF6)" }}
                >
                  <span className="text-lg">🤖</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">SOP Assistant</h3>
                  <p className="text-xs text-white/50">Powered by ONE Development</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <MinimizeIcon />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div 
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          message.role === "user" 
                            ? "bg-[#8B5CF6]" 
                            : "bg-gradient-to-br from-[#D86DCB] to-[#8B5CF6]"
                        }`}
                      >
                        {message.role === "user" ? <UserIcon /> : <span className="text-sm">🤖</span>}
                      </div>
                      <div 
                        className={`flex-1 rounded-2xl p-4 ${
                          message.role === "user"
                            ? "bg-[#8B5CF6] text-white rounded-tr-sm"
                            : "bg-white/5 text-white/80 rounded-tl-sm"
                        }`}
                        style={{
                          maxWidth: "85%",
                          border: message.role === "assistant" ? "1px solid rgba(255,255,255,0.05)" : "none"
                        }}
                      >
                        <div className="text-sm leading-relaxed">
                          {formatContent(message.content)}
                        </div>
                        {message.sources && message.sources.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <p className="text-[10px] uppercase tracking-wider text-white/40 mb-2">Sources</p>
                            <div className="flex flex-wrap gap-1.5">
                              {message.sources.map((source, i) => (
                                <span 
                                  key={i}
                                  className="text-[10px] px-2 py-1 rounded-full"
                                  style={{ 
                                    background: "rgba(216, 109, 203, 0.15)",
                                    color: "#D86DCB"
                                  }}
                                >
                                  {source.sop}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#D86DCB] to-[#8B5CF6]">
                        <span className="text-sm">🤖</span>
                      </div>
                      <div className="bg-white/5 rounded-2xl rounded-tl-sm p-4 border border-white/5">
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#D86DCB] animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 rounded-full bg-[#D86DCB] animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-2 h-2 rounded-full bg-[#D86DCB] animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10">
                  <div 
                    className="flex items-center gap-3 p-2 rounded-xl"
                    style={{ 
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)"
                    }}
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about any SOP..."
                      className="flex-1 bg-transparent text-white text-sm placeholder:text-white/40 focus:outline-none px-2"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isTyping}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: input.trim() ? "linear-gradient(135deg, #D86DCB, #8B5CF6)" : "rgba(255,255,255,0.1)"
                      }}
                    >
                      <SendIcon />
                    </button>
                  </div>
                  <p className="text-[10px] text-white/30 text-center mt-2">
                    Press Enter to send • 80 SOPs • 16 Departments
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
