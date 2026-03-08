import React, { useRef, useEffect, useState } from 'react';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';

export interface Command {
  description: string;
  usage: string;
  fn: (...args:any) => any
}

export function Terminal({ 
  emulatorRef,
  onClose
 }:{
  emulatorRef: React.RefObject<any>,
  onClose: Function
 }) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  const inputBuffer = useRef<string>("");

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize xterm.js
    const term = new XTerm({
      cursorBlink: true,
      fontFamily: 'monospace',
      theme: {
        background: '#000000',
        foreground: '#4ade80',  // green-400 equivalent
      }
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    xtermRef.current = term;
    fitAddonRef.current = fitAddon;
    
    term.open(terminalRef.current);
    
    // Use a slight delay to ensure the container is fully sized before fitting
    setTimeout(() => {
      fitAddon.fit();
    }, 10);

    // Handle browser resize
    const handleResize = () => {
      fitAddon.fit();
      console.log("Resizing...")
    };
    window.addEventListener('resize', handleResize);

    // Handle desktop window resize
    const resizeObserver = new ResizeObserver(() => {
      try {
        fitAddon.fit();
      } catch (e) {
        // Xterm can throw an error if the terminal is too small
        console.warn("Terminal too small to fit");
      }
    });

    resizeObserver.observe(terminalRef.current);

    if(!emulatorRef.current.isBooted)
      term.writeln('\x1b[33mBooting lightweight Linux kernel...\x1b[0m');

    // Send all input data to emulator
    term.onData((data) => {
      // Drop any keystrokes until it's booted
      if (emulatorRef.current.isBooted) {
        if(data === '\r'){
          if (inputBuffer.current==="exit") {
            onClose();
            return;
          }
          inputBuffer.current = '';
        } else if (data.includes('\r')) {
          let dataSplit = data.split("\r");
          dataSplit.forEach((line) => {
            if (line==="exit") {
              onClose();
              return;
            }
          })
        } else {
          inputBuffer.current+=data;
        }
        emulatorRef.current.serial0_send(data);
      }
    });

    // Send all output back to terminal
    emulatorRef.current.add_listener("serial0-output-byte", (byte:any) => {
      // Drop boot logs
      if (emulatorRef.current.isBooted) {
        var char = String.fromCharCode(byte);
        term.write(char);
      }
    })

    // Once setup is done we redo our welcome script
    emulatorRef.current.serial0_send("source /etc/profile\r")

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      term.dispose();
    };
  }, []);

  return (
    <div 
      className="w-full h-full bg-black p-4" 
    >
        <div ref={terminalRef} className="w-full h-full" />
    </div>
  );
}
