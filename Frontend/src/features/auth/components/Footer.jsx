import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Mail, Phone, Heart } from 'lucide-react'
import { FaGithub, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="w-full border-t border-zinc-100 bg-white font-sans text-zinc-900 antialiased">
      <div className="mx-auto max-w-6xl px-6 py-12">
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          
          {/* Brand Details & Core Mission (Spans 5 cols) */}
          <div className="space-y-4 md:col-span-5">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 font-extrabold text-sm tracking-wide text-zinc-900 group"
            >
              <div className="w-7 h-7 rounded-xl bg-zinc-900 text-white flex items-center justify-center text-xs shadow-xs group-hover:bg-zinc-800 transition-colors">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span>
                Resume<span className="text-zinc-500 font-normal">AI</span>
              </span>
            </Link>

            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
              AI-powered resume evaluation, keyword gap analysis, and tailored mock interview practice built for ambitious software engineers.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/80 transition-all cursor-pointer"
                aria-label="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/80 transition-all cursor-pointer"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links (Spans 3 cols) */}
          <div className="space-y-3 md:col-span-3">
            <p className="text-xs font-bold text-zinc-900 tracking-wider uppercase">Navigation</p>
            <ul className="space-y-2 text-xs font-medium text-zinc-500">
              <li>
                <Link to="/" className="hover:text-zinc-900 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/gen-report" className="hover:text-zinc-900 transition-colors">
                  Analyze Resume
                </Link>
              </li>
              <li>
                <Link to="/past-report" className="hover:text-zinc-900 transition-colors">
                  Past Reports
                </Link>
              </li>
              <li>
                <Link to="/mock-interview" className="hover:text-zinc-900 transition-colors">
                  Mock Interview
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information (Spans 4 cols) */}
          <div className="space-y-3 md:col-span-4">
            <p className="text-xs font-bold text-zinc-900 tracking-wider uppercase">Get In Touch</p>
            <ul className="space-y-2.5 text-xs text-zinc-500">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                <a href="mailto:code@gmail.com" className="hover:text-zinc-900 hover:underline transition-colors font-medium text-zinc-700">
                  code@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-zinc-400" />
                <span className="font-medium text-zinc-700">+91 1234567890</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar / Copyright */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-zinc-100 pt-6 sm:flex-row text-[11px] text-zinc-400">
          <p className="flex items-center gap-1">
            &copy; 2026 ResumeAI. all rights reserved
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="transition-colors hover:text-zinc-800">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link to="/terms" className="transition-colors hover:text-zinc-800">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer