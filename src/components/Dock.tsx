import React from 'react';
import { motion } from 'framer-motion';

interface DockItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isOpen?: boolean;
}

function DockItem({ icon, label, onClick, isOpen }: DockItemProps) {
  return (
    <div className="relative group flex flex-col items-center">
      <motion.button
        onClick={onClick}
        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-black/10 border border-white/20 backdrop-blur-md shadow-lg transition-colors hover:bg-black/20 relative"
        whileHover={{ scale: 1.4, y: -10 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {icon}
      </motion.button>
      {/* Indicator dot for open apps */}
      {isOpen && (
        <div className="absolute -bottom-2 w-1 h-1 bg-white/80 rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
      )}
      
      {/* Tooltip */}
      <div className="absolute -top-12 px-3 py-1 bg-black/60 shadow-xl border border-white/10 backdrop-blur-md text-white/90 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {label}
      </div>
    </div>
  );
}

interface DockProps {
  items: {
    id: string;
    label: string;
    icon: React.ReactNode;
    isOpen: boolean;
    onClick: () => void;
  }[];
}

export function Dock({ items }: DockProps) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[999]">
      <div className="flex items-end gap-3 px-4 pb-3 pt-2 h-[0dp] bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl relative before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/5 before:to-transparent before:rounded-3xl">
        {items.map((item) => (
          <DockItem 
            key={item.id} 
            icon={item.icon} 
            label={item.label} 
            isOpen={item.isOpen}
            onClick={item.onClick}
          />
        ))}
      </div>
    </div>
  );
}
