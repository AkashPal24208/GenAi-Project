import React from 'react';

export const RoadMapDay = ({ day }) => (
    <div className="bg-white border border-zinc-200 rounded-xl p-4 mb-3 shadow-xs">
        <div className="flex items-center gap-3 mb-3">
            <span className="px-2.5 py-1 text-xs font-bold bg-indigo-50 text-indigo-600 rounded-lg">Day {day.day}</span>
            <h3 className="text-sm font-semibold text-zinc-800">{day.focus}</h3>
        </div>
        <ul className="space-y-2">
            {day.tasks.map((task, i) => (
                <li key={i} className="flex items-start text-xs text-zinc-600 leading-relaxed">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 mr-2 shrink-0" />
                    {task}
                </li>
            ))}
        </ul>
    </div>
);