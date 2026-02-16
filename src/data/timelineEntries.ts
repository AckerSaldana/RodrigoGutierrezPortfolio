export interface TimelineEntry {
  id: string;
  label: string;
  year: string;
  role: string;
  description: string;
  position: number;
  image: string;
}

export const timelineEntries: TimelineEntry[] = [
  {
    id: 'tec',
    label: 'TEC DE MONTERREY',
    year: '2019–2023',
    role: 'B.S. MECHATRONICS ENGINEERING',
    description:
      'Studied the intersection of mechanical, electrical, and software systems at one of Latin America\'s top engineering programs.',
    position: 0.10,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80',
  },
  {
    id: 'steinbeis',
    label: 'STEINBEIS / ESSLINGEN',
    year: '2022',
    role: 'INTERNATIONAL EXCHANGE — GERMANY',
    description:
      'Semester abroad focused on advanced manufacturing and Industry 4.0 practices in Stuttgart\'s engineering corridor.',
    position: 0.30,
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80',
  },
  {
    id: 'frc',
    label: 'FRC HOUSTON',
    year: '2023',
    role: 'FIRST ROBOTICS COMPETITION',
    description:
      'Competed at the world championship, designing and programming autonomous robot systems under strict build constraints.',
    position: 0.45,
    image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=1200&q=80',
  },
  {
    id: 'magna',
    label: 'MAGNA CIMS',
    year: '2023–2024',
    role: 'MANUFACTURING ENGINEERING',
    description:
      'Developed tooling and process automation for a Tier-1 automotive supplier, bridging CAD design with production-floor reality.',
    position: 0.65,
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&q=80',
  },
  {
    id: 'cinvestav',
    label: 'CINVESTAV',
    year: '2024–PRESENT',
    role: 'COMPUTER VISION RESEARCH',
    description:
      'Researching real-time perception systems for robotics applications at Mexico\'s leading advanced research center.',
    position: 0.85,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
  },
];
