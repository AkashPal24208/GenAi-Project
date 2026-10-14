import React, { useState } from 'react'
import { generateResumePdf } from '../services/interview.api'
const Resume = () => {
  // State for user inputs and generated output
  const [jobDescription, setJobDescription] = useState('')
  const [selfDescription, setSelfDescription] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [pdfUrl,setPdfUrl] = useState(null);
  // Handler for resume generation (simulate AI call)
  const handleGenerate = async(e) => {
    e.preventDefault()
    setIsGenerating(true)
    try{
    const response = await generateResumePdf({jobDescription,selfDescription})
    const blobUrl = URL.createObjectURL(new Blob([response],{type:'application/pdf'}));
    setPdfUrl(blobUrl)
    }catch(err){
       console.log("Error while generating resume:",err.message)
    }
    finally{
      setIsGenerating(false)
    }
   
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <header className="text-center mb-8">
        <span className="inline-block bg-zinc-200 text-zinc-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          Build With AI
        </span>
        <h1 className="text-3xl font-bold text-zinc-900">
          Create a Better Resume with AI & Best ATS Score
        </h1>
        <p className="text-zinc-600 mt-1">
          Tailor your experience to match any job description instantly.
        </p>
      </header>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto items-start">
        
        {/* Left Part: Input Section (Streamlined / Compacted) */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-200">
          <h2 className="text-lg font-semibold text-zinc-800 mb-4">Input Information</h2>
          
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-zinc-500 mb-1">
                Job Description
              </label>
              <textarea
                rows="4"
                className="w-full p-3 border border-zinc-300 rounded-2xl focus:ring-2 focus:ring-black focus:border-black focus:outline-none transition text-sm"
                placeholder="Paste the target job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-zinc-500 mb-1">
                Your Professional Background / Skills
              </label>
              <textarea
                rows="4"
                className="w-full p-3 border border-zinc-300 rounded-2xl focus:ring-2 focus:ring-black focus:border-black focus:outline-none transition text-sm"
                placeholder="Enter your experience, education, and skills..."
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                required
              />
            </div>

            {/* Stylish Black Button with Balanced Width */}
            <div className="pt-1 flex justify-center">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-3/4 bg-black hover:bg-zinc-800 active:bg-zinc-900 text-white font-medium py-3 px-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 border border-black disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Resume</span>
                    <span>✨</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

  {/* Right Part: Preview & Download Section */}
        <section className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-zinc-200 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-800 mb-4">Live Resume Preview</h2>
            
            {/* PDF Preview Container - Responsive scaling wrapper */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden h-[400px] sm:h-[420px] relative flex items-center justify-center">
              {pdfUrl ? (
                <div className="w-full h-full overflow-auto sm:overflow-hidden">
                  <iframe
                    src={`${pdfUrl}#toolbar=0&navpanes=0&view=FitH`}
                    title="Resume PDF Preview"
                    className="w-full h-full border-none scale-100 sm:scale-100 origin-top"
                  />
                </div>
              ) : (
                <span className="text-zinc-400 italic text-sm p-6 text-center">
                  Your AI-generated, ATS-optimized resume preview will appear here once you fill out the details and click generate...
                </span>
              )}
            </div>
          </div>

          {/* Save & Download Actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">

            <a
              href={pdfUrl || '#'}
              download="ATS_Optimized_Resume.pdf"
              onClick={(e) => {
                if (!pdfUrl) e.preventDefault();
              }}
              className={`w-full sm:flex-1 text-center font-medium py-2.5 px-4 rounded-2xl transition duration-200 text-sm ${
                pdfUrl 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer' 
                  : 'bg-emerald-600 text-white opacity-50 cursor-not-allowed pointer-events-none'
              }`}
            >
              Download PDF
            </a>
          </div>
        </section>

      </div>
    </div>
  )
}

export default Resume