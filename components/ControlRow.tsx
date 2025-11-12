import React from 'react';

const ControlRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 last:mb-0">
        <label className="text-slate-300 font-medium mb-2 sm:mb-0 sm:mr-4 w-28 shrink-0">{label}</label>
        <div className="w-full flex justify-end">{children}</div>
    </div>
);

export default ControlRow;
