/**
 * Interactive Cursor-Tracking Character
 * Renders high-performance 60fps head/eye tracking using pre-rendered WebP frames.
 * Keeps projects isolated & runs locally with zero external dependencies.
 */
(function () {
    'use strict';

    const TOTAL_FRAMES = 64;
    const CROP_X = 280;
    const CROP_Y = 0;
    const CROP_SIZE = 720;
    const CHARACTER_SCALE = 0.78; // Keep circle large, scale character inside to 78%
    const FACE_X_PCT = 0.50;
    const FACE_Y_PCT = 0.41;
    const DEADZONE_PCT = 0.22;
    const LERP_FACTOR = 0.26; // ~35ms smooth responsiveness

    function lerpAngle(current, target, factor) {
        let diff = (target - current) % (2 * Math.PI);
        if (diff < -Math.PI) diff += 2 * Math.PI;
        if (diff > Math.PI) diff -= 2 * Math.PI;
        return current + diff * factor;
    }

    function angleToFrameIndex(angleRad, totalFrames) {
        let norm = angleRad % (2 * Math.PI);
        if (norm < 0) norm += 2 * Math.PI;
        return Math.round((norm / (2 * Math.PI)) * totalFrames) % totalFrames;
    }

    document.addEventListener('DOMContentLoaded', () => {
        const canvas = document.getElementById('cursor-character');
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let centerFrame = new Image();
        const frames = new Array(TOTAL_FRAMES);
        let loadedFramesCount = 0;
        let isCenterLoaded = false;
        let isVisible = true;
        let animationId = null;

        // Pointer state
        let mouseX = null;
        let mouseY = null;
        let isPointerActive = false;
        let smoothedAngle = 0;
        let idleTimer = null;

        // Preload Center Frame
        centerFrame.src = 'assets/frames/center.webp';
        centerFrame.onload = () => {
            isCenterLoaded = true;
            drawInitial();
        };

        // Preload 64 circular directional frames
        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            const padded = i.toString().padStart(2, '0');
            img.src = `assets/frames/frame_${padded}.webp`;
            img.onload = () => {
                loadedFramesCount++;
            };
            frames[i] = img;
        }

        function setPointerPos(x, y) {
            mouseX = x;
            mouseY = y;
            isPointerActive = true;

            if (idleTimer) clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                isPointerActive = false;
            }, 3000);
        }

        window.addEventListener('pointermove', (e) => {
            setPointerPos(e.clientX, e.clientY);
        }, { passive: true });

        window.addEventListener('touchstart', (e) => {
            if (e.touches && e.touches[0]) {
                setPointerPos(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (e.touches && e.touches[0]) {
                setPointerPos(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        window.addEventListener('touchend', () => {
            setTimeout(() => {
                isPointerActive = false;
            }, 1200);
        }, { passive: true });

        // High DPI resize handler
        function resizeCanvas() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = canvas.getBoundingClientRect();
            const w = Math.round(rect.width || 320);
            const h = Math.round(rect.height || 320);

            if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
                canvas.width = w * dpr;
                canvas.height = h * dpr;
            }
        }

        function drawInitial() {
            if (!isCenterLoaded) return;
            resizeCanvas();
            renderFrame(centerFrame);
        }

        function renderFrame(img) {
            if (!img || !img.complete || img.naturalWidth === 0) return;

            const w = canvas.width;
            const h = canvas.height;

            // Background fill
            ctx.fillStyle = '#0e0f13';
            ctx.fillRect(0, 0, w, h);

            // Circular clipping
            ctx.save();
            ctx.beginPath();
            ctx.arc(w / 2, h / 2, w / 2, 0, Math.PI * 2);
            ctx.clip();

            // Scale character inside circular canvas
            const drawSize = w * CHARACTER_SCALE;
            const drawX = (w - drawSize) / 2;
            const drawY = h - drawSize;

            ctx.drawImage(img, CROP_X, CROP_Y, CROP_SIZE, CROP_SIZE, drawX, drawY, drawSize, drawSize);
            ctx.restore();
        }

        // Animation Loop
        function animate() {
            if (!isVisible) {
                animationId = null;
                return;
            }

            resizeCanvas();

            const rect = canvas.getBoundingClientRect();
            const faceScreenX = rect.left + rect.width * 0.50;
            const faceScreenY = rect.top + rect.height * ((1 - CHARACTER_SCALE) + CHARACTER_SCALE * FACE_Y_PCT);

            const curX = mouseX !== null ? mouseX : faceScreenX;
            const curY = mouseY !== null ? mouseY : faceScreenY;

            const dx = curX - faceScreenX;
            const dy = curY - faceScreenY;
            const distance = Math.hypot(dx, dy);
            const deadzoneThreshold = rect.width * DEADZONE_PCT;

            let imageToDraw = centerFrame;

            if (isPointerActive && distance >= deadzoneThreshold) {
                const targetAngle = Math.atan2(dy, dx);
                smoothedAngle = lerpAngle(smoothedAngle, targetAngle, LERP_FACTOR);
                const frameIndex = angleToFrameIndex(smoothedAngle, TOTAL_FRAMES);
                const chosen = frames[frameIndex];
                if (chosen && chosen.complete && chosen.naturalWidth > 0) {
                    imageToDraw = chosen;
                }
            }

            renderFrame(imageToDraw);
            animationId = requestAnimationFrame(animate);
        }

        // Visibility observer for performance
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    isVisible = entry.isIntersecting;
                    if (isVisible && !animationId) {
                        animationId = requestAnimationFrame(animate);
                    }
                });
            }, { threshold: 0.05 });
            observer.observe(canvas);
        } else {
            animationId = requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resizeCanvas, { passive: true });
        window.addEventListener('orientationchange', resizeCanvas);
    });
})();
