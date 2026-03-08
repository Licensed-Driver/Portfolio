import { useState } from 'react';
import { projects } from '../data/projects';
import { Folder, ChevronLeft } from 'lucide-react';
import { Project } from './Project';
import { useIsMobile } from '../hooks/useIsMobile';

interface FileExplorerProps {
  onOpenWebPage?: (id:string) => void;
}

export function FileExplorer({ onOpenWebPage }: FileExplorerProps) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const isMobile = useIsMobile();

  if (selectedProject) {
    const project = projects.find(p => p.id === selectedProject);
    if (!project) return null;
    
    return (
      <div 
        className="w-full h-full bg-white/80 flex flex-col"
      >
        {/* Toolbar */}
        <div className="h-12 bg-gray-100/50 border-b border-gray-200/50 flex items-center px-4 backdrop-blur-md">
           <button 
             onClick={() => setSelectedProject(null)}
             className="flex items-center text-gray-600 hover:text-black bg-white/50 px-2 py-1 rounded shadow-sm border border-gray-200"
           >
             <ChevronLeft size={16} className="mr-1" />
             Back
           </button>
           <div className="ml-4 font-medium text-gray-700">Projects / {project.title}</div>
        </div>
        
        {/* Content */}
        <div key="project-view" className="flex-1 overflow-y-auto h-full">
          <Project
            project={project}
            onOpenWebPage={onOpenWebPage}
          ></Project>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full h-full bg-white/80 flex flex-col"
    >
      {/* Toolbar */}
      <div className="h-12 bg-gray-100/50 border-b border-gray-200/50 flex items-center px-4 backdrop-blur-md">
         <div className="font-medium text-gray-700 ml-2">Projects Finder</div>
      </div>
      
      {/* Grid */}
      <div key="grid-view" className="flex-1 overflow-y-auto p-6">
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {projects.map((project) => (
              <div 
                key={project.id}
                onDoubleClick={isMobile ? undefined : () => setSelectedProject(project.id)}
                onClick={isMobile ? () => setSelectedProject(project.id) : undefined}
                className="flex flex-col items-center justify-start p-4 rounded-xl hover:bg-black/5 cursor-pointer transition-colors group"
              >
                <div className="w-20 h-20 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-blue-500 mb-3 shadow-sm group-hover:scale-105 transition-transform duration-200">
                  <Folder size={40} className="fill-blue-200" />
                </div>
                <span className="text-sm font-medium text-gray-800 text-center">{project.title}</span>
                <span className="text-xs text-gray-500 text-center mt-1">{project.technologies.length} items</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
