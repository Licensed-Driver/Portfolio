import type { Project } from '../types';
import courseLinkReadme from './readmes/course-link-readme.md?raw';
import psrsReadme from './readmes/psrs-readme.md?raw';
import uacsWebsiteReadme from './readmes/uacs-website-readme.md?raw';
import openBendReadme from './readmes/open-bend-readme.md?raw';

export const projects: Project[] = [
  {
    id: 'course-link',
    title: 'Course Link',
    description: 'A comprehensive platform designed to connect university students with ideal study partners. By matching students based on their current courses, study goals, and academic preferences, CourseLink bridges the gap between students and facilitates academic collaboration and social connection on campus.',
    technologies: ['React', 'Firebase Auth', 'Firestore', 'Tailwind CSS', 'Radix UI'],
    link: 'https://courselink.ca',
    webpage: 'https://courselink.ca',
    readme: courseLinkReadme
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
  }
];
