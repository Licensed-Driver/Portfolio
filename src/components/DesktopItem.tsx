import React from 'react';
import { motion } from 'framer-motion';

interface DesktopItemProps {
  title: string;
  icon: React.ReactNode;
  onDoubleClick: () => void;
  desktopRef: React.RefObject<HTMLDivElement | null>
}

export function DesktopItem({ title, icon, onDoubleClick, desktopRef }: DesktopItemProps) {
  return (
    <motion.div 
      dragConstraints={desktopRef}
      className="flex flex-col items-center justify-start w-24 p-2 rounded-lg hover:bg-white/20 hover:border-white/30 border border-transparent cursor-pointer transition-colors active:bg-white/30 group select-none"
      onDoubleClick={onDoubleClick}
      drag={true}
      dragMomentum={false}
    >
      <div className="w-14 h-14 flex items-center justify-center mb-1 drop-shadow-md group-hover:scale-105 transition-transform duration-200">
        {icon}
      </div>
      <span className="text-white text-sm font-medium text-center bg-black/20 px-2 py-0.5 rounded-md drop-shadow-sm backdrop-blur-sm line-clamp-2 shadow-black/50">
        {title}
      </span>
    </motion.div>
  );
}
