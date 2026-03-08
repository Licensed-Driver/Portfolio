import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { motion, useMotionValue, useDragControls } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
  desktopRef: React.RefObject<HTMLDivElement | null>;
}

export function Window({
  title,
  isOpen,
  isMinimized,
  isMaximized,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children,
  desktopRef
}: WindowProps) {
  if (!isOpen) return null;

  const width = useMotionValue(850);
  const height = useMotionValue(600);
  const left = useMotionValue(20);
  const top = useMotionValue(20);

  const controls = useDragControls();

  const min_w = 850;
  const min_h = 600;
  const [maxDims, setMaxDims] = useState({width: 0, height: 0});

  const start = useRef({ w: 0, h: 0, l: 0, t: 0 });
  const posMem = useRef({ w: 0, h: 0, l: 0, t: 0 })

  useLayoutEffect(() => {
    if (!desktopRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setMaxDims({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });

    observer.observe(desktopRef.current);
    return () => observer.disconnect();
  }, [isMaximized, ]);

  useEffect(() => {
    if (isMaximized) {
      posMem.current = {
        w: width.get(),
        h: height.get(),
        l: left.get(),
        t: top.get()
      }
      left.set(0)
      top.set(0)
      width.set(maxDims.width)
      height.set(maxDims.height)
    } else {
      left.set(posMem.current.l)
      height.set(posMem.current.h)
      top.set(posMem.current.t)
      width.set(posMem.current.w)
    }
  }, [isMaximized])

  // Set the initial window positions
  const handlePanStart = () => {
    if(isMaximized) return;
    start.current = {
      w: width.get(),
      h: height.get(),
      l: left.get(),
      t: top.get()
    };
  };

  const setWindow = function (l = 0, r = 0, t = 0, b = 0) {
    if(isMaximized) return;
    const target_w = start.current.w - l + r;
    const target_h = start.current.h - t + b;

    const new_w = Math.max(min_w, target_w);
    const new_h = Math.max(min_h, target_h);

    const deficit_w = new_w - target_w; 
    const deficit_h = new_h - target_h;

    const new_l = start.current.l + l - (l !== 0 ? deficit_w : 0);
    const new_t = start.current.t + t - (t !== 0 ? deficit_h : 0);

    width.set(new_w);
    left.set(new_l);
    height.set(new_h);
    top.set(new_t);
  };

  return (
    <motion.div
      drag
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={false}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: isMinimized ? 0 : 1, 
        scale: isMinimized ? 0.8 : 1
      }}
      style={{
        x:left,
        y:top,
        width:width,
        height:height,
        zIndex:zIndex,
        touchAction: 'auto'
      }}
      onPointerDownCapture={onFocus}
      className={`absolute flex flex-col border border-white/30 overflow-hidden will-change-transform ${
        isMaximized 
          ? 'top-0 w-full h-[calc(100vh-80px)] rounded-none bg-transparent'
          : `top-20 max-w-[90vw] rounded-xl bg-transparent shadow-2xl`
      }`}
    >
      {/* Right Edge */}
      <motion.div className="absolute right-0 top-0 bottom-0 w-2 cursor-e-resize z-50 select-none"
        onPan={(_e, info) => {
          setWindow(0, info.offset.x, 0, 0)
        }}
        onPanStart={() => {
          handlePanStart()
        }}
      />
      {/* Bottom Edge */}
      <motion.div className="absolute bottom-0 left-0 right-0 h-2 cursor-s-resize z-50 select-none"
        onPan={(_, info) => {
          setWindow(0, 0, 0, info.offset.y)
        }}
        onPanStart={() => {
          handlePanStart()
        }}
      />
      {/* Bottom-Right Corner */}
      <motion.div className="absolute right-0 bottom-0 w-4 h-4 cursor-se-resize z-50 select-none"
        onPan={(_, info) => {
          setWindow(0, info.offset.x, 0, info.offset.y)
        }}
        onPanStart={() => {
          handlePanStart()
        }}
      />
      {/* Left Edge */}
      <motion.div className='absolute left-0 top-0 bottom-0 w-2 cursor-e-resize z-50 select-none'
        onPan={(_, info) => {
          setWindow(info.offset.x, 0, 0, 0)
        }}
        onPanStart={() => {
          handlePanStart()
        }}
      />
      {/* Bottom-Left Corner */}
      <motion.div className="absolute left-0 bottom-0 w-4 h-4 cursor-sw-resize z-50 select-none"
        onPan={(_, info) => {
          setWindow(info.offset.x, 0, 0, info.offset.y)
        }}
        onPanStart={() => {
          handlePanStart()
        }}
      />
      {/* Top Edge */}
      <motion.div className="absolute top-0 left-0 right-0 h-2 cursor-s-resize z-50 select-none"
        onPan={(_, info) => {
          setWindow(0, 0, info.offset.y, 0)
        }}
        onPanStart={() => {
          handlePanStart()
        }}
      />
      {/* Top-Left Corner */}
      <motion.div className="absolute left-0 top-0 w-4 h-4 cursor-se-resize z-50 select-none"
        onPan={(_, info) => {
          setWindow(info.offset.x, 0, info.offset.y, 0)
        }}
        onPanStart={() => {
          handlePanStart()
        }}
      />
      {/* Top-Right Corner */}
      <motion.div className="absolute right-0 top-0 w-4 h-4 cursor-sw-resize z-50 select-none"
        onPan={(_, info) => {
          setWindow(0, info.offset.x, info.offset.y, 0)
        }}
        onPanStart={() => {
          handlePanStart()
        }}
      />
      {/* Title bar for dragging when click/drag action happens inside */}
      {/* onPointerDownCapture used to stop event prop because motion.div bypasses react and executes events before bubbling back up fully, so we gotta stop it before bubbling starts */}
      <div 
        className="h-10 border-b border-white/20 flex items-center px-4 bg-white/40 select-none z-10 cursor-default backdrop-blur-sm"
        onPointerDown={(e) => {
          if (!isMaximized) {
             controls.start(e);
          }
        }}
      >
        {/* Traffic Lights */}
        <div className="flex items-center gap-2 w-20">
          <button 
            onClick={onClose}
            onPointerDownCapture={(e) => e.stopPropagation()}
            className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 border border-black/10 flex items-center justify-center group"
          >
             <X className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 text-black/50" />
          </button>
          <button 
            onClick={onMinimize}
            onPointerDownCapture={(e) => e.stopPropagation()}
            className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 border border-black/10 flex items-center justify-center group"
          >
             <Minus className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 text-black/50" />
          </button>
          <button 
            onClick={onMaximize}
            onPointerDownCapture={(e) => e.stopPropagation()}
            className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-600 border border-black/10 flex items-center justify-center group"
          >
             <Square className="w-2 h-2 opacity-0 group-hover:opacity-100 text-black/50" />
          </button>
        </div>
        
        {/* Title */}
        <div className="flex-1 text-center font-medium text-gray-700 text-sm">
          {title}
        </div>
        
        <div className="w-20"></div>
      </div>

      {/* Content Area */}
      <div 
        className="flex-1 overflow-hidden relative cursor-auto bg-white select-auto"
        onPointerDownCapture={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
