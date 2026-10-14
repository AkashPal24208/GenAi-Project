import React from 'react'
import { Sparkles, ArrowRight, FileText, Video, Target, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router'

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white text-zinc-900 border-b
     border-zinc-100 py-16 sm:py-24 px-6 font-sans antialiased">

      <div 
      className="max-w-4xl mx-auto text-center space-y-8">
        
        {/* Badge */}
        <div 
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full
         bg-zinc-100 text-zinc-800 text-xs font-semibold">

          <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
           AI-Powered Analytics & Interview Prep

        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 leading-tight">

          Supercharge Your Career with <br className="hidden sm:inline" />
          <span className="text-zinc-500">AI-Driven Insights</span>

        </h1>

        {/* Subtitle */}
        <p className="text-zinc-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Get your resume evaluated by AI to reveal ATS scores, 
          skill gaps, and practice tailored mock interviews for your dream roles.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button 
            onClick={()=>navigate('/gen-report')}
            className="w-full sm:w-auto inline-flex items-center justify-center 
            gap-2 h-11 px-7 text-xs font-semibold text-white bg-zinc-900
             hover:bg-zinc-800 active:bg-zinc-950 rounded-full transition-colors cursor-pointer shadow-xs"
          >
          <FileText className="w-4 h-4" />
            Analyze Your Resume
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        {/* How It Works Steps Grid */}
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          
          <div className="p-5 rounded-2xl border
           border-zinc-200/80 bg-zinc-50/50 space-y-3">

            <div className="w-8 h-8 rounded-lg bg-zinc-900
             text-white flex items-center justify-center text-xs font-bold">
              1
            </div>
            
            <h3 className="text-sm font-bold text-zinc-900">Upload Resume</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Upload your existing resume on our scanner page to extract skills and project data.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center text-xs font-bold">
              2
            </div>
            <h3 className="text-sm font-bold text-zinc-900">Get ATS Breakdown</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Review keyword matches, formatting suggestions, and target role alignments.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center text-xs font-bold">
              3
            </div>
            <h3 className="text-sm font-bold text-zinc-900">Practice Interviews</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Take AI-generated mock interviews customized specifically to your resume's weaknesses.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Hero