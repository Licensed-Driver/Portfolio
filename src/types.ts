export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export interface DesktopItemData {
  id: string;
  title: string;
  type: 'file' | 'folder' | 'app';
  windowId: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  imageUrl?: string;
  readme?: string;
  webpage?: string;
}
