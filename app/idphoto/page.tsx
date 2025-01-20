'use client';

import React, { useState, useRef, useCallback, useEffect, useMemo, lazy, Suspense } from 'react';
import 'cropperjs/dist/cropper.css';
import '../globals.css';
import './idphoto.css';
import { ErrorBoundary } from 'react-error-boundary';
import { ChevronDown } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import outline from '../../public/outline.png';
import type { ImageInfo, CropData, ScaleFactors } from '@/types';
import type { ReactCropperElement } from 'react-cropper';
import { imageProcessor } from '../../utils/imageProcessor';
import { aspectRatioOptions, presetColors } from '../../constants';
import { intelligentCrop } from '../../utils/intelligentCrop';

const CropperComponent = lazy(() =>
    import('react-cropper').then((module) => ({ default: module.default }))
);

function ErrorFallback({ error }: { error: Error }) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
        </div>
    );
}

export default function App() {
    const [image, setImage] = useState<string | null>(null);
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [correctionImage, setCorrectionImage] = useState<string | null>(null);
    const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [processingMessage, setProcessingMessage] = useState<string>('');
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [imageKey, setImageKey] = useState<number>(0);
    const [cropperKey, setCropperKey] = useState<number>(0);
    const cropperRef = useRef<ReactCropperElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const lastProcessedImageData = useRef<ImageInfo | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const scaleRef = useRef<ScaleFactors>({ scaleX: 1, scaleY: 1 });
    const [isScaleInitialized, setIsScaleInitialized] = useState(false);
    const isDevelopmentMode = process.env.NODE_ENV !== 'production';
    const [isCropperReady, setIsCropperReady] = useState(false);
    const [cropperCanvasScale, setCropperCanvasScale] = useState({ scaleX: 1, scaleY: 1 });
    const [selectedAspectRatio, setSelectedAspectRatio] = useState<number>(3 / 4);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const cropperSectionRef = useRef<HTMLDivElement | null>(null);
    const aspectRatioTitleRef = useRef<HTMLHeadingElement | null>(null); // 新增标题元素的 ref
    const [isLoading, setIsLoading] = useState(true); // 添加加载状态

    useEffect(() => {
        if (!canvasRef.current) {
            canvasRef.current = document.createElement('canvas') as HTMLCanvasElement;
        }
        if (typeof window !== 'undefined') {
            imageRef.current = new window.Image();
        }
        setIsLoading(false); // 初始加载完成
    }, []);

    const performIntelligentCrop = useCallback(() => {
        if (!imageRef.current?.src || !isScaleInitialized || !isCropperReady || !cropperRef.current?.cropper) return;

        const img = imageRef.current;
        const cropper = cropperRef.current.cropper;
        if (!img || !cropper) return;

        const autoCropData = intelligentCrop(
            img,
            selectedAspectRatio,
            scaleRef.current.scaleX,
            scaleRef.current.scaleY,
            canvasRef.current,
            isDevelopmentMode
        );

        const canvasData = cropper.getCanvasData();
        const scaledCropData = {
            left: autoCropData.left * (canvasData.width / img.naturalWidth),
            top: autoCropData.top * (canvasData.height / img.naturalHeight),
            width: autoCropData.width * (canvasData.width / img.naturalWidth),
            height: autoCropData.height * (canvasData.height / img.naturalHeight),
        };

        cropper.setCropBoxData(scaledCropData);
    }, [isScaleInitialized, isCropperReady, selectedAspectRatio, isDevelopmentMode]);

    const handleAspectRatioChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const newAspectRatio = parseFloat(event.target.value);
        setSelectedAspectRatio(newAspectRatio);
        setCropperKey(prevKey => prevKey + 1);

        requestAnimationFrame(() => {
            setTimeout(performIntelligentCrop, 100);
        });
    }, [performIntelligentCrop]);

    const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsProcessing(true);
            setProcessingMessage('Processing image');
            await imageProcessor({
                file,
                setImage,
                setProcessedImage,
                setCroppedImage,
                setIsProcessing,
                setProcessingMessage,
                setShowSuccessMessage,
                setImageKey,
                setCorrectionImage,
                imageRef,
                cropperRef,
                canvasRef,
                scaleRef,
                selectedAspectRatio,
                isDevelopmentMode,
                setIsScaleInitialized,
                setIsCropperReady,
                intelligentCrop,
                // disableMultithreading: true, // 禁用多线程
            });
            // 上传成功后滚动到 "Select Aspect Ratio" 标题
            if (aspectRatioTitleRef.current) {
                // 确保目标元素滚动到屏幕顶部
                requestAnimationFrame(() => {
                    console.log('Scroll top before:', window.scrollY);
                    aspectRatioTitleRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',  // 保证元素位于屏幕顶部
                    });
                    // 调试滚动位置
                    setTimeout(() => {
                        console.log('Scroll top after:', window.scrollY);
                    }, 500);

                    // 可选：你可以通过设置延时来确保标题完全加载并显示在屏幕顶部
                    setTimeout(() => {
                        window.scrollBy(0, -20); // 如果需要，微调滚动位置
                    }, 500);
                });
            }
        } catch (error) {
            console.error('Image processing error:', error);
            setIsProcessing(false);
            setProcessingMessage('Image processing failed');
            setImage(null);
            setProcessedImage(null);
            setCroppedImage(null);
            setCorrectionImage(null);
            setIsCropperReady(false);
        }

    }, [imageProcessor, selectedAspectRatio, isDevelopmentMode, intelligentCrop]);

    const handleCropChange = useCallback(() => {
        if (!cropperRef.current?.cropper || !image) {
            console.warn('Cropper or image not ready for crop change');
            return;
        }
        try {
            const cropper = cropperRef.current.cropper;
            const croppedCanvas = cropper.getCroppedCanvas();
            const croppedImageDataURL = croppedCanvas.toDataURL('image/png');
            setCorrectionImage(croppedImageDataURL);

            const img = typeof window !== 'undefined' ? new window.Image() : null;
            if (!img) {
                console.error('Cannot create Image object');
                return;
            }
            img.onload = () => {
                const canvas = canvasRef.current;
                if (!canvas) {
                    console.error('Canvas element not found');
                    return;
                }
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    console.error('2D rendering context not found');
                    return;
                }

                ctx.fillStyle = lastProcessedImageData.current?.backgroundColor || backgroundColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
                const finalImageDataURL = canvas.toDataURL('image/png');
                setCroppedImage(finalImageDataURL);
            };
            img.onerror = (error) => {
                console.error('Error loading cropped image', error);
                setProcessingMessage('Error loading cropped image');
            };
            img.src = croppedImageDataURL;
        } catch (error: any) {
            console.error('Error updating preview:', error);
            setProcessingMessage('Error updating preview.');
        }
    }, [image, backgroundColor]);

    const handleDownload = useCallback(async () => {
        if (!croppedImage) return;

        try {
            const response = await fetch(croppedImage);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'id-photo.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error: any) {
            console.error('Error downloading image:', error);
            setProcessingMessage('Download failed, please try again');
            setTimeout(() => {
                setProcessingMessage('');
            }, 3000);
        }
    }, [croppedImage]);

    const handleBackgroundChange = useCallback(async (color: string) => {
        if (!image || !cropperRef.current?.cropper) return;
        try {
            setIsProcessing(true);
            setProcessingMessage('Changing background color');
            setBackgroundColor(color);

            const cropper = cropperRef.current.cropper;
            const croppedCanvas = cropper.getCroppedCanvas({
                width: cropper.getImageData().naturalWidth,
                height: cropper.getImageData().naturalHeight,
            });
            const canvas = canvasRef.current;
            if (!canvas) {
                console.error('Canvas element not found');
                return;
            }
            canvas.width = croppedCanvas.width;
            canvas.height = croppedCanvas.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                console.error('2D rendering context not found');
                return;
            }

            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(croppedCanvas, 0, 0);
            const newImageDataURL = canvas.toDataURL('image/png');
            setProcessedImage(newImageDataURL);
            setCroppedImage(newImageDataURL);

            lastProcessedImageData.current = {
                ...lastProcessedImageData.current,
                dataURL: newImageDataURL,
                width: canvas.width,
                height: canvas.height,
                aspectRatio: canvas.width / canvas.height,
                backgroundColor: color
            };

            setProcessingMessage('Processing complete');
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        } catch (error: any) {
            console.error('Background change error:', error);
            setProcessingMessage('Background change error.');
        } finally {
            setIsProcessing(false);
        }
    }, [image]);

    useEffect(() => {
        if (isDevelopmentMode) {
            console.log('Image state changed:', {
                image,
                imageRefCurrent: imageRef.current,
                imageRefSrc: imageRef.current?.src
            });
        }

        if (image && isScaleInitialized && isCropperReady) {
            try {
                const img = imageRef.current;
                if (!img) {
                    console.warn('Image element not initialized');
                    return;
                }
                img.src = image;
                img.onload = () => {
                    setTimeout(() => {
                        if (cropperRef.current?.cropper) {
                            if (isDevelopmentMode) {
                                console.log('Cropper Data before intelligentCrop (useEffect):', {
                                    imageData: cropperRef.current.cropper.getImageData(),
                                    canvasData: cropperRef.current.cropper.getCanvasData(),
                                    scaleRef: scaleRef.current
                                });
                            }
                            performIntelligentCrop();
                            if (isDevelopmentMode) {
                                console.log('Cropper Box Data after setCropBoxData in useEffect:', cropperRef.current.cropper.getCropBoxData());
                            }
                        }
                    }, 100);
                };

                img.onerror = (error) => {
                    console.error('Image load error:', error);
                    setProcessingMessage('Failed to load image.');
                    setTimeout(() => {
                        setProcessingMessage('');
                    }, 3000);
                    setImage(null);
                    setProcessedImage(null);
                    setCroppedImage(null);
                    setCorrectionImage(null);
                    setIsCropperReady(false);
                };
            } catch (error) {
                console.error('Image processing error:', error);
                setProcessingMessage('Failed to process image.');
                setTimeout(() => {
                    setProcessingMessage('');
                }, 3000);
                setImage(null);
                setProcessedImage(null);
                setCroppedImage(null);
                setCorrectionImage(null);
                setIsCropperReady(false);
            }
        }
    }, [image, isScaleInitialized, selectedAspectRatio, isDevelopmentMode, isCropperReady, performIntelligentCrop]);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    useEffect(() => {
        if (aspectRatioTitleRef.current) {
            console.log('aspectRatioTitleRef is bound to:', aspectRatioTitleRef.current);
            console.log('aspectRatioTitleRef current node:', aspectRatioTitleRef.current);
        } else {
            console.log('aspectRatioTitleRef is not bound');
        }
    }, [image]);

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div className="app">
                <header className="header">
                    <h1>ID Photo Generator</h1>
                    <p>Create professional ID photos with automatic background removal</p>
                </header>
                <div className="process-steps">
                    <div className={`process-step ${image ? 'completed' : 'active'}`}>
                        <div className="process-step-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                        </div>
                        <div className="process-step-label">Upload</div>
                    </div>
                    <div className={`process-step ${croppedImage ? 'completed' : (image ? 'active' : '')}`}>
                        <div className="process-step-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                            </svg>
                        </div>
                        <div className="process-step-label">Crop</div>
                    </div>
                    <div className={`process-step ${backgroundColor !== '#ffffff' ? 'completed' : (croppedImage ? 'active' : '')}`}>
                        <div className="process-step-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        </div>
                        <div className="process-step-label">Background</div>
                    </div>
                    <div className={`process-step ${croppedImage && backgroundColor !== '#ffffff' ? 'completed' : ''}`}>
                        <div className="process-step-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        </div>
                        <div className="process-step-label">Download</div>
                    </div>
                </div>
                <div className="upload-section">
                    {/* 移除 file-input-wrapper */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="file-input"
                        disabled={isProcessing}
                        ref={fileInputRef} // 添加 ref
                        style={{ display: 'none' }} // 隐藏 input 元素
                    />
                    <div className="flex flex-col items-center">
                        <button
                            className={`upload-button ${isProcessing ? 'disabled' : ''} ${isProcessing ? 'loading-button' : ''}`}
                            onClick={handleButtonClick} // 添加点击事件
                            disabled={isProcessing}
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            {isProcessing ? 'Processing' : 'Upload photo'}
                        </button>
                        <div className="text-sm text-muted-foreground mt-2 text-center">
                            <p className="font-semibold">Photo Requirements:</p>
                            <ul className="list-disc pl-4 text-left">
                                <li>Front-facing portrait</li>
                                <li>Plain light-colored background</li>
                                <li>No hats or sunglasses</li>
                                <li>Neutral expression</li>
                            </ul>
                        </div>
                    </div>
                    {showSuccessMessage && (
                        <div className="success-message">
                            Image uploaded successfully!
                        </div>
                    )}
                </div>
                <div className="aspect-ratio-selector flex items-center justify-center gap-2 w-full">
                    <h3 className="text-center" ref={aspectRatioTitleRef}>Select Aspect Ratio</h3>
                    <div className="aspect-ratio-select">

                        <Select
                        value={selectedAspectRatio.toString()}
                        onValueChange={(value) => {
                            setSelectedAspectRatio(parseFloat(value));
                            setCropperKey(prevKey => prevKey + 1);
                            setTimeout(performIntelligentCrop, 100);
                        }}
                        >
                        <SelectTrigger className="w-[200px] text-center">
                            <SelectValue placeholder="Select ratio" />
                        </SelectTrigger>
                        <SelectContent className="text-center">
                            {aspectRatioOptions.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value.toString()}
                                className="text-center"
                            >
                                {option.label}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>

                        <div className="aspect-ratio-tooltip">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Aspect Ratio</th>
                                        <th>Example Photo Size</th>
                                        <th>Common Uses</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1:1</td>
                                        <td>2x2 inches (51x51mm)</td>
                                        <td>Passport photos for US, UK; Social media profile pictures</td>
                                    </tr>
                                    <tr>
                                        <td>2:3</td>
                                        <td>2x3 inches (51x76mm)</td>
                                        <td>ID photos for France, Spain; Standard photo prints</td>
                                    </tr>
                                    <tr>
                                        <td>3:4</td>
                                        <td>3x4 inches (76x102mm)</td>
                                        <td>Passport photos for Germany, Netherlands; Visa applications</td>
                                    </tr>
                                    <tr>
                                        <td>4:3</td>
                                        <td>4x3 inches (102x76mm)</td>
                                        <td>Driver's license photos in some US states; Digital camera standard</td>
                                    </tr>
                                    <tr>
                                        <td>5:7</td>
                                        <td>2.5x3.5 inches (64x89mm)</td>
                                        <td>Certain professional ID cards in European countries</td>
                                    </tr>
                                    <tr>
                                        <td>7:9</td>
                                        <td>2.8x3.5 inches (71x89mm)</td>
                                        <td>Specific ID requirements in Japan, South Korea</td>
                                    </tr>
                                    <tr>
                                        <td>9:7</td>
                                        <td>3.5x2.8 inches (89x71mm)</td>
                                        <td>Some Asian countries' residence permit photos</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {image && (
                    <div className="editor-container">
                        <div className={`processing-overlay ${isProcessing ? 'visible' : ''}`}>
                            <div className="loading-spinner">
                                <div className="spinner-circle"></div>
                                <div className="spinner-text">{processingMessage}</div>
                            </div>
                        </div>
                        <div className="cropper-section" ref={cropperSectionRef}>
                            <Suspense fallback={<div>Loading Cropper...</div>}>
                                <CropperComponent
                                    key={cropperKey}
                                    src={image}
                                    aspectRatio={selectedAspectRatio}
                                    guides={true}
                                    ref={cropperRef}
                                    zoomable={false}
                                    zoomOnWheel={false}
                                    crop={handleCropChange}
                                    minCropBoxWidth={100}
                                    minCropBoxHeight={100}
                                    autoCropArea={1}
                                    viewMode={1}
                                    onInitialized={() => {
                                        setIsCropperReady(true);
                                        if (cropperRef.current?.cropper && isDevelopmentMode) {
                                            console.log('Cropper Initialized:', {
                                                imageData: cropperRef.current.cropper.getImageData(),
                                                canvasData: cropperRef.current.cropper.getCanvasData(),
                                                cropBoxData: cropperRef.current.cropper.getCropBoxData(),
                                                scaleRef: scaleRef.current
                                            });

                                            const canvasData = cropperRef.current.cropper.getCanvasData();
                                            if (imageRef.current) {
                                                setCropperCanvasScale({
                                                    scaleX: canvasData.width / imageRef.current.naturalWidth,
                                                    scaleY: canvasData.height / imageRef.current.naturalHeight,
                                                });
                                            }
                                        }
                                    }}
                                />
                            </Suspense>
                        </div>
                        <div className="correction-section" data-label="Correction">
                            {correctionImage && (
                                <div className="image-container">
                                    <img
                                        src={correctionImage}
                                        alt="Correction image"
                                        className="image-base"
                                        style={{ display: isProcessing && !correctionImage ? 'none' : 'block' }}
                                    />
                                    <div className="image-overlay">
                                        <img
                                            src={outline.src}
                                            alt="Outline"
                                            style={{
                                                opacity: 0.5,
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'fill',
                                                objectPosition: 'center',
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        {(croppedImage || processedImage || image) && (
                            <div className="preview-section" data-label="Preview">
                                <div className="image-container">
                                    <img
                                        key={imageKey}
                                        src={croppedImage || processedImage || image}
                                        alt="Processed image"
                                        onError={(e) => {
                                            if (e.target instanceof HTMLImageElement) {
                                                e.target.src = '';
                                            }
                                        }}
                                        className="image-base"
                                        style={{
                                            display: isProcessing && !(croppedImage || processedImage || image) ? 'none' : 'block',
                                        }}
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {croppedImage && (
                    <div className="background-selector">
                        <h3>Select background color</h3>
                        <div className="color-buttons">
                            {presetColors.map((color) => (
                                <button
                                    key={color.value}
                                    className={`color-button ${backgroundColor === color.value ? 'selected' : ''}`}
                                    data-color={color.name}
                                    style={{
                                        backgroundColor: color.value,
                                        color: color.name.startsWith('Light') || color.name === 'White' ? 'black' : 'white',
                                    }}
                                    onClick={() => handleBackgroundChange(color.value)}
                                    disabled={isProcessing}
                                >
                                    {color.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {croppedImage && (
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <button
                            onClick={handleDownload}
                            className={`button button-primary ${isProcessing ? 'loading-button' : ''}`}
                            disabled={isProcessing}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ marginRight: '0.5rem' }}
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download photo
                        </button>
                    </div>
                )}
            </div>
        </ErrorBoundary>
    );
}
