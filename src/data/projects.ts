import type { Project } from '../types';
import gradeshipReadme from './readmes/gradeship-readme.md?raw';
import psrsReadme from './readmes/psrs-readme.md?raw';
import uacsWebsiteReadme from './readmes/uacs-website-readme.md?raw';
import openBendReadme from './readmes/open-bend-readme.md?raw';
import vrticulateReadme from './readmes/vrticulate-readme.md?raw';

export const projects: Project[] = [
  {
    id: 'course-link',
    title: 'Gradeship',
    description: 'A comprehensive platform designed to connect university students with ideal study partners. By matching students based on their current courses, study goals, and academic preferences, Gradeship bridges the gap between students and facilitates academic collaboration and social connection on campus.',
    technologies: ['React', 'Firebase Auth', 'Firestore', 'Tailwind CSS', 'Radix UI'],
    link: 'https://gradeship.ca',
    webpage: 'https://app.gradeship.ca',
    readme: gradeshipReadme
  },
  {
    id: 'psrs',
    title: 'PSRS',
    description: 'A multi-threaded C++ implementation of the Parallel Sorting by Regular Sampling (PSRS) algorithm using POSIX threads (`pthreads`). This project explores true concurrent execution for large-scale data sorting and includes an automated Python benchmarking suite to measure speedup and performance against standard sequential sorting methods.',
    technologies: ['C++', 'POSIX Threads', 'Python3', 'GNU Make'],
    github: 'https://github.com/Licensed-Driver/Shared-Memory-PSRS',
    readme: psrsReadme
  },
  {
    id: 'uacs-website',
    title: 'UACS Website',
    description: "A stylized, React-based website for the University of Alberta's Undergraduate Association of Computing Science (UACS). Built with Vite, TypeScript, and Tailwind CSS, it features an interactive event calendar and accessible UI components for students.",
    technologies: ['TypeScript', 'React', 'Vite', 'Radix UI'],
    link: 'https://uacs.ca',
    readme: uacsWebsiteReadme
  },
  {
    id: 'open-bend',
    title: 'OpenBend',
    description: '',
    technologies: ['C++', 'JUCE', 'Pamplejuce', 'CMake'],
    readme: openBendReadme,
    github: 'https://github.com/Licensed-Driver/OpenBend'
  },
  {
    id: 'vrticulate',
    title: 'VRticulate',
    description: 'Free, open-source full-body motion capture using standard webcams. Streams real-time joint data to Unity over UDP using Google MediaPipe for pose inference, OpenCV ArUco markers for multi-camera calibration, and SVD-based triangulation to reconstruct a true 3D skeleton — no hardware trackers required.',
    technologies: ['Python', 'C#', 'Unity', 'MediaPipe', 'OpenCV'],
    github: 'https://github.com/Licensed-Driver/VRticulation',
    readme: vrticulateReadme
  }
];
