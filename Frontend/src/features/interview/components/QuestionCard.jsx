import React, { useState } from 'react';

export const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-xs transition-all mb-3">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setOpen(o => !o)}>
                <span className="text-xs font-bold text-zinc-400 mr-3">Q{index + 1}</span>
                <p className="flex-1 text-sm font-medium text-zinc-800">{item.question}</p>
                <span className={`transform transition-transform text-zinc-400 ${open ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className="mt-4 pt-4 border-t border-zinc-100 space-y-3">
                    <div>
                        <span className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-amber-50 text-amber-700 rounded mb-1">Intention</span>
                        <p className="text-xs text-zinc-600 leading-relaxed">{item.intention}</p>
                    </div>
                    <div>
                        <span className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 rounded mb-1">Model Answer</span>
                        <p className="text-xs text-zinc-600 leading-relaxed">{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    );
};