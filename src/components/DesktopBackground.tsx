import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const skills = [
  // Languages
  { name: 'Python', color: 'bg-white/20 text-white/60 border-white/10' },
  { name: 'C/C++', color: 'bg-white/20 text-white/60 border-white/10' },
  { name: 'TypeScript', color: 'bg-white/20 text-white/60 border-white/10' },
  { name: 'SQL', color: 'bg-white/20 text-white/60 border-white/10' },
  { name: 'Bash', color: 'bg-white/20 text-white/60 border-white/10' },
  { name: 'RISC-V', color: 'bg-white/20 text-white/60 border-white/10' },
  { name: 'Java', color: 'bg-white/20 text-white/60 border-white/10' },
  // Concepts
  { name: 'Reinforcement Learning', color: 'bg-white/20 text-white/60 border-white/10' },
  { name: 'Algo Optimization', color: 'bg-white/20 text-white/60 border-white/10' },
  { name: 'Database Modelling', color: 'bg-white/20 text-white/60 border-white/10' },
  { name: 'Operating Systems', color: 'bg-white/20 text-white/60 border-white/10' },
  { name: 'Computer Architecture', color: 'bg-white/20 text-white/60 border-white/10' },
  // Frameworks
  { name: 'React', color: 'bg-white/20 text-white/60 border-white/10' },
  { name: 'Node.js', color: 'bg-white/20 text-white/60 border-white/10' },
  { name: 'PyTorch', color: 'bg-white/20 text-white/60 border-white/10' },
  { name: 'TensorFlow', color: 'bg-white/20 text-white/60 border-white/10' },
  { name: 'Three.js / OpenGL', color: 'bg-white/20 text-white/60 border-white/10' },
  { name: 'Tailwind', color: 'bg-white/20 text-white/60 border-white/10' },
  { name: 'GCP', color: 'bg-white/20 text-white/60 border-white/10' },
  { name: 'Firebase', color: 'bg-white/20 text-white/60 border-white/10' },
  { name: 'Linux/Unix', color: 'bg-white/20 text-white/60 border-white/10' }
];

// We use React.memo so that the chips flying in only render once since they are expensinve as all hell
export const DesktopBackground = React.memo(() => {

  const containerRef = useRef(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });

  // Register a resize observer so we can scale the bubbles to the screen size
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(([entry]) => {
      setBounds({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // About the half size of the largest bubble so we don't get cutoff
  const BUBBLE_HALF_W = 70;
  const BUBBLE_HALF_H = 24;

  // The largest radius any bubble in the spiral will hit
  const maxRadius = 350 + (skills.length - 1) * 9;

  // How much room we actually have from the center to each edge
  const availX = Math.max(0, bounds.width / 2 - BUBBLE_HALF_W);
  const availY = Math.max(0, bounds.height / 2 - BUBBLE_HALF_H);

  // Pick the tighter one
  const scale = bounds.width === 0 ? 1 : Math.min(
    availX / (maxRadius * 1.6),
    availY / maxRadius,
    1
  );

  return (
    <div className="absolute inset-0 z-0 flex flex-col items-center justify-center overflow-hidden pointer-events-none">
      {/* Map each skill to a bubble */}
      <div className="hidden md:flex absolute inset-0 z-0 items-center justify-center">
        {skills.map((skill, i) => {
          const goldenRatio = (1 + Math.sqrt(5)) / 2;
          // We use the golden ratio with a uniform spread so that the bubbles are nicely spread but not random
          const fract = (i * goldenRatio) % 1;

          // Since most of the direct bottom is taken up, we map it to like everything but the bottom 45 degrees (22.5 degrees either side of straight down)
          const angleDeg = 112.5 + (fract * 315);
          const theta = angleDeg * (Math.PI / 180);

          let radius = 350 + (i * 9);

          const x = Math.cos(theta) * (radius * 1.6) * scale;
          const y = Math.sin(theta) * radius * scale;

          return (
            <motion.div
              key={skill.name}
              className={`absolute z-0 flex items-center justify-center px-4 py-3 rounded-full border font-semibold text-sm cursor-grab active:cursor-grabbing pointer-events-auto ${skill.color}`}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{ x, y, opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 30,
                damping: 10,
                delay: i * 0.03
              }}
              whileHover={{ scale: 1.1, zIndex: 20 }}
              drag
              dragElastic={0.1}
              dragMomentum={true}
            >
              {skill.name}
            </motion.div>
          );
        })}
      </div>

      {/* Now the regular-shmegular content */}
      <div className="relative z-0 flex flex-col items-center pointer-events-none w-full max-w-4xl mx-auto px-4 mix-blend-overlay">
        <div className="w-24 h-24 bg-white/30 rounded-full mb-4 flex items-center justify-center border-4 border-white/10 overflow-hidden pointer-events-auto mt-4 backdrop-blur-sm">
          <img src="/images/IMG_5335.jpg" alt="Profile" className="w-full h-full object-cover" />
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-white/70 mb-1 tracking-wide text-center">Layne Pitman</h1>
        <h2 className="text-lg md:text-xl font-bold text-white/50 mb-6 tracking-wide text-center">Computer Scientist</h2>

        <div className="flex flex-col items-center w-full max-w-3xl pointer-events-auto mt-2">
          <p className="text-base md:text-lg text-white/70 mb-4 text-center font-medium leading-relaxed">
            I'm a 3rd-year Computing Science student at the University of Alberta and the current VP of Administration for UACS. I just have a passion for computer science, love to code, and can never have enough fun solving problems.
          </p>
          <p className="text-base md:text-lg text-white/70 text-center font-medium leading-relaxed">
            My work usually bounces between low-level systems architecture (like compiling the custom Buildroot Linux OS running on this site), shipping full-stack web applications, and building whatever's caught my interest recently. When I step away from the keyboard, you can usually find me snowboarding around Edmonton, making new cocktail recipes, or taking care of my guinea pigs.
          </p>
        </div>
      </div>
    </div>
  );
});
