import React from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Layers,
  ShieldCheck,
  Cpu,
  Search,
  Workflow,
  BookOpen
} from 'lucide-react';

interface CMSV2TerminalShowcaseProps {
  onOpenCaseStudy: () => void;
  onSoundTrigger?: () => void;
}

export const CMSV2TerminalShowcase: React.FC<CMSV2TerminalShowcaseProps> = ({
  onOpenCaseStudy,
  onSoundTrigger
}) => {
  return (
    <div className="space-y-6 pt-2 font-mono text-xs select-none">
      {/* System Summary Bar */}
      <div className="border border-[#00FF66]/30 bg-[#030704] p-3.5 rounded-lg shadow-glow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#00FF66]/20 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
            <span className="text-[#00FF66] font-bold tracking-wide uppercase text-xs text-glow">
              BukSU Capstone Management & Archiving System (CMS-V2)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-[#00FF66]/15 text-[#00FF66] px-2.5 py-0.5 rounded border border-[#00FF66]/40 uppercase font-semibold">
              Live Production
            </span>
            <span className="text-[10px] text-zinc-300 border border-white/10 px-2 py-0.5 rounded bg-black/40">
              BukSU IT Department
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-[10px] text-zinc-300">
          <div>
            <span className="text-zinc-500 block text-[9px] uppercase font-semibold">Role</span>
            <span className="text-white font-medium">Lead Full-Stack Developer</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[9px] uppercase font-semibold">Department</span>
            <span className="text-white font-medium">BukSU College of Technologies</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[9px] uppercase font-semibold">Approval Flow</span>
            <span className="text-[#00FF66] font-medium">4-Phase Defense Clearance</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[9px] uppercase font-semibold">Core Stack</span>
            <span className="text-[#00FF66] font-medium">React, Express, MongoDB</span>
          </div>
        </div>
      </div>

      {/* 01: Hero Command Center */}
      <div className="border border-[#00FF66]/25 rounded-lg bg-[#030704] overflow-hidden shadow-glow">
        <div className="flex items-center justify-between px-3.5 py-2 bg-black/90 border-b border-[#00FF66]/20">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            <span className="ml-2 text-[10px] text-zinc-400 font-mono tracking-wide hidden xs:inline">
              cms.buksu.edu.ph/instructor/workload-matrix
            </span>
          </div>
          <span className="text-[9px] font-semibold tracking-wider text-[#00FF66] bg-[#00FF66]/10 px-2 py-0.5 rounded border border-[#00FF66]/30 uppercase">
            Instructor Workload Matrix
          </span>
        </div>

        <div className="relative overflow-hidden group bg-black">
          <img
            src="/cmsv2-showcase/web/01-hero-control-deck.webp"
            alt="Instructor Dashboard and Workload Matrix"
            loading="lazy"
            className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300 border-b border-[#00FF66]/20"
          />
        </div>

        <div className="p-3.5 space-y-1 bg-[#030704]">
          <div className="text-[11px] text-[#00FF66] font-bold tracking-wide uppercase flex items-center gap-1.5">
            <Cpu size={13} className="text-[#00FF66]" />
            Instructor Dashboard & Workload Matrix
          </div>
          <p className="text-[10px] text-zinc-300 leading-relaxed font-sans">
            Centralized faculty operations bridge for capstone coordinators and mentors. Tracks advisee groups, scheduled oral defenses, and panel review loads across university class sections.
          </p>
        </div>
      </div>

      {/* 02 & 03: Deliberation & State Verification (2-Col Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Feedback Ledger */}
        <div className="border border-[#00FF66]/25 rounded-lg bg-[#030704] overflow-hidden shadow-glow flex flex-col justify-between">
          <div className="px-3 py-2 bg-black/80 border-b border-[#00FF66]/20 flex items-center justify-between text-[10px] text-zinc-300">
            <span className="font-semibold flex items-center gap-1.5 text-white">
              <Workflow size={12} className="text-[#00FF66]" /> Proposal Evaluation
            </span>
            <span className="text-[9px] text-[#00FF66]/80">Rubric Scoring</span>
          </div>

          <div className="relative overflow-hidden group bg-black flex-grow">
            <img
              src="/cmsv2-showcase/web/02-feedback-ledger.webp"
              alt="Deliberation queue and rubric review feedback ledger"
              loading="lazy"
              className="w-full h-44 object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-300 border-b border-[#00FF66]/20"
            />
          </div>

          <div className="p-3.5 space-y-1 bg-[#030704]">
            <div className="text-[11px] text-[#00FF66] font-bold tracking-wide uppercase">
              Deliberation Workspace & SDG Tags
            </div>
            <p className="text-[10px] text-zinc-300 leading-relaxed font-sans">
              Structured evaluation workspace with rubric scoring, candidate revision logs, and automated United Nations Sustainable Development Goal (SDG) thematic categorization.
            </p>
          </div>
        </div>

        {/* Right: State Verification */}
        <div className="border border-[#00FF66]/25 rounded-lg bg-[#030704] overflow-hidden shadow-glow flex flex-col justify-between">
          <div className="px-3 py-2 bg-black/80 border-b border-[#00FF66]/20 flex items-center justify-between text-[10px] text-zinc-300">
            <span className="font-semibold flex items-center gap-1.5 text-white">
              <ShieldCheck size={12} className="text-[#00FF66]" /> Milestone Verification
            </span>
            <span className="text-[9px] text-[#00FF66]/80">Validation Gates</span>
          </div>

          <div className="relative overflow-hidden group bg-black flex-grow flex items-center justify-center p-3">
            <img
              src="/cmsv2-showcase/web/05-state-token.webp"
              alt="Milestone verification badge and approval status"
              loading="lazy"
              className="w-full h-auto max-h-40 object-contain opacity-95 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>

          <div className="p-3.5 space-y-2 bg-[#030704] border-t border-[#00FF66]/15">
            <div className="text-[11px] text-[#00FF66] font-bold tracking-wide uppercase">
              Revision Gates & State Engine
            </div>
            <p className="text-[10px] text-zinc-300 leading-relaxed font-sans">
              Strict state machine enforcing revision approvals before defense scheduling. Ensures groups cannot advance without panel sign-offs.
            </p>
            {/* Tech badges */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {['#PaddleOCR-VL', '#BAAI/bge-m3', '#ChromaDB', '#MongoDB', '#Express'].map((badge) => (
                <span
                  key={badge}
                  className="text-[9px] font-mono font-medium text-[#00FF66] bg-[#00FF66]/10 border border-[#00FF66]/30 px-2 py-0.5 rounded"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 04: Clearance Matrix */}
      <div className="border border-[#00FF66]/25 rounded-lg bg-[#030704] overflow-hidden shadow-glow">
        <div className="px-3.5 py-2 bg-black/80 border-b border-[#00FF66]/20 flex items-center justify-between text-[10px] text-zinc-300">
          <span className="font-semibold flex items-center gap-1.5 text-white">
            <Layers size={12} className="text-[#00FF66]" /> Multi-Tier Sign-Off Sequence
          </span>
          <span className="text-[9px] text-[#00FF66]">Phase 1 to Phase 4</span>
        </div>

        <div className="relative overflow-hidden group bg-black">
          <img
            src="/cmsv2-showcase/web/03-clearance-matrix.webp"
            alt="Multi-phase faculty clearance pipeline"
            loading="lazy"
            className="w-full h-auto max-h-56 object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity duration-300 border-b border-[#00FF66]/20"
          />
        </div>

        <div className="p-3.5 space-y-1 bg-[#030704]">
          <div className="text-[11px] text-[#00FF66] font-bold tracking-wide uppercase">
            4-Phase Faculty Clearance Pipeline
          </div>
          <p className="text-[10px] text-zinc-300 leading-relaxed font-sans">
            Clear progressive sign-off pipeline: Proposal Defense, Title Defense, Final Manuscript Revisions, and Dean Department Clearance with timestamped audit records.
          </p>
        </div>
      </div>

      {/* 05 & 06: Research Vault & Topology (2-Col Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Research Vault */}
        <div className="border border-[#00FF66]/25 rounded-lg bg-[#030704] overflow-hidden shadow-glow flex flex-col justify-between">
          <div className="px-3 py-2 bg-black/80 border-b border-[#00FF66]/20 flex items-center justify-between text-[10px] text-zinc-300">
            <span className="font-semibold flex items-center gap-1.5 text-white">
              <Search size={12} className="text-[#00FF66]" /> University Research Archive
            </span>
            <span className="text-[9px] text-[#00FF66]">Full-Text Indexed</span>
          </div>

          <div className="relative overflow-hidden group bg-black flex-grow">
            <img
              src="/cmsv2-showcase/web/04-discovery-engine.webp"
              alt="Research vault with Google Scholar inspired interface and SDG filters"
              loading="lazy"
              className="w-full h-44 object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-300 border-b border-[#00FF66]/20"
            />
          </div>

          <div className="p-3.5 space-y-1 bg-[#030704]">
            <div className="text-[11px] text-[#00FF66] font-bold tracking-wide uppercase">
              Research Archive & Manuscript Discovery
            </div>
            <p className="text-[10px] text-zinc-300 leading-relaxed font-sans">
              Google Scholar-style discovery portal replacing forgotten paper stacks. Enables semantic searching, SDG categorization, and title duplicate checks for new student proposals.
            </p>
          </div>
        </div>

        {/* Right: Architecture Blueprint */}
        <div className="border border-[#00FF66]/25 rounded-lg bg-[#030704] overflow-hidden shadow-glow flex flex-col justify-between">
          <div className="px-3 py-2 bg-black/80 border-b border-[#00FF66]/20 flex items-center justify-between text-[10px] text-zinc-300">
            <span className="font-semibold flex items-center gap-1.5 text-white">
              <Cpu size={12} className="text-[#00FF66]" /> System Architecture
            </span>
            <span className="text-[9px] text-[#00FF66]">Microservice Diagram</span>
          </div>

          <div className="relative overflow-hidden group bg-[#020503] p-3 flex-grow flex items-center justify-center border-b border-[#00FF66]/20">
            <img
              src="/cmsv2-showcase/web/architecture-blueprint.svg"
              alt="BukSU CMS-V2 system architecture and pipeline blueprint"
              loading="lazy"
              className="w-full h-40 object-contain opacity-95 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>

          <div className="p-3.5 space-y-1 bg-[#030704]">
            <div className="text-[11px] text-[#00FF66] font-bold tracking-wide uppercase">
              System Topology & Document Pipeline
            </div>
            <p className="text-[10px] text-zinc-300 leading-relaxed font-sans">
              React client connected to a Node.js/Express API Gateway with role-based authentication, PaddleOCR document parsing, and ChromaDB vector search backed by MongoDB.
            </p>
          </div>
        </div>
      </div>

      {/* Action Commands */}
      <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => {
            if (onSoundTrigger) onSoundTrigger();
            onOpenCaseStudy();
          }}
          className="w-full sm:flex-1 py-3 px-4 bg-[#00FF66] hover:bg-[#00E55C] text-black font-bold text-xs tracking-wider uppercase rounded-md transition-colors shadow-glow flex items-center justify-center gap-2 cursor-pointer"
        >
          <BookOpen size={14} />
          <span>Read Full Case Study</span>
        </motion.button>

        <a
          href="https://github.com/Patkik/Capstone-management-system"
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto py-3 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-500 rounded-md text-white font-medium text-xs tracking-wide transition-colors flex items-center justify-center gap-1.5"
        >
          <span>View Source Code on GitHub</span>
          <ExternalLink size={13} className="text-zinc-400" />
        </a>
      </div>
    </div>
  );
};
