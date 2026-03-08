import { useRef, useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Folder, User, FileText, Github, ExternalLink } from 'lucide-react';
import { Window } from './components/Window';
import { DesktopItem } from './components/DesktopItem';
import { Dock } from './components/Dock';
import { Terminal } from './components/Terminal';
import { FileExplorer } from './components/FileExplorer';
import { About } from './components/About';
import type { WindowState } from './types';
import './index.css';
import { GitHubApp } from './components/GitHubApp';
import { WebPage } from './components/WebPage';
import { DesktopBackground } from './components/DesktopBackground';

export interface WebPageData {
  url: string;
  title: string;
}

function App() {
  // For setting up windows that can be created from inside other windows since we won't know they need to be openeed at startup
  const [windows, setWindows] = useState<WindowState[]>([
    { id: 'about', title: 'About.me', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'projects', title: 'Projects', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'terminal', title: 'Terminal', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'github', title: 'GitHub', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10},
    { id: 'course-link', title: 'CourseLink', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10},
  ]);

  const [activeZIndex, setActiveZIndex] = useState(10);

  const desktopRef = useRef<HTMLDivElement>(null);
  const emulatorRef = useRef<any>(null);

  // We boot up linux when the page loads but keep it in the background so that the linux instance is persistent and doesn't restart with the terminal window
  useEffect(() => {
    const initLinux = () => {
      // Make the emulator a singleton since we want persistance so we tie it to the window
      // @ts-ignore
      if(window.portfolioOS) {
        // @ts-ignore
        emulatorRef.current = window.portfolioOS;
        return;
      }

      // Browser embedded linux image, thank you Fabian for making literally exactly what I was looking for
      // @ts-ignore - v86 loads globally
      const emulator = new window.V86({
        wasm_path: "/v86/emulator/v86.wasm",

        memory_size: 512 * 1024 * 1024, 
        vga_memory_size: 8 * 1024 * 1024,

        bios: {
            url: "/v86/emulator/bios/seabios.bin",
        },
        vga_bios: {
            url: "/v86/emulator/bios/vgabios.bin",
        },
        bzimage: { url: "/v86/images/bzImage" }, 
        hda: { url: "/v86/images/rootfs.ext2" },
        autostart: true,
        bzimage_initrd_from_filesystem: true,

        cmdline: "rw root=/dev/sda console=ttyS0",

        disable_keyboard: true,  // Xterm is handling our keystrokes
        disable_mouse: true // So that it doesn't take over scrolling 
      });

      // So we don't try to start using it before it's booted
      emulator.isBooted = true;

      // @ts-ignore
      window.portfolioOS = emulator;
      emulatorRef.current = emulator;
    };

    if (document.readyState === "complete") {
      initLinux();
    } else {
      window.addEventListener("load", initLinux);
      return () => window.removeEventListener("load", initLinux);
    }
  }, []);

  // Basically just pick out the window we want and set it to opened or not opened, or minimized or maximized or whatever for all these
  const openWindow = (id: string) => {
    setActiveZIndex(prev => prev + 1);
    setWindows(prev => prev.map(w => 
      w.id === id 
        ? { ...w, isOpen: true, isMinimized: false, zIndex: activeZIndex + 1 }
        : w
    ));
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
  };

  const toggleMinimize = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w));
  };

  const toggleMaximize = (id: string) => {
    setActiveZIndex(prev => prev + 1);
    setWindows(prev => prev.map(w => 
      w.id === id 
        ? { ...w, isMaximized: !w.isMaximized, zIndex: activeZIndex + 1 }
        : w
    ));
  };

  const focusWindow = (id: string) => {
    if (windows.find(w => w.id === id)?.zIndex === activeZIndex) return;
    setActiveZIndex(prev => prev + 1);
    setWindows(prev => prev.map(w => 
      w.id === id 
        ? { ...w, zIndex: activeZIndex + 1 }
        : w
    ));
  };

  // For opening windows from inside a window y'know?
  const openWebPage = (id: string) => {
    openWindow(id);
  };

  const getWindowContent = (id: string) => {
    switch(id) {
      case 'about': return <About />;
      case 'projects': return <FileExplorer onOpenWebPage={openWebPage} />;
      case 'terminal': return <Terminal 
        emulatorRef={emulatorRef}
        onClose={() => closeWindow(id)}
      />;
      case 'github': return <GitHubApp />;
      case 'course-link': return <WebPage url={'https://courselink.ca'} title={"CourseLink"} />;
      default: null;
    }
  };

  const desktopItems = [
    { id: 'about', title: 'About.me', icon: <FileText size={48} className="text-white drop-shadow-lg" />, windowId: 'about' },
    { id: 'projects', title: 'Projects', icon: <Folder size={48} className="text-white drop-shadow-lg fill-blue-200/50" />, windowId: 'projects' },
    { id: 'terminal', title: 'Terminal', icon: <TerminalIcon size={48} className="text-gray-200 drop-shadow-lg p-1 bg-black/60 rounded-lg border border-gray-600" />, windowId: 'terminal' },
    { id: 'github', title: 'GitHub', icon: <Github size={48} className="text-white drop-shadow-lg"/>, windowId: 'github'}
  ];

  const dockItems = [
    { id: 'about', label: 'About', icon: <User className="text-white" size={24} />, windowId: 'about', openByDefault: true, isOpen:false },
    { id: 'projects', label: 'Projects', icon: <Folder className="text-white fill-blue-200/50" size={24} />, windowId: 'projects', openByDefault: true, isOpen:false },
    { id: 'terminal', label: 'Terminal', icon: <TerminalIcon className="text-white" size={24} />, windowId: 'terminal', openByDefault: true, isOpen:false },
    { id: 'github', label: 'GitHub', icon: <Github className="text-white" size={24} />, windowId: 'github', openByDefault: true, isOpen:false },
    { id: 'course-link', label: 'CourseLink', icon: <ExternalLink className="text-black" size={24} />, windowId: 'course-link', openByDefault: false, isOpen:false }
  ];

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* Top Menu Bar */}
      <div className="fixed top-0 left-0 right-0 z-[1000] h-3 group">
        <div className="
          absolute top-0 left-0 w-full h-[3dvh] min-h-[28px] bg-white/10 backdrop-blur-md border-b border-white/20 px-4 
          flex items-center shadow-sm text-xs font-medium text-white shadow-black/10 
          transition-transform duration-300 ease-out delay-500 group-hover:delay-500
          -translate-y-full group-hover:translate-y-0
          pointer-events-none group-hover:pointer-events-auto
        ">
          <span className="font-bold cursor-default tracking-wide pointer-events-auto">Layne's Portfolio</span>
          <div className="ml-6 space-x-4 flex pointer-events-auto">
            <span className="cursor-pointer hover:bg-white/20 px-2 py-1 rounded transition-colors">File</span>
            <span className="cursor-pointer hover:bg-white/20 px-2 py-1 rounded transition-colors">Edit</span>
            <span className="cursor-pointer hover:bg-white/20 px-2 py-1 rounded transition-colors">View</span>
            <span className="cursor-pointer hover:bg-white/20 px-2 py-1 rounded transition-colors">Go</span>
            <span className="cursor-pointer hover:bg-white/20 px-2 py-1 rounded transition-colors">Window</span>
            <span className="cursor-pointer hover:bg-white/20 px-2 py-1 rounded transition-colors">Help</span>
          </div>
          <div className="ml-auto flex items-center space-x-3">
            <span>{new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date())}</span>
          </div>
        </div>
      </div>
      <div
        className="absolute top-0 left-0 w-full h-screen"
        ref={desktopRef}>

        <DesktopBackground />

        {/* Desktop Area */}
        <div className="p-4 w-full h-full relative z-10"
        >
          {desktopItems.map(item => (
            <DesktopItem 
              key={item.id}
              title={item.title}
              icon={item.icon}
              onDoubleClick={() => openWindow(item.windowId)}
              desktopRef={desktopRef}
            />
          ))}
        </div>
        {/* Windows */}
        {windows.map(w => (
          <Window
            key={w.id}
            id={w.id}
            title={w.title}
            isOpen={w.isOpen}
            isMinimized={w.isMinimized}
            isMaximized={w.isMaximized}
            zIndex={w.zIndex}
            onClose={() => closeWindow(w.id)}
            onMinimize={() => toggleMinimize(w.id)}
            onMaximize={() => toggleMaximize(w.id)}
            onFocus={() => focusWindow(w.id)}
            desktopRef={desktopRef}
          >
            {getWindowContent(w.id)}
          </Window>
        ))}
      </div>

      {/* Dock */}
      <Dock 
        items={dockItems.filter(item => {
          const win = windows.find(w => w.id === item.windowId);
          return item.openByDefault || (win && win.isOpen);
        }).map((item) => {
          return {
            ...item,
            isOpen: windows.find(w => w.id === item.windowId)?.isOpen || false,
            onClick: () => {
              if (item.windowId) {
                const win = windows.find(w => w.id === item.windowId);
                if (!win?.isOpen) {
                  openWindow(item.windowId);
                } else if (win.isMinimized) {
                  toggleMinimize(item.windowId);
                  focusWindow(item.windowId);
                } else {
                  focusWindow(item.windowId);
                }
              }
            }
        }
      })} 
      />
    </div>
  );
}

export default App;