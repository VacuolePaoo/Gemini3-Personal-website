export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  link: string;
  status: 'DEPLOYED' | 'PROTOTYPE' | 'DEPRECATED';
  year: string;
}

export interface NavItem {
  label: string;
  href: string;
  code: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}