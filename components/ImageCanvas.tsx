import React, { useEffect, useState, useRef } from 'react';
import type { FrameOptions } from '../types';
import { drawProfileFrame } from '../utils/canvasDraw';

interface ImageCanvasProps {
  imageSrc: string | null;
  options: FrameOptions;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onOptionsChange: (newOptions: Partial<FrameOptions>) => void;
}

const ImageCanvas: React.FC<ImageCanvasProps> = ({ imageSrc, options, canvasRef, onOptionsChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, imageX: 0, imageY: 0 });
  const [loadedImageElement, setLoadedImageElement] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!imageSrc) {
      setLoadedImageElement(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous'; 
    img.src = imageSrc;

    img.onload = () => setLoadedImageElement(img);
    img.onerror = () => {
      console.error("Failed to load image for canvas display: ", imageSrc);
      setLoadedImageElement(null);
    };
  }, [imageSrc]);


  const getPointerPosition = (e: MouseEvent | TouchEvent) => {
    if ('touches' in e) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!imageSrc) return;
    e.preventDefault();
    setIsDragging(true);
    const pos = getPointerPosition(e.nativeEvent);
    dragStartRef.current = {
      x: pos.x,
      y: pos.y,
      imageX: options.imageX,
      imageY: options.imageY,
    };
  };

  useEffect(() => {
    const handleDragMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault(); 
      
      const pos = getPointerPosition(e);
      const dx = pos.x - dragStartRef.current.x;
      const dy = pos.y - dragStartRef.current.y;
      
      const canvas = canvasRef.current;
      if (!canvas) return;

      const canvasRect = canvas.getBoundingClientRect();
      const canvasWidth = canvasRect.width;
      const canvasHeight = canvasRect.height;

      const newImageX = dragStartRef.current.imageX + (dx / canvasWidth) * 100;
      const newImageY = dragStartRef.current.imageY + (dy / canvasHeight) * 100;
      
      onOptionsChange({
        imageX: newImageX,
        imageY: newImageY,
      });
    };

    const handleDragEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    }
  }, [isDragging, onOptionsChange, canvasRef]);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const drawingErrorCallback = (message: string) => {
        console.error("Canvas drawing error:", message);
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#334155";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "white";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const errorFontSize = canvas.width * (60 / 500);
            ctx.font = `600 ${errorFontSize}px sans-serif`;
            ctx.fillText("Drawing Error", canvas.width / 2, canvas.height / 2);
        }
    };

    drawProfileFrame(canvas, loadedImageElement, options, 500, drawingErrorCallback);
  }, [loadedImageElement, options, canvasRef]); 

  return (
    <div 
      className={`relative w-full max-w-md aspect-square rounded-full shadow-lg bg-slate-700 overflow-hidden ${imageSrc ? 'cursor-move' : ''}`}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
        <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default ImageCanvas;