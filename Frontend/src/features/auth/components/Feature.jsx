import React from 'react'

const Feature = () => {
  const featuresList = [
    {
      title: "AI Resume Analysis",
      description: "Upload your resume and let AI analyze structure, keywords, and relevance instantly.",
      badge: "Most Popular",
      icon: (
        <svg className="w-5 h-5 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      benefits: [
        "Skills detected automatically",
        "Experience depth analysis",
        "Identified strengths & weak points"
      ]
    },
    {
      title: "Targeted Interview Questions",
      description: "Get custom interview questions crafted around your specific target job description.",
      badge: "Smart Prep",
      icon: (
        <svg className="w-5 h-5 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M8.25 3v1.5M15.75 3v1.5M3 8.25h18M3 18.75a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18.75V8.25H3v10.5z" />
        </svg>
      ),
      benefits: [
        "Behavioral & technical questions",
        "Role-matched difficulty rating",
        "Suggested answer strategies"
      ]
    },
    {
      title: "Match Score & Insights",
      description: "Measure how closely your profile fits the target role before walking into the interview.",
      badge: "Real-time Metric",
      icon: (
        <svg className="w-5 h-5 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      benefits: [
        "Percentage match breakdown",
        "Missing keyword alerts",
        "Actionable improvement tips"
      ]
    }
  ]

  return (
    <section className="bg-white py-16 sm:py-24 px-6 font-sans text-zinc-900 antialiased border-b border-zinc-100">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
            Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
            Powerful AI Features for Your Next Interview
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base leading-relaxed">
            Everything you need to analyze your resume and prepare for your next career move.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuresList.map((feature, idx) => (
            <div 
              key={idx}
              className="group relative bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md hover:border-zinc-900 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header / Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-200 flex items-center justify-center">
                    {React.cloneElement(feature.icon, {
                      className: "w-5 h-5 text-zinc-900 group-hover:text-white transition-colors"
                    })}
                  </div>
                  <span className="text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200/60">
                    {feature.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-zinc-900">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Subtitle & Checklist */}
                <div className="pt-2 border-t border-zinc-100">
                  <p className="text-xs font-semibold text-zinc-700 mb-2">What you'll get:</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-xs text-zinc-600 flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-zinc-900 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action indicator on hover */}
              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-zinc-900">
                <span>Explore feature</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Feature