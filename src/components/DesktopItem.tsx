import React from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

interface DesktopItemProps {
  title: string;
  icon: React.ReactNode;
  onDoubleClick: () => void;
  desktopRef: React.RefObject<HTMLDivElement | null>
}

export function DesktopItem({ title, icon, onDoubleClick, desktopRef }: DesktopItemProps) {
  const isMobile = useIsMobile();
  // Using positions now so that they don't bug out between phone and desktop since framer motion things are a lil finneky sometimes (however you spell that damn word)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // We force a recalculation of the coordinates on mobile change so that the positioning changes are more robust
  useEffect(() => {
    if (isMobile) {
      x.set(0);
      y.set(0);
    }
  }, [isMobile]);

  return (
    <motion.div 
      dragConstraints={desktopRef}
      className={`flex flex-col items-center justify-start w-20 md:w-24 p-2 rounded-lg hover:bg-white/20 hover:border-white/30 border border-transparent cursor-pointer transition-colors active:bg-white/30 group select-none`}
      onDoubleClick={!isMobile ? onDoubleClick : undefined}
      onClick={isMobile ? onDoubleClick : undefined}
      drag={!isMobile}
      dragMomentum={false}
      style={{ x, y }}
      whileTap={isMobile ? { scale: 0.95 } : undefined}
    >
      <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center mb-1 drop-shadow-md group-hover:scale-105 transition-transform duration-200">
        {icon}
      </div>
      <span className="text-white text-xs md:text-sm font-medium text-center bg-black/20 px-2 py-0.5 rounded-md drop-shadow-sm backdrop-blur-sm line-clamp-2 shadow-black/50">
        {title}
      </span>
    </motion.div>
  );
}
