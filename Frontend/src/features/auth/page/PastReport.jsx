import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router';
import { useInterview } from '../../interview/hooks/useInterview'

const PastReport = () => {
  const { reports, getReports, loading } = useInterview();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching reports...");
    console.log("Reports:", reports);
    getReports();
  }, []);

  // Loading Skeleton View
  if (loading && (!reports || reports.length === 0)) {
    return (
      <main className="min-h-[80vh] flex flex-col items-center justify-center gap-3 text-zinc-900 font-sans">
        <svg className="w-6 h-6 animate-spin text-zinc-900" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
          <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <h1 className="text-sm font-medium text-zinc-600 tracking-tight">Loading reports...</h1>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 p-6 sm:p-10 max-w-5xl mx-auto font-sans antialiased">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-zinc-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            Past Reports
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            View and review your previously generated interview strategy reports.
          </p>
        </div>
        
        <button 
          onClick={() => navigate('/gen-report')}
          className="inline-flex items-center justify-center h-9 px-4 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-950 rounded-full transition-colors cursor-pointer shadow-xs self-start sm:self-auto"
        >
          + New Report
        </button>
      </div>

      {/* Empty State */}
      {!loading && (!reports || reports.length === 0) && (
        <div className="text-center py-16 px-4 border border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50">
          <div className="w-10 h-10 mx-auto rounded-xl bg-zinc-100 text-zinc-400 flex items-center justify-center mb-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-zinc-900">No reports found</h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
            You haven't generated any interview reports yet.
          </p>
          <button 
            onClick={() => navigate('/gen-report')}
            className="mt-4 text-xs font-semibold text-zinc-900 hover:underline"
          >
            Create your first report &rarr;
          </button>
        </div>
      )}

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report) => (
          <div 
            key={report._id} 
            onClick={() => navigate(`/interview/${report._id}`)}
            className="group cursor-pointer bg-white border border-zinc-200 hover:border-zinc-900 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-bold text-zinc-900 group-hover:text-zinc-900 line-clamp-1">
                  {report.title || "Untitled Interview Strategy"}
                </h3>
                
                {/* Match Score Badge */}
                {report.matchScore !== undefined && (
                  <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-800 border border-zinc-200">
                    {report.matchScore}% Match
                  </span>
                )}
              </div>
            </div>

            {/* Footer / Meta Info */}
            <div className="flex items-center justify-between text-xs text-zinc-400 pt-3 border-t border-zinc-100">
              <span>
                {new Date(report.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>

              <span className="font-semibold text-zinc-900 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1 text-[11px]">
                View Report &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default PastReport