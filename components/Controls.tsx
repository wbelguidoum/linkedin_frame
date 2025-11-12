import React, { useState } from 'react';
import type { FrameOptions } from '../types';
import ControlRow from './ControlRow';
import RangeInput from './RangeInput';

interface ControlsProps {
  options: FrameOptions;
  onOptionsChange: (newOptions: Partial<FrameOptions>) => void;
  onDownload: () => void;
  onSave: () => void;
  isSaveDisabled: boolean;
  imageSrc: string | null;
  onOpenUploader: () => void;
  onRemoveImage: () => void;
}

const fonts = [
  'Poppins', 
  'Montserrat', 
  'Lato', 
  'Oswald', 
  'Playfair Display',
  'Roboto Slab',
  'Arial', 
  'Verdana', 
  'Georgia', 
  'Times New Roman', 
  'Courier New'
];

const presets = [
  { name: 'Forest Green', backgroundColor: '#457132', textColor: '#FFFFFF' },
  { name: 'Purple', backgroundColor: '#8244cc', textColor: '#FFFFFF' },
  { name: 'Slate Gray', backgroundColor: '#64748B', textColor: '#FFFFFF' },
  { name: 'Sunset Orange', backgroundColor: '#F97316', textColor: '#FFFFFF' },
  { name: 'LinkedIn Blue', backgroundColor: '#0A66C2', textColor: '#FFFFFF' },
];

const filters = [
    { id: 'none', name: 'Original' },
    { id: 'grayscale', name: 'Grayscale' },
    { id: 'sepia', name: 'Sepia' },
    { id: 'vivid', name: 'Vivid' },
    { id: 'sharp', name: 'Sharp' },
    { id: 'invert', name: 'Invert' },
]

const Controls: React.FC<ControlsProps> = ({
  options,
  onOptionsChange,
  onDownload,
  onSave,
  isSaveDisabled,
  imageSrc,
  onOpenUploader,
  onRemoveImage,
}) => {
  const [activeTab, setActiveTab] = useState('text');

  const handleOptionChange = (key: keyof FrameOptions, value: string | number) => {
    onOptionsChange({ [key]: value });
  };
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleOptionChange('text', e.target.value);
  };
  const handleTextBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      handleOptionChange('text', e.target.value); 
  };

  const handleSliderChange = (key: keyof FrameOptions, val: number) => {
      onOptionsChange({ [key]: val });
  };
  const handleSliderCommit = (key: keyof FrameOptions, val: number) => {
      onOptionsChange({ [key]: val }); 
  };
  
  const handlePresetClick = (preset: { backgroundColor: string; textColor: string }) => {
    onOptionsChange({ frameColorStart: preset.backgroundColor, textColor: preset.textColor });
  }
  
  const handleResetImage = () => {
    onOptionsChange({ imageX: 0, imageY: 0, imageScale: 1 });
  };

  const TabButton: React.FC<{ tabName: string; label: string }> = ({ tabName, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-4 py-2 text-sm font-medium transition-colors border-b-2
        ${activeTab === tabName 
          ? 'border-indigo-500 text-white' 
          : 'border-transparent text-slate-400 hover:text-white'}`
      }
      aria-controls={`panel-${tabName}`}
      role="tab"
      aria-selected={activeTab === tabName}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <button
          onClick={onSave}
          disabled={isSaveDisabled}
          className="w-full flex items-center justify-center bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Save current frame settings"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v12l-5-3.03L5 16V4z"></path>
          </svg>
          Save
        </button>
        <button
          onClick={onDownload}
          className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
          aria-label="Download image with frame"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download Image
        </button>
      </div>

      <div className="flex border-b border-slate-700" role="tablist">
        <TabButton tabName="text" label="Text" />
        <TabButton tabName="image" label="Image" />
      </div>

      <div className="py-6 min-h-[380px]">
        {activeTab === 'text' && (
          <div id="panel-text" role="tabpanel" aria-labelledby="tab-text" className="space-y-4 animate-fade-in">
            <ControlRow label="Frame Text">
              <input
                type="text"
                value={options.text}
                onChange={handleTextChange}
                onBlur={handleTextBlur}
                className="w-full sm:w-48 bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                aria-label="Frame text input"
              />
            </ControlRow>
            
            <ControlRow label="Font">
              <select
                  value={options.font}
                  onChange={(e) => handleOptionChange('font', e.target.value)}
                  className="w-full sm:w-48 bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  aria-label="Select font"
              >
                  {fonts.map(font => <option key={font} value={font}>{font}</option>)}
              </select>
            </ControlRow>

            <ControlRow label="Font Size">
              <RangeInput
                min={30} max={100}
                value={options.fontSize}
                onChange={(val) => handleSliderChange('fontSize', val)}
                onMouseUp={(val) => handleSliderCommit('fontSize', val)}
                onTouchEnd={(val) => handleSliderCommit('fontSize', val)}
                labelWidth="w-8"
                aria-label="Font size slider"
              />
            </ControlRow>

            <ControlRow label="Letter Spacing">
              <RangeInput
                min={0} max={50}
                value={options.letterSpacing}
                onChange={(val) => handleSliderChange('letterSpacing', val)}
                onMouseUp={(val) => handleSliderCommit('letterSpacing', val)}
                onTouchEnd={(val) => handleSliderCommit('letterSpacing', val)}
                labelWidth="w-8"
                aria-label="Letter spacing slider"
              />
            </ControlRow>
            
            <ControlRow label="Frame Thickness">
              <RangeInput
                min={2} max={30} step={1}
                value={options.frameThickness}
                onChange={(val) => handleSliderChange('frameThickness', val)}
                onMouseUp={(val) => handleSliderCommit('frameThickness', val)}
                onTouchEnd={(val) => handleSliderCommit('frameThickness', val)}
                unit="%"
                labelWidth="w-8"
                aria-label="Frame thickness slider"
              />
            </ControlRow>

            <ControlRow label="Text Rotation">
              <RangeInput
                min={0} max={360}
                value={options.textRotation}
                onChange={(val) => handleSliderChange('textRotation', val)}
                onMouseUp={(val) => handleSliderCommit('textRotation', val)}
                onTouchEnd={(val) => handleSliderCommit('textRotation', val)}
                unit="°"
                labelWidth="w-8"
                aria-label="Text rotation slider"
              />
            </ControlRow>
            
            <div className="pt-2 border-t border-slate-700">
                <label className="block text-slate-300 font-medium mb-3 text-sm pt-4">Presets</label>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {presets.map(p => (
                    <button 
                      key={p.name} 
                      title={p.name}
                      onClick={() => handlePresetClick(p)}
                      className="w-full aspect-square rounded-full cursor-pointer border-2 border-transparent hover:border-white focus:border-white focus:outline-none transition-all"
                      style={{ backgroundColor: p.backgroundColor }}
                      aria-label={`Apply ${p.name} preset`}
                    />
                  ))}
                </div>
            </div>
            
            <ControlRow label="Color">
              <div className="flex items-center justify-end space-x-2 w-full sm:w-48">
                <span className="font-mono text-sm text-slate-400">{options.frameColorStart.toUpperCase()}</span>
                <input
                  type="color"
                  value={options.frameColorStart}
                  onChange={(e) => handleOptionChange('frameColorStart', e.target.value)}
                  className="w-10 h-10 p-1 bg-slate-800 border-slate-600 rounded-md cursor-pointer"
                  aria-label="Frame color picker"
                />
              </div>
            </ControlRow>
            
            <ControlRow label="Text Color">
              <div className="flex items-center justify-end space-x-2 w-full sm:w-48">
                <span className="font-mono text-sm text-slate-400">{options.textColor.toUpperCase()}</span>
                <input
                  type="color"
                  value={options.textColor}
                  onChange={(e) => handleOptionChange('textColor', e.target.value)}
                  className="w-10 h-10 p-1 bg-slate-800 border-slate-600 rounded-md cursor-pointer"
                  aria-label="Text color picker"
                />
              </div>
            </ControlRow>
          </div>
        )}

        {activeTab === 'image' && (
          <div id="panel-image" role="tabpanel" aria-labelledby="tab-image" className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-slate-300 font-medium mb-3">Manage Image</label>
              <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg">
                <img src={imageSrc ?? undefined} className="w-14 h-14 rounded-full object-cover bg-slate-700" alt="Current profile" />
                <div className="flex-grow grid grid-cols-2 gap-2">
                  <button onClick={onOpenUploader} className="text-sm font-semibold bg-slate-700 hover:bg-slate-600 rounded-md py-2 px-3 transition-colors" aria-label="Change profile image">Change</button>
                  <button onClick={onRemoveImage} className="text-sm font-semibold bg-slate-700/50 hover:bg-slate-600 rounded-md py-2 px-3 transition-colors" aria-label="Remove profile image">Remove</button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <ControlRow label="Zoom">
                 <RangeInput
                    min={1} max={3} step={0.01}
                    value={options.imageScale}
                    onChange={(v) => handleSliderChange('imageScale', v)}
                    onMouseUp={(v) => handleSliderCommit('imageScale', v)}
                    onTouchEnd={(v) => handleSliderCommit('imageScale', v)}
                    displayValueFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                    aria-label="Image zoom slider"
                 />
              </ControlRow>
              <ControlRow label="Horizontal Pan">
                  <RangeInput
                      min={-50} max={50} step={0.1}
                      value={options.imageX}
                      onChange={(v) => handleSliderChange('imageX', v)}
                      onMouseUp={(v) => handleSliderCommit('imageX', v)}
                      onTouchEnd={(v) => handleSliderCommit('imageX', v)}
                      displayPrecision={1}
                      aria-label="Image horizontal pan slider"
                  />
              </ControlRow>
              <ControlRow label="Vertical Pan">
                  <RangeInput
                      min={-50} max={50} step={0.1}
                      value={options.imageY}
                      onChange={(v) => handleSliderChange('imageY', v)}
                      onMouseUp={(v) => handleSliderCommit('imageY', v)}
                      onTouchEnd={(v) => handleSliderCommit('imageY', v)}
                      displayPrecision={1}
                      aria-label="Image vertical pan slider"
                  />
              </ControlRow>
              <div className="pt-4 flex justify-center">
                  <button onClick={handleResetImage} className="w-full text-sm text-indigo-400 hover:text-indigo-300 text-center py-2 rounded-lg hover:bg-slate-800/50 transition-colors" aria-label="Reset image position and zoom">
                      Reset Position
                  </button>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-700">
              <label className="block text-slate-300 font-medium mb-3">Filter</label>
              <div className="grid grid-cols-3 gap-2">
                {filters.map(f => (
                  <button
                    key={f.id}
                    onClick={() => onOptionsChange({ filter: f.id })}
                    className={`text-sm font-semibold rounded-md py-2 px-3 transition-colors ${
                      options.filter === f.id ? 'bg-indigo-600 text-white' : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                    aria-label={`Apply ${f.name} filter`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Controls;