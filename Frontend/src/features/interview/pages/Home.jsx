import React, { useState, useRef } from 'react'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { loading, generateReport, reports, getReports } = useInterview()
  const [jobDescription, setJobDescription] = useState('')
  const [selfDescription, setSelfDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  
  const resumeInputRef = useRef(null)
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleGenerateReport = async () => {
    // 1. Target Job Description is strictly required
    if (!jobDescription.trim()) {
      alert("Please enter the Target Job Description.")
      return
    }

    // 2. Either Resume or Self Description must be present
    const resumeFile = resumeInputRef.current?.files?.[0] || selectedFile

    if (!resumeFile && !selfDescription.trim()) {
      alert("Please upload your resume OR fill in a quick self-description.")
      return
    }

    // 3. Call report generation
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile
    })

    // 4. Safely check response before navigating
    if (!data || !data._id) {
      alert("Failed to generate interview plan. Please try again.")
      return
    }

    navigate(`/interview/${data._id}`)
  }

  /**
   * @description Loading screen state
   */
  if (loading) {
    return (
      <main className="min-h-[80vh] flex flex-col items-center justify-center gap-3 text-zinc-900 font-sans">
        <svg className="w-6 h-6 animate-spin text-zinc-900" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
          <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <h1 className="text-sm font-medium text-zinc-600 tracking-tight">Generating your interview plan...</h1>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col justify-between p-6 sm:p-10 font-sans antialiased">
      
      {/* Page Header */}
      <header className="max-w-2xl mx-auto text-center space-y-3 my-6 sm:my-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
          AI Interview Assistant
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 leading-tight">
          Create Your Interview Plan
        </h1>
        <p className="text-zinc-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          Provide the role requirements and your background to build a tailored preparation strategy.
        </p>
      </header>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto w-full bg-white border border-zinc-200 rounded-2xl shadow-xs overflow-hidden flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-100">

          {/* Left Panel - Job Description */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-zinc-50/50">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-semibold text-xs">
                    01
                  </div>
                  <h2 className="text-sm font-bold text-zinc-900 tracking-tight">Job Description</h2>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase text-zinc-600 bg-zinc-200/60 rounded">
                  Required
                </span>
              </div>

              <div className="relative">
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  maxLength={5000}
                  rows={9}
                  className="w-full bg-white border border-zinc-200 focus:border-zinc-900 rounded-xl p-4 text-xs sm:text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none transition-all resize-none leading-relaxed"
                  placeholder={`Paste the full job description here...\n\ne.g. 'Senior Frontend Engineer at Tech Corp requires proficiency in React, TypeScript, and system design...'`}
                />
                <div className="text-right text-[11px] text-zinc-400 mt-1.5 font-mono">
                  {jobDescription.length} / 5000
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Profile */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-semibold text-xs">
                  02
                </div>
                <h2 className="text-sm font-bold text-zinc-900 tracking-tight">Your Profile</h2>
              </div>

              {/* Upload Resume */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-zinc-700">Upload Resume</label>
                  <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    Recommended
                  </span>
                </div>

                <label 
                  htmlFor="resume" 
                  className="group cursor-pointer border border-dashed border-zinc-300 hover:border-zinc-900 bg-zinc-50 hover:bg-zinc-100/50 rounded-xl p-4 text-center transition-all duration-150 flex flex-col items-center justify-center gap-1.5 block"
                >
                  <svg className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5h10.5a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0017.25 4.5H6.75A2.25 2.25 0 004.5 6.75v10.5A2.25 2.25 0 006.75 19.5z" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold text-zinc-800">
                      {selectedFile ? selectedFile.name : 'Click to upload resume'}
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">PDF or DOCX (Max 5MB)</p>
                  </div>
                  <input 
                    ref={resumeInputRef} 
                    onChange={handleFileChange}
                    hidden 
                    type="file" 
                    id="resume" 
                    name="resume" 
                    accept=".pdf,.docx" 
                  />
                </label>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-2">
                <div className="w-full border-t border-zinc-100" />
                <span className="absolute bg-white px-2.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
                  OR
                </span>
              </div>

              {/* Quick Self-Description */}
              <div className="space-y-1.5">
                <label htmlFor="selfDescription" className="text-xs font-semibold text-zinc-700">
                  Quick Self-Description
                </label>
                <textarea
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  id="selfDescription"
                  name="selfDescription"
                  rows={3}
                  className="w-full bg-white border border-zinc-200 focus:border-zinc-900 rounded-xl p-3 text-xs sm:text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none transition-all resize-none leading-relaxed"
                  placeholder="Summarize your key skills, experience, and background if you don't have a resume file..."
                />
              </div>
            </div>

            {/* Note */}
            <p className="text-[11px] text-zinc-500 leading-normal bg-zinc-50 p-2.5 rounded-lg border border-zinc-100">
              Provide either a <strong className="text-zinc-900 font-semibold">Resume</strong> or <strong className="text-zinc-900 font-semibold">Self Description</strong> to generate a custom strategy.
            </p>
          </div>
        </div>

        {/* Card Footer Action */}
        <div className="bg-zinc-50/80 border-t border-zinc-100 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-medium text-zinc-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Takes ~30s to process
          </span>
          <button
            onClick={handleGenerateReport}
            className="w-full sm:w-auto inline-flex items-center justify-center h-10 px-6 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-950 rounded-full transition-colors cursor-pointer shadow-xs"
          >
            Generate Strategy
          </button>
        </div>
      </div>

      {/* Page Footer */}
      <footer className="mt-12 mb-4 text-center flex items-center justify-center gap-4 text-xs text-zinc-400">
        <a href="#" className="hover:text-zinc-800 transition-colors">Privacy</a>
        <span>&bull;</span>
        <a href="#" className="hover:text-zinc-800 transition-colors">Terms</a>
        <span>&bull;</span>
        <a href="#" className="hover:text-zinc-800 transition-colors">Support</a>
      </footer>

    </div>
  )
}

export default Home