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
      'B.S. in Mechatronics Engineering at one of Latin America\'s top programs. Competed in FIRST Robotics as programmer and later returned as mentor, led peer tutoring sessions, and graduated with hands-on experience across robotics, embedded systems, and manufacturing.',
    position: 0.10,
    image: 'https://static.wixstatic.com/media/ef03dd_a36d5e8276f84073b5f120486a3f5695~mv2.jpg',
  },
  {
    id: 'steinbeis',
    label: 'STEINBEIS / ESSLINGEN',
    year: '2022 / 2024',
    role: 'EXCHANGE + AUTOMOTIVE ENGINEERING COURSE',
    description:
      'Semester exchange at Hochschule Esslingen in 2022, immersed in German engineering culture and precision manufacturing. Returned in January 2024 for the Steinbeis Transfer Center\'s Automotive Engineering (STiAE) intensive, deepening knowledge of powertrain systems and vehicle development processes.',
    position: 0.30,
    image: 'https://static.wixstatic.com/media/ef03dd_83779ce77ccc41a7a928f50ba79bbd1f~mv2.jpg',
  },
  {
    id: 'frc',
    label: 'FRC HOUSTON',
    year: '2023',
    role: 'FIRST ROBOTICS COMPETITION',
    description:
      'Programmer and mentor for Team Blue Ignition. Wrote Java-based autonomous routines and teleop controls that helped the team qualify for the FIRST World Championship in Houston — then returned as a mentor to pass the knowledge forward.',
    position: 0.45,
    image: 'https://static.wixstatic.com/media/ef03dd_464ea1489baa483fb8e8cc464a1b9a17f000.jpg',
  },
  {
    id: 'magna',
    label: 'MAGNA CIMS',
    year: '2023–2024',
    role: 'MANUFACTURING ENGINEERING',
    description:
      'Designed a 3D scanning rig using a Microsoft Kinect and custom SolidWorks fixtures to bring dimensional quality control directly to the production floor at this Tier-1 automotive supplier — no CMM downtime required.',
    position: 0.65,
    image: 'https://static.wixstatic.com/media/ef03dd_8896320d3685451a9c1fd07f947c1a0f~mv2.jpeg',
  },
  {
    id: 'cinvestav',
    label: 'CINVESTAV',
    year: '2024–PRESENT',
    role: 'COMPUTER VISION RESEARCH',
    description:
      'Ongoing research at CINVESTAV Ramos Arizpe on RGB-D data processing for robotic perception. Work covers point cloud acquisition, semantic segmentation, and spatial mapping — building the sensory layer for autonomous manipulation systems.',
    position: 0.85,
    image: 'https://static.wixstatic.com/media/ef03dd_f270020e932f451bba66441b75c4657b~mv2.png',
  },
];
