import type { FrameOptions } from '../types';

const hexToRgba = (hex: string, opacity: number): string => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex.substring(5, 7), 16);
    } else if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
};

const getCssFilter = (filterName: string): string => {
    switch (filterName) {
        case 'grayscale': return 'grayscale(100%)';
        case 'sepia': return 'sepia(100%)';
        case 'vivid': return 'saturate(1.5)';
        case 'sharp': return 'contrast(1.4)';
        case 'invert': return 'invert(100%)';
        default: return 'none';
    }
}

export const drawProfileFrame = (
    canvas: HTMLCanvasElement,
    imageElement: HTMLImageElement | null,
    options: FrameOptions,
    targetSize: number, 
    onError: (message: string) => void,
) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        onError("Could not get 2D context for canvas.");
        return;
    }

    canvas.width = targetSize;
    canvas.height = targetSize;
    const center = targetSize / 2;
    const outerRadius = center;

    const fontSizePx = targetSize * (options.fontSize / 1000);
    ctx.font = `700 ${fontSizePx}px ${options.font}`;

    const frameWidth = outerRadius * (options.frameThickness / 100);

    ctx.clearRect(0, 0, targetSize, targetSize);

    ctx.save();
    ctx.beginPath();
    ctx.arc(center, center, outerRadius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    ctx.filter = getCssFilter(options.filter);

    if (imageElement) {
        const aspectRatio = imageElement.width / imageElement.height;
        let baseWidth = targetSize;
        let baseHeight = baseWidth / aspectRatio;
        if (baseHeight < targetSize) {
            baseHeight = targetSize;
            baseWidth = baseHeight * aspectRatio;
        }
        const drawWidth = baseWidth * options.imageScale;
        const drawHeight = baseHeight * options.imageScale;
        const panX = (targetSize / 100) * options.imageX;
        const panY = (targetSize / 100) * options.imageY;
        const offsetX = center - drawWidth / 2 + panX;
        const offsetY = center - drawHeight / 2 + panY;
        ctx.drawImage(imageElement, offsetX, offsetY, drawWidth, drawHeight);
    } else {
        ctx.fillStyle = "#334155"; 
        ctx.fillRect(0, 0, targetSize, targetSize);
        ctx.fillStyle = "white";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const placeholderFontSize = targetSize * (60 / 500); 
        ctx.font = `600 ${placeholderFontSize}px sans-serif`;
        ctx.fillText("No image selected", center, center);
    }

    ctx.restore(); 

    const textRadius = outerRadius - frameWidth / 2;

    const totalMeasuredWidth = ctx.measureText(options.text).width;
    const totalSpacing = options.text.length > 1 ? options.letterSpacing * (options.text.length - 1) : 0;
    const totalTextWidth = totalMeasuredWidth + totalSpacing;
    const totalArc = options.text.length > 0 ? totalTextWidth / textRadius : 0;

    const centerAngle = (options.textRotation - 90) * Math.PI / 180;

    if (frameWidth > 0) {
        ctx.beginPath();
        ctx.arc(center, center, textRadius, 0, Math.PI * 2);
        ctx.lineWidth = frameWidth;

        const gradient = ctx.createConicGradient(centerAngle, center, center);

        const colorStartWithAlpha = hexToRgba(options.frameColorStart, 100);
        const colorEndWithAlpha = hexToRgba(options.frameColorStart, 0);

        if (options.text.length > 0) {
            const textArcInStop = totalArc / (Math.PI * 2);
            const solidExtent = textArcInStop / 2;
            const fadeDuration = 0.05;
            const fadeEnd = solidExtent + fadeDuration; 

            if (solidExtent + fadeDuration < 0.5) {
                gradient.addColorStop(0, colorStartWithAlpha);
                gradient.addColorStop(solidExtent, colorStartWithAlpha);
                gradient.addColorStop(fadeEnd, colorEndWithAlpha);
                gradient.addColorStop(1 - fadeEnd, colorEndWithAlpha);
                gradient.addColorStop(1 - solidExtent, colorStartWithAlpha);
                gradient.addColorStop(1, colorStartWithAlpha);
            } else {
                gradient.addColorStop(0, colorStartWithAlpha);
                gradient.addColorStop(1, colorStartWithAlpha);
            }
        } else {
            gradient.addColorStop(0, colorStartWithAlpha);
            gradient.addColorStop(0.5, colorEndWithAlpha);
            gradient.addColorStop(1, colorStartWithAlpha);
        }

        ctx.strokeStyle = gradient;
        ctx.stroke();
    }

    if (options.text.length > 0) {
        const displayText = options.text.split('').reverse().join('');
        ctx.fillStyle = options.textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const spacingArc = options.letterSpacing / textRadius;

        const isBottomHalf = centerAngle > 0 && centerAngle < Math.PI;

        if (isBottomHalf) {
            let currentAngle = centerAngle - (totalArc / 2);
            for (let i = 0; i < displayText.length; i++) {
                const char = displayText[i];
                const charWidth = ctx.measureText(char).width;
                const charArc = charWidth / textRadius;
                const angle = currentAngle + charArc / 2;
                const x = center + textRadius * Math.cos(angle);
                const y = center + textRadius * Math.sin(angle);

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle - Math.PI / 2);
                ctx.fillText(char, 0, 0);
                ctx.restore();

                currentAngle += charArc;
                if (i < displayText.length - 1) {
                    currentAngle += spacingArc;
                }
            }
        } else {
            let currentAngle = centerAngle + (totalArc / 2);
            for (let i = 0; i < displayText.length; i++) {
                const char = displayText[i];
                const charWidth = ctx.measureText(char).width;
                const charArc = charWidth / textRadius;
                const angle = currentAngle - charArc / 2;
                const x = center + textRadius * Math.cos(angle);
                const y = center + textRadius * Math.sin(angle);

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle + Math.PI / 2);
                ctx.fillText(char, 0, 0);
                ctx.restore();

                currentAngle -= charArc;
                if (i < displayText.length - 1) {
                    currentAngle -= spacingArc;
                }
            }
        }
    }
};