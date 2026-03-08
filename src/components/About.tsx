
import { User, Mail, MapPin } from 'lucide-react';

export function About() {
  return (
    <div 
      className="w-full h-full p-8 bg-white/50 overflow-y-auto"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <div className="w-32 h-32 bg-gray-200 rounded-full mb-6 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
          <User className="w-16 h-16 text-gray-500" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Layne Pitman</h1>
        <h2 className="text-3xl font-bold text-gray-600 mb-2">Computer Scientist</h2>

        <br/>

        {/* Skills */}
        <div className="w-full bg-white/70 p-8 rounded-xl shadow-sm border border-white/50 backdrop-blur-md mb-8">
           <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">What I'm Good At (Skills)</h2>
           
           <div className="space-y-6">
             <div>
               <h3 className="font-semibold text-gray-800 mb-2 text-lg">Languages & Low-Level</h3>
               <div className="flex flex-wrap gap-2">
                 {['Python', 'C', 'C++', 'Java', 'TypeScript', 'SQL', 'Bash', 'RISC-V'].map(skill => (
                   <span key={skill} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full font-medium border border-blue-100">{skill}</span>
                 ))}
               </div>
             </div>
             
             <div>
               <h3 className="font-semibold text-gray-800 mb-2 text-lg">The Fun Stuff (Concepts)</h3>
               <div className="flex flex-wrap gap-2">
                 {['Reinforcement Learning', 'Algorithm Optimization', 'Database Modelling', 'Operating Systems', 'Computer Architecture'].map(skill => (
                   <span key={skill} className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full font-medium border border-purple-100">{skill}</span>
                 ))}
               </div>
             </div>

             <div>
               <h3 className="font-semibold text-gray-800 mb-2 text-lg">Libraries & Frameworks</h3>
               <div className="flex flex-wrap gap-2">
                 {['React', 'Node.js', 'PyTorch', 'TensorFlow', 'Three.js / OpenGL', 'Tailwind', 'GCP', 'Firebase', 'Linux/Unix'].map(skill => (
                   <span key={skill} className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full font-medium border border-green-100">{skill}</span>
                 ))}
               </div>
             </div>
           </div>
        </div>
        
        {/* Philosophy and Strengths */}
        <div className="w-full bg-white/70 p-8 rounded-xl shadow-sm border border-white/50 backdrop-blur-md mb-8">
           <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">How I think about code</h2>
           <p className="text-gray-600 leading-relaxed text-lg">
             I prefer building systems from absolute scratch instead of just memorizing frameworks. I thrive when things are completely ambiguous, undocumented, and copy-pasting code simply fails. My biggest strengths are ramping up incredibly fast on novel, complex problems and leaning heavily on architectural intuition to make things work smoothly and stay maintainable. Whether it's training reinforcement learning agents, writing backend matching engines, or setting up reverse-proxy media servers, I prioritize clear logic, hard trade-offs, and actually maintaining the code I write.
           </p>
        </div>

        {/* Experience */}
        <div className="w-full bg-white/70 p-8 rounded-xl shadow-sm border border-white/50 backdrop-blur-md mb-8">
           <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">What I've Actually Done (Experience)</h2>
           
           <div className="space-y-8">
             <div className="relative pl-6 border-l-2 border-blue-200">
               <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
               <h3 className="text-xl font-bold text-gray-800">UACS VP of Administration</h3>
               <p className="text-blue-600 font-medium mb-3">UofA Computing Science Assoc. | Oct 2025 – Present</p>
               <p className="text-gray-600 mb-2 text-lg">Running the boring-but-important core admin ops for 1,000+ computer science students. I handle all the internal routing, agendas, logic, and room bookings.</p>
               <p className="text-gray-600 text-lg">The most dev-esque thing I did here was maintain our website and completely automate the rental application forms, basically crushing manual human processing down to a flat 0% across the board.</p>
             </div>

             <div className="relative pl-6 border-l-2 border-blue-200">
               <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
               <h3 className="text-xl font-bold text-gray-800">Computer Science Teaching Assistant</h3>
               <p className="text-blue-600 font-medium mb-3">University of Alberta | Dec 2024 – Present</p>
               <p className="text-gray-600 mb-2 text-lg">Teaching the younger students how not to write terrible code. I run seminars and 1-on-1 office hours to explain Logic, Algorithms, and Machine Learning fundamentals.</p>
               <p className="text-gray-600 text-lg">I also genuinely enjoy designing unique, tough, but fair exam questions, and I handle a massive volume of marking for the department.</p>
             </div>
           </div>
        </div>

        {/* Education */}
        <div className="w-full bg-white/70 p-8 rounded-xl shadow-sm border border-white/50 backdrop-blur-md mb-10">
           <div className="flex items-center mb-6 border-b border-gray-200 pb-2">
             <h2 className="text-2xl font-bold text-gray-800">Education</h2>
           </div>
           
           <div>
             <h3 className="text-xl font-bold text-gray-800">BSc Computing Science Specialization</h3>
             <p className="text-blue-600 font-medium mb-3">University of Alberta | Expected June 2027</p>
             <p className="text-gray-600 text-lg mb-2">Grinding through with a 3.7 GPA. Honored on the Dean's Roll 2023-2026, plus bagged the Jason Lang Scholarship a bunch of times.</p>
             <p className="text-gray-500 mt-3">Relevant stuff I sat through: Reinforcement Learning, Algorithms, Linear Algebra, Applied Stats, Formal Systems and Logic, and Computer Architecture.</p>
           </div>
        </div>
        
        <div className="mt-4 flex space-x-6 pb-12 w-full justify-center">
          <a href="mailto:laynep.cs@gmail.com" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-lg font-medium">
            <Mail className="w-6 h-6 mr-2" />
            laynep.cs@gmail.com
          </a>
          <div className="flex items-center text-gray-600 text-lg font-medium">
            <MapPin className="w-6 h-6 mr-2" />
            Calgary / Edmonton, AB
          </div>
        </div>
      </div>
    </div>
  );
}
