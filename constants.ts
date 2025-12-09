
import { NavItem, Project } from './types';

export const SYSTEM_PROMPT = "You are PROTO_OS, a highly advanced AI assistant embedded in a portfolio website. Your persona is efficient, industrial, slightly brutalist, and technical. Keep responses concise, using technical jargon where appropriate (but understandable). Do not use emojis. Use uppercase for emphasis or key terms like 'SYSTEM', 'ERROR', 'ACKNOWLEDGED'. You are helpful but maintain a cool, machine-like detachment.";

// Updated to indices for the slide system
export const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', href: '#', code: '01' },
  { label: 'SPECS', href: '#', code: '02' },
  { label: 'MODULES', href: '#', code: '03' },
];

export const PROJECTS: Project[] = [
  {
    id: 'P_001',
    title: 'HYPER_DASH',
    category: 'FinTech Dashboard',
    description: 'High-frequency trading visualization interface. Real-time websocket data streams processed with WebGL acceleration.',
    tech: ['React', 'WebGL', 'Rust', 'Socket.io'],
    link: '#',
    status: 'DEPLOYED',
    year: '2024'
  },
  {
    id: 'P_002',
    title: 'VOID_RENDER',
    category: 'Generative Art',
    description: 'Autonomous rendering engine utilizing noise algorithms to generate brutalist architectural structures.',
    tech: ['Three.js', 'GLSL', 'TypeScript'],
    link: '#',
    status: 'PROTOTYPE',
    year: '2023'
  },
  {
    id: 'P_003',
    title: 'SYNTH_API',
    category: 'Backend Infrastructure',
    description: 'Distributed microservices architecture for synthetic voice synthesis and distribution.',
    tech: ['Go', 'gRPC', 'Docker', 'Kubernetes'],
    link: '#',
    status: 'DEPLOYED',
    year: '2023'
  },
  {
    id: 'P_004',
    title: 'ECHO_CHAMBER',
    category: 'Social Protocol',
    description: 'Decentralized social graph protocol allowing for censorship-resistant communication channels.',
    tech: ['Solidity', 'IPFS', 'Next.js'],
    link: '#',
    status: 'DEPRECATED',
    year: '2022'
  }
];

export const BIO_STATS = [
  { label: 'LOCATION', value: 'SECTOR_7 [NYC]' },
  { label: 'UPTIME', value: '99.98%' },
  { label: 'EXPERIENCE', value: '6.5 YEARS' },
  { label: 'STACK', value: 'FULL_DUPLEX' },
  { label: 'STATUS', value: 'CONTRACTS_OPEN' },
  { label: 'MEMORY', value: '32GB_DDR5' },
];
