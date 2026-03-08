import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export const WebPage = ({
    url,
    title 
}: {
    url: string,
    title: string
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full h-full bg-white flex flex-col relative">
      {/* Lil fake address bar */}
      <div className="bg-gray-100 border-b border-gray-300 px-3 py-1.5 text-xs text-gray-500 font-mono truncate flex-shrink-0 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-400"></span>
        {url}
      </div>

      {/* Loading thingy */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      )}

      {/* The page that we wanna load up inside the window in the page in the browser... I think */}
      <iframe 
        src={url}
        title={title}
        onLoad={() => setIsLoading(false)}
        className="w-full h-full border-none flex-grow bg-white"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  );
};