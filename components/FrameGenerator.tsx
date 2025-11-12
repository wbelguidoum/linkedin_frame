
import React, { useState, useRef, useCallback, useEffect } from 'react';
import ImageCanvas from './ImageCanvas';
import Controls from './Controls';
import Logo from './Logo';
import FileUpload from './FileUpload';
import Auth from './Auth';
import Footer from './Footer';
import type { FrameOptions, User } from '../types';
import { drawProfileFrame } from '../utils/canvasDraw'; 

const defaultImage = `data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500' viewBox='0 0 24 24'%3e%3cpath fill='%2394a3b8' d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3e%3c/svg%3e`;

interface FrameGeneratorProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

const FrameGenerator: React.FC<FrameGeneratorProps> = ({ user, onLogin, onLogout }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(defaultImage);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [options, setOptions] = useState<FrameOptions>({
    text: '#OPENTOWORK',
    frameColorStart: '#457132',
    textColor: '#FFFFFF',
    font: 'Arial',
    fontSize: 100,
    textRotation: 225,
    imageX: 0,
    imageY: 0,
    imageScale: 1,
    letterSpacing: 10,
    filter: 'none',
    frameThickness: 30, 
  });
  const [isDirty, setIsDirty] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastSavedStateRef = useRef<{ imageSrc: string | null; options: FrameOptions } | null>(null);
  
  useEffect(() => {
    let initialOptions = { ...options }; 
    let initialImageSrc = imageSrc;

    try {
      const savedStateJSON = localStorage.getItem('profileFrameState');
      if (savedStateJSON) {
        const savedState = JSON.parse(savedStateJSON);
        if (savedState.imageSrc) {
          initialImageSrc = savedState.imageSrc;
          setImageSrc(initialImageSrc);
        }
        if (savedState.options) {
          initialOptions = { ...initialOptions, ...savedState.options }; 
          setOptions(initialOptions);
        }
        lastSavedStateRef.current = savedState;
      } else {
        lastSavedStateRef.current = { imageSrc: initialImageSrc, options: initialOptions };
      }
    } catch (error) {
      console.error("Failed to load state from localStorage", error);
      lastSavedStateRef.current = { imageSrc: initialImageSrc, options: initialOptions };
    }
  }, []); 

  useEffect(() => {
    if (lastSavedStateRef.current === null) return;
    
    const currentState = { imageSrc, options };
    const savedState = lastSavedStateRef.current;
    
    const isStateDirty = JSON.stringify(currentState) !== JSON.stringify(savedState);
    setIsDirty(isStateDirty);

  }, [imageSrc, options]);

  const handleOptionsChange = useCallback((newOptions: Partial<FrameOptions>) => {
    setOptions(prev => {
      const updatedOptions = { ...prev, ...newOptions };
      return updatedOptions;
    });
  }, []);

  const handleImageUpload = useCallback((dataUrl: string) => {
    setImageSrc(dataUrl);
    handleOptionsChange({
        imageX: 0,
        imageY: 0,
        imageScale: 1,
    });
    setIsUploaderOpen(false);
  }, [handleOptionsChange]);
  
  const handleRemoveImage = useCallback(() => {
    setImageSrc(defaultImage);
    handleOptionsChange({
        imageX: 0,
        imageY: 0,
        imageScale: 1,
    });
  }, [handleOptionsChange]);

  const handleDownload = useCallback(() => {
    if (!imageSrc) {
        alert("Please upload an image first.");
        return;
    }

    const tempCanvas = document.createElement('canvas');
    const DOWNLOAD_SIZE = 1000; 

    const img = new Image();
    img.crossOrigin = 'anonymous'; 
    img.src = imageSrc;

    img.onload = () => {
        const drawingErrorCallback = (message: string) => {
            console.error("Download canvas drawing error:", message);
            alert("Failed to prepare image for download: " + message);
        };
        drawProfileFrame(tempCanvas, img, options, DOWNLOAD_SIZE, drawingErrorCallback);

        const link = document.createElement('a');
        link.download = 'profile-with-frame.png';
        link.href = tempCanvas.toDataURL('image/png'); 
        link.click();
    };

    img.onerror = () => {
        console.error("Failed to load image for download: ", imageSrc);
        alert("Could not load image for download. Please try again or try a different image.");
    };
  }, [imageSrc, options]);

  const handleSave = useCallback(() => {
    if (!isDirty) return;
    try {
      const stateToSave = { imageSrc, options };
      localStorage.setItem('profileFrameState', JSON.stringify(stateToSave));
      lastSavedStateRef.current = stateToSave;
      setIsDirty(false);
    } catch (error) {
      console.error("Failed to save state to localStorage", error);
      alert('Could not save your settings. Local storage might be full or disabled.');
    }
  }, [imageSrc, options, isDirty]);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault();
        if (isDirty) {
          handleSave();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDirty, handleSave]);

  return (
    <div className="h-screen p-4 flex flex-col">
      <main className="w-full max-w-6xl mx-auto bg-slate-800 rounded-2xl shadow-2xl animate-fade-in flex-grow flex flex-col overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8 flex justify-between items-center border-b border-slate-700/50 flex-shrink-0">
           <a href="#/" className="flex items-center" aria-label="Back to BoostedIn Home Page">
              <Logo />
              <span className="ml-3 text-2xl font-bold text-white">
                Boosted<span className="text-indigo-400">In</span>
              </span>
          </a>
          <Auth user={user} onLogin={onLogin} onLogout={onLogout} />
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-5 flex-grow overflow-hidden">
          <div className="lg:col-span-2 p-8 flex flex-col order-2 lg:order-1 overflow-y-auto">
            <div className="flex-grow">
              <Controls 
                options={options} 
                onOptionsChange={handleOptionsChange} 
                onDownload={handleDownload} 
                onSave={handleSave}
                isSaveDisabled={!isDirty}
                imageSrc={imageSrc}
                onOpenUploader={() => setIsUploaderOpen(true)}
                onRemoveImage={handleRemoveImage}
              />
            </div>
            <Footer route="#/tools/frame-generator" />
          </div>
          <div className="lg:col-span-3 bg-slate-900/50 p-8 flex flex-col items-center justify-center order-1 lg:order-2">
            <ImageCanvas 
              imageSrc={imageSrc} 
              options={options} 
              canvasRef={canvasRef} 
              onOptionsChange={handleOptionsChange} 
            />
          </div>
        </div>
      </main>
      {isUploaderOpen && (
        <FileUpload 
          user={user}
          onImageUpload={handleImageUpload} 
          onClose={() => setIsUploaderOpen(false)} 
        />
      )}
    </div>
  );
};

export default FrameGenerator;
