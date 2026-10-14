import React, { useState, useEffect } from 'react';
import { useInterview } from '../hooks/useInterview.js';
import { useParams } from 'react-router';
import { QuestionCard } from '../components/QuestionCard.jsx';
import { RoadMapDay } from '../components/RoadMapDay.jsx';

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
];

const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical');
    const { report, getReportById, loading, getResumePdf } = useInterview();
    const { interviewId } = useParams();

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        }
    }, [interviewId]);

    if (loading || !report) {
        return (
            <main className="flex h-screen items-center justify-center bg-zinc-50">
                <h1 className="text-lg font-semibold text-zinc-600">Loading your interview plan...</h1>
            </main>
        );
    }

    const scoreColor = report.matchScore >= 80 ? 'text-emerald-600 bg-emerald-50 border-emerald-200' :
                       report.matchScore >= 60 ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-rose-600 bg-rose-50 border-rose-200';

    return (
        <div className="min-h-screen bg-zinc-50 p-6 flex justify-center">
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-6">
                
                {/* Left Navigation */}
                <nav className="bg-white p-4 rounded-2xl border border-zinc-200 flex flex-col justify-between h-fit">
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-zinc-400 uppercase px-3 mb-2">Sections</p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveNav(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xl transition-colors ${
                                    activeNav === item.id ? 'bg-indigo-50 text-indigo-600' : 'text-zinc-600 hover:bg-zinc-50'
                                }`}
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        ))}
                    </div> 
                   
                </nav>

                {/* Center Content */}
                <main className="md:col-span-2 bg-white p-6 rounded-2xl border border-zinc-200">
                    {activeNav === 'technical' && (
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-base font-bold text-zinc-800">Technical Questions</h2>
                                <span className="text-xs text-zinc-400 font-medium">{report.technicalQuestions.length} questions</span>
                            </div>
                            {report.technicalQuestions.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-base font-bold text-zinc-800">Behavioral Questions</h2>
                                <span className="text-xs text-zinc-400 font-medium">{report.behavioralQuestions.length} questions</span>
                            </div>
                            {report.behavioralQuestions.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-base font-bold text-zinc-800">Preparation Road Map</h2>
                                <span className="text-xs text-zinc-400 font-medium">{report.preparationPlan.length}-day plan</span>
                            </div>
                            {report.preparationPlan.map((day) => <RoadMapDay key={day.day} day={day} />)}
                        </section>
                    )}
                </main>

                {/* Right Sidebar */}
                <aside className="bg-white p-6 rounded-2xl border border-zinc-200 h-fit space-y-6">
                    <div className="text-center">
                        <p className="text-xs font-bold text-zinc-400 uppercase mb-3">Match Score</p>
                        <div className={`w-24 h-24 mx-auto rounded-full border-4 flex flex-col items-center justify-center ${scoreColor}`}>
                            <span className="text-2xl font-black">{report.matchScore}%</span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-2">Strong match for this role</p>
                    </div>

                    <hr className="border-zinc-100" />

                    <div>
                        <p className="text-xs font-bold text-zinc-400 uppercase mb-3">Skill Gaps</p>
                        <div className="flex flex-wrap gap-1.5">
                            {report.skillGaps.map((gap, i) => (
                                <span key={i} className="px-2.5 py-1 text-[11px] font-medium bg-zinc-100 text-zinc-700 rounded-lg">
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    );
};

export default Interview;