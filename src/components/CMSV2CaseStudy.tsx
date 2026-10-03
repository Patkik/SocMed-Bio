import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Search,
  Share2,
  Clock,
  FileCheck2,
  Network,
  Cpu,
  Layers,
  Workflow,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface CMSV2CaseStudyProps {
  onClose?: () => void;
}

export const CMSV2CaseStudy: React.FC<CMSV2CaseStudyProps> = ({ onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const projectRepoUrl = "https://github.com/Patkik/Capstone-management-system";

  return (
    <div className="min-h-screen bg-[#0A0E17] text-zinc-100 font-sans antialiased selection:bg-indigo-500/30 selection:text-white relative overflow-x-hidden">
      {/* Subtle background grid pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#0A0E17]/95 border-b border-zinc-800 backdrop-blur-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onClose && (
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 transition-colors"
                aria-label="Return to portfolio"
              >
                <ArrowLeft size={14} />
                <span>Return to Portfolio</span>
              </button>
            )}
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400">Case Studies</span>
              <span className="text-zinc-600">/</span>
              <span className="text-indigo-400 font-medium">BukSU CMS-V2</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 transition-colors"
            >
              <Share2 size={13} />
              <span>{copiedLink ? 'Copied URL' : 'Share'}</span>
            </button>
            <a
              href={projectRepoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-3.5 py-1.5 rounded-lg transition-colors shadow-sm"
            >
              <span>GitHub Repo</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-20 md:space-y-28">

        {/* 1. Hero & Overview Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Eyebrow badge */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Institutional Flagship Project
            </span>
            <span className="text-xs font-mono text-zinc-400">
              Academic Year 2024–2025 • Bukidnon State University
            </span>
          </div>

          {/* Headline & Description */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              BukSU Capstone Management & Archiving System
            </h1>
            <p className="text-base sm:text-xl text-zinc-300 leading-relaxed max-w-3xl">
              A comprehensive academic platform replacing paper clearance slips, untracked PDF revisions, and buried undergraduate manuscripts with automated defense workflows and semantic manuscript discovery.
            </p>
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-xl bg-zinc-900/70 border border-zinc-800">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-zinc-400 block font-medium">Role</span>
              <p className="text-sm font-semibold text-white">Lead Full-Stack Architect</p>
              <p className="text-xs text-zinc-400">Database Schema & System Design</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-zinc-400 block font-medium">Core Stack</span>
              <p className="text-sm font-semibold text-emerald-400">React, Express, MongoDB</p>
              <p className="text-xs text-zinc-400">PaddleOCR, BGE-M3, ChromaDB</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-zinc-400 block font-medium">Deployment</span>
              <p className="text-sm font-semibold text-white">BukSU IT Department</p>
              <p className="text-xs text-zinc-400">Faculty Mentors & Student Panels</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-zinc-400 block font-medium">Clearance Flow</span>
              <p className="text-sm font-semibold text-indigo-400">4-Phase Multi-Tier Process</p>
              <p className="text-xs text-zinc-400">Proposal to Dean Sign-Off</p>
            </div>
          </div>
        </motion.section>

        {/* 2. The Problem: Administrative Challenges */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="border-l-2 border-amber-500 pl-4 space-y-1">
            <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
              The Administrative Challenge
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Overcoming Friction in Institutional Capstone Governance
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4 text-zinc-300 leading-relaxed text-sm sm:text-base">
              <p>
                Prior to CMS-V2, capstone coordination across multiple IT class sections relied on paper clearance slips and informal messaging groups. Faculty members spent weeks collecting physical signatures across departments, often misplacing student revision histories or reviewing outdated manuscript drafts.
              </p>
              <p>
                Furthermore, more than a decade of completed bachelor theses remained buried in offline hard drives. Without central full-text search, student batches frequently proposed duplicate ideas, while faculty mentors lacked an efficient method to verify whether a proposed system had already been implemented in previous years.
              </p>
            </div>

            {/* Friction Metrics Comparison */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3.5">
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1">
                  <span>Clearance Turnaround</span>
                  <Clock size={15} className="text-amber-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-semibold text-zinc-500 line-through">7+ Days</span>
                  <span className="text-xl font-bold text-emerald-400">Under 24 Hours</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">Automated multi-stage approval notifications and digital sign-offs</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1">
                  <span>Manuscript Discoverability</span>
                  <Search size={15} className="text-indigo-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-semibold text-zinc-500 line-through">Offline PDFs</span>
                  <span className="text-xl font-bold text-indigo-400">100% Searchable</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">Full-text OCR parsing and semantic vector search in ChromaDB</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1">
                  <span>Review Accountability</span>
                  <FileCheck2 size={15} className="text-emerald-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-semibold text-zinc-500 line-through">Loose Paper Sheets</span>
                  <span className="text-xl font-bold text-white">Digital Audit Trail</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">Time-stamped rubric evaluations with panelist consensus tracking</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 3. The Command Center: Instructor Dashboard */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="border-l-2 border-indigo-500 pl-4 space-y-1">
            <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
              Faculty Operations Cockpit
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Instructor Dashboard & Workload Matrix
            </h2>
            <p className="text-sm text-zinc-400 max-w-2xl">
              A unified management cockpit built for capstone coordinators and faculty mentors to supervise student groups, schedule defenses, and track panelist review loads.
            </p>
          </div>

          <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-lg">
            <div className="px-4 py-2.5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-3 font-mono text-xs text-zinc-400">
                  cms.buksu.edu.ph/instructor/workload-matrix
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Live Production Environment
              </span>
            </div>

            <div className="relative overflow-hidden bg-black">
              <img
                src="/cmsv2-showcase/web/01-hero-control-deck.webp"
                alt="BukSU CMS-V2 Instructor Dashboard and Workload Matrix"
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="p-4 bg-zinc-950/60 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-indigo-400" />
                <span>Displays real-time student group assignments, defense schedules, and section-by-section progress.</span>
              </div>
              <span className="font-mono text-zinc-500">BukSU College of Technologies</span>
            </div>
          </div>
        </motion.section>

        {/* 4. Deliberation & Scoring Workspace */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="border-l-2 border-emerald-500 pl-4 space-y-1">
            <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
              Defense Deliberation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Rubric Evaluation & UN SDG Thematic Mapping
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                During oral defenses, panelists historically took notes on loose rubric sheets, creating discrepancies when consolidating revisions. CMS-V2 provides a synchronized evaluation interface where committee members enter criteria-based scores and documented revisions.
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-indigo-950/60 text-indigo-400 shrink-0 mt-0.5 border border-indigo-800/40">
                    <Workflow size={16} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Candidate Proposal Queue
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Structured intake queue organizing title defenses, adviser endorsements, and group revisions into sequential priority orders.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400 shrink-0 mt-0.5 border border-emerald-800/40">
                    <Sparkles size={16} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      UN SDG Thematic Tagging
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Enables groups and advisers to align capstone topics with United Nations Sustainable Development Goals (e.g. SDG 4, SDG 9, SDG 11) for departmental accreditation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-lg">
                <div className="px-4 py-2.5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 text-zinc-200">
                    <FileCheck2 size={14} className="text-emerald-400" />
                    Proposal Feedback & Rubric Review
                  </span>
                  <span className="text-zinc-500">Deliberation Queue</span>
                </div>
                <div className="relative overflow-hidden bg-black">
                  <img
                    src="/cmsv2-showcase/web/02-feedback-ledger.webp"
                    alt="Deliberation queue and rubric review feedback ledger"
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 5. Institutional Clearance Workflow */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="border-l-2 border-indigo-500 pl-4 space-y-1">
            <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
              Governance & Verification
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4-Phase Faculty Clearance Pipeline
            </h2>
            <p className="text-sm text-zinc-400 max-w-3xl">
              A transparent, state-driven sign-off process ensuring student groups complete all required revisions before moving on to subsequent milestones.
            </p>
          </div>

          <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-lg">
            <div className="px-4 py-2.5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-200">
                <Layers size={14} className="text-indigo-400" />
                Multi-Phase Clearance Pipeline
              </span>
              <span className="text-xs text-emerald-400 font-medium">
                Verified Milestone Progression
              </span>
            </div>

            <div className="relative overflow-hidden bg-black">
              <img
                src="/cmsv2-showcase/web/03-clearance-matrix.webp"
                alt="4-Phase institutional clearance matrix"
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Anchored Verification Sub-Panel (Properly Anchored, Not Floating Randomly) */}
            <div className="p-4 sm:p-5 bg-zinc-950/80 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1">
                  <span className="text-zinc-500 font-mono text-[11px] block font-semibold">STAGE 1</span>
                  <p className="text-white font-bold">Proposal Defense</p>
                  <p className="text-zinc-400 text-[11px]">Adviser & Chair review</p>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1">
                  <span className="text-zinc-500 font-mono text-[11px] block font-semibold">STAGE 2</span>
                  <p className="text-white font-bold">Title Defense Gate</p>
                  <p className="text-zinc-400 text-[11px]">Panel quorum consensus</p>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1">
                  <span className="text-zinc-500 font-mono text-[11px] block font-semibold">STAGE 3</span>
                  <p className="text-white font-bold">Manuscript Revisions</p>
                  <p className="text-zinc-400 text-[11px]">Compliance checklist</p>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900 border border-emerald-800/40 space-y-1">
                  <span className="text-emerald-400 font-mono text-[11px] block font-semibold">STAGE 4</span>
                  <p className="text-emerald-400 font-bold">Dean Clearance</p>
                  <p className="text-zinc-400 text-[11px]">Final archive registration</p>
                </div>
              </div>

              {/* State Token Card */}
              <div className="md:col-span-4 p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span className="font-semibold">Revision Gate Verification</span>
                </div>
                <img
                  src="/cmsv2-showcase/web/05-state-token.webp"
                  alt="State Machine verification status badge"
                  loading="lazy"
                  className="w-full h-auto max-h-20 object-contain rounded"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* 6. Digital Research Archive & Manuscript Discovery */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="border-l-2 border-emerald-500 pl-4 space-y-1">
            <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
              Research Archive
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Google Scholar-Style Manuscript Discovery
            </h2>
            <p className="text-sm text-zinc-400 max-w-2xl">
              Transforming years of dormant capstone PDFs into a searchable digital archive with full-text indexing, metadata extraction, and duplicate detection.
            </p>
          </div>

          <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-lg">
            <div className="px-4 py-2.5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-200">
                <Search size={14} className="text-emerald-400" />
                Institutional Research Vault & Citation Explorer
              </span>
              <span className="text-zinc-500">Full-Text Indexed</span>
            </div>

            <div className="relative overflow-hidden bg-black">
              <img
                src="/cmsv2-showcase/web/04-discovery-engine.webp"
                alt="Research vault with Google Scholar-inspired interface and SDG cluster tags"
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="p-5 bg-zinc-950/60 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
              <div className="space-y-1.5">
                <h3 className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  Optical Character Recognition
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  PaddleOCR parses diagrams, tables, and unstructured text from student PDF manuscripts to generate searchable content streams.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-mono text-xs uppercase tracking-wider text-indigo-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  Semantic Vector Embeddings
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Dense text embeddings generated via BGE-M3 and indexed in ChromaDB enable finding relevant prior work by concept rather than strict keyword match.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  Duplicate Topic Prevention
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Allows faculty mentors and panel chairs to cross-reference proposed capstone titles against previous departmental papers to maintain originality.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 7. System Architecture & Topology */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="border-l-2 border-indigo-500 pl-4 space-y-1">
            <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
              System Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Microservice Topology & Document Processing Pipeline
            </h2>
            <p className="text-sm text-zinc-400 max-w-2xl">
              Decoupled services separating client interactions, transactional state updates, and asynchronous document parsing.
            </p>
          </div>

          {/* Architecture Blueprint Container */}
          <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-4 sm:p-6 overflow-hidden shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-2 text-zinc-200">
                <Network size={14} className="text-indigo-400" />
                Architecture Blueprint & Data Pipeline
              </span>
              <span className="text-zinc-500">System Topology Diagram</span>
            </div>

            <div className="flex items-center justify-center p-3 sm:p-6 bg-[#04060A] rounded-lg border border-zinc-900">
              <img
                src="/cmsv2-showcase/web/architecture-blueprint.svg"
                alt="BukSU CMS-V2 system architecture and pipeline blueprint"
                loading="lazy"
                className="w-full max-w-4xl h-auto object-contain"
              />
            </div>
          </div>

          {/* 3 Core Architecture Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-950/60 text-indigo-400 border border-indigo-800/40 flex items-center justify-center font-mono text-xs font-bold">
                1
              </div>
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Client SPA & API Gateway
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                React single-page application interfacing with a Node.js and Express REST gateway with role-based access control (RBAC) across Students, Panelists, Mentors, and Dean Administrators.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 flex items-center justify-center font-mono text-xs font-bold">
                2
              </div>
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                OCR & Vector Ingestion
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Asynchronous document worker processing PDF manuscripts via PaddleOCR and BGE-M3 dense encoders to vectorize paper abstracts, methodology, and titles into ChromaDB.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-amber-950/60 text-amber-400 border border-amber-800/40 flex items-center justify-center font-mono text-xs font-bold">
                3
              </div>
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Transactional State Engine
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                MongoDB atomic session transactions ensuring reliable sign-off state transitions during defense deliberations, paired with secure storage for uploaded manuscripts.
              </p>
            </div>
          </div>
        </motion.section>

        {/* 8. Footer & Actions */}
        <footer className="pt-10 border-t border-zinc-800 space-y-6 text-center">
          <div className="max-w-xl mx-auto space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Explore the Implementation
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              BukSU CMS-V2 is actively maintained as an open-source institutional project supporting academic excellence and capstone governance.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={projectRepoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold tracking-wide transition-colors shadow-sm"
            >
              <span>View Source Code on GitHub</span>
              <ArrowUpRight size={14} />
            </a>

            {onClose && (
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-xs font-semibold tracking-wide transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Return to Portfolio</span>
              </button>
            )}
          </div>

          <div className="text-[11px] font-mono text-zinc-500 pt-4">
            Bukidnon State University • IT Department Capstone Management System • Patrick Josh Añedez
          </div>
        </footer>

      </main>
    </div>
  );
};
