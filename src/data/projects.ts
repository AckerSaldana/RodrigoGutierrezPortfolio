export interface ProjectData {
  id: string;
  index: number;
  title: string;
  date: string;
  location: string;
  description: string;
  tags: string[];
  image: string;
  format: 'A' | 'B' | 'C';
  images?: string[];
}

export const projects: ProjectData[] = [
  {
    id: 'team-romeo-wildfire-drone',
    index: 1,
    title: 'Team Romeo Wildfire Drone',
    date: 'June 2024',
    location: 'Monterrey, MX',
    description:
      'Led development of an ultra-fast, high-payload drone for the XPRIZE Wildfire Challenge, focusing on rapid area scanning and targeted wildfire suppression.',
    tags: ['DRONES', 'XPRIZE', 'CAD', 'LEADERSHIP'],
    image: 'https://picsum.photos/seed/wildfire-drone/1600/900',
    format: 'A',
  },
  {
    id: 'kuka-gripper-design',
    index: 2,
    title: 'KUKA Gripper Design',
    date: 'Nov 2024',
    location: 'Saltillo, MX',
    description:
      'Led CAD design of a gripper for KUKA robotic arm integration, focusing on mechanical efficiency and additive manufacturing prototyping.',
    tags: ['ROBOTICS', 'KUKA', 'CAD', 'MANUFACTURING'],
    image: 'https://picsum.photos/seed/kuka-gripper/1600/900',
    format: 'B',
  },
  {
    id: 'rgbd-research-cinvestav',
    index: 3,
    title: 'RGB-D Research at CINVESTAV',
    date: 'Feb 2025',
    location: 'Ramos Arizpe, MX',
    description:
      'Research on computer vision using RGB-D data and point cloud processing for spatial reconstruction, object detection, and robotic perception.',
    tags: ['VISION', 'POINT CLOUDS', 'RESEARCH', 'ROBOTICS'],
    image: 'https://picsum.photos/seed/rgbd-1/1600/900',
    format: 'C',
    images: [
      'https://picsum.photos/seed/rgbd-1/1600/900',
      'https://picsum.photos/seed/rgbd-2/1600/900',
      'https://picsum.photos/seed/rgbd-3/1600/900',
      'https://picsum.photos/seed/rgbd-4/1600/900',
    ],
  },
  {
    id: '3d-scanning-rig-magna',
    index: 4,
    title: '3D Scanning Rig at Magna',
    date: 'May 2025',
    location: 'Ramos Arizpe, MX',
    description:
      'Developed a prototype 3D scanning rig using Kinect sensors to streamline quality assurance on the production floor.',
    tags: ['3D SCANNING', 'SOLIDWORKS', 'QC', 'KINECT'],
    image: 'https://picsum.photos/seed/3d-scanning/1600/900',
    format: 'A',
  },
  {
    id: 'humanoid-motion-mimicry',
    index: 5,
    title: 'Humanoid Motion Mimicry',
    date: 'Mar 2025',
    location: 'Saltillo, MX',
    description:
      'Programmed a humanoid robot with Dynamixel actuators to mimic human movements, exploring motion capture and inverse kinematics.',
    tags: ['ROBOTICS', 'DYNAMIXEL', 'KINEMATICS', 'BIPEDAL'],
    image: 'https://picsum.photos/seed/humanoid-robot/1600/900',
    format: 'B',
  },
  {
    id: 'self-stabilizing-sphere',
    index: 6,
    title: 'Self-Stabilizing Sphere',
    date: 'Nov 2024',
    location: 'Saltillo, MX',
    description:
      'Spherical robot with internal motion control using gyroscope, accelerometer, DC motors, and Raspberry Pi Pico.',
    tags: ['ROBOTICS', 'EMBEDDED', '3D PRINTING', 'PYTHON'],
    image: 'https://picsum.photos/seed/sphere-1/1600/900',
    format: 'C',
    images: [
      'https://picsum.photos/seed/sphere-1/1600/900',
      'https://picsum.photos/seed/sphere-2/1600/900',
      'https://picsum.photos/seed/sphere-3/1600/900',
    ],
  },
  {
    id: 'gravity-racer',
    index: 7,
    title: 'Gravity Racer',
    date: 'May 2024',
    location: 'Mesa de las Tablas, MX',
    description:
      'Designed and built a gravity-powered race car for a regional downhill competition, winning 2nd place through precision machining and performance optimization.',
    tags: ['MACHINING', 'COMPETITION', 'FABRICATION', 'DESIGN'],
    image: 'https://picsum.photos/seed/gravity-racer/1600/900',
    format: 'A',
  },
];
