import type { Project } from '../types';
import { FileCode, Github, ExternalLink, EyeIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function Project(
    {
        project,
        onOpenWebPage
    }:{
        project:Project;
        onOpenWebPage?: (id:string) => void;
    }
) {
    return (
        <div className="p-8">
           <div className="max-w-4xl mx-auto">
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    <FileCode size={32} />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
                    <div className="flex space-x-2 mt-2">
                       {project.technologies.slice(0, 3).map(t => (
                         <span key={t} className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{t}</span>
                       ))}
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100 flex space-x-4">
                    {project.webpage && (
                        <button 
                          onClick={() => onOpenWebPage?.(project.id)}
                          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                        >
                          <EyeIcon size={18} className="mr-2" />
                          Open
                        </button>
                    )}
                    {project.github && (
                        <a href={project.github} className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                        <Github size={18} className="mr-2" />
                        View Source
                        </a>
                    )}
                    {project.link && (
                        <a href={project.link} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                        <ExternalLink size={18} className="mr-2" />
                        Go To Page
                        </a>
                    )}
                </div>
             </div>
             <br/>
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="prose prose-blue max-w-none text-gray-800">
                  {project.readme ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {project.readme}
                    </ReactMarkdown>
                  ) : (
                    <p className="text-lg leading-relaxed">{project.description}</p>
                  )}
                </div>
             </div>
           </div>
        </div>
    );
}