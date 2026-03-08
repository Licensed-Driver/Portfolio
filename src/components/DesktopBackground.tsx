import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

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
  return (
    <div className="absolute inset-0 z-0 flex flex-col items-center justify-center overflow-hidden pointer-events-none">
      {/* Map each skill to a bubble */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {skills.map((skill, i) => {
          const goldenRatio = (1 + Math.sqrt(5)) / 2;
          // We use the golden ratio with a uniform spread so that the bubbles are nicely spread but not random
          const fract = (i * goldenRatio) % 1;
          
          // Since most of the direct bottom is taken up, we map it to like everything but the bottom 45 degrees (22.5 degrees either side of straight down)
          const angleDeg = 112.5 + (fract * 315);
          const theta = angleDeg * (Math.PI / 180);

          let radius = 350 + (i * 9); 
          
          // Tailwind was specifically the only one getting yeeted off screen so we just pull it back in cuz everything else looks *muah*
          if (skill.name === 'Tailwind') {
            radius -= 75;
          }
          const x = Math.cos(theta) * (radius * 1.6);
          const y = Math.sin(theta) * radius;

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
          <User className="w-12 h-12 text-white/50" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-extrabold text-white/70 mb-1 tracking-wide text-center">Layne Pitman</h1>
        <h2 className="text-lg md:text-xl font-bold text-white/50 mb-6 tracking-wide text-center">Computer Scientist</h2>
        
        <div className="flex flex-col items-center w-full max-w-3xl pointer-events-auto mt-2">
          <p className="text-base md:text-lg text-white/70 mb-4 text-center font-medium leading-relaxed">
            I'm a 3rd-year Computing Science student at the University of Alberta and the current VP of Administration for UACS. I just have a passion for computer science, love to code, and can never have enough fun solving problems.
          </p>
          <p className="text-base md:text-lg text-white/70 text-center font-medium leading-relaxed">
            My work usually bounces between low-level systems architecture (like compiling the custom Buildroot Linux OS running on this site), shipping full-stack web applications, and building whatever caught my interest recently. When I step away from the keyboard, you can usually find me snowboarding around Edmonton, making new cocktail recipes, or taking care of my guinea pigs.
          </p>
        </div>
      </div>
    </div>
  );
});
