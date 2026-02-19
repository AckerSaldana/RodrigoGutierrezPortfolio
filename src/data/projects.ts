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
      'Led conceptual and mechanical design for Team Romeo\'s entry in the XPRIZE Wildfire competition in collaboration with GTI. Focused on high-payload airframe architecture, rapid area-scanning flight profiles, and targeted suppression payload integration.',
    tags: ['DRONES', 'XPRIZE', 'CAD', 'LEADERSHIP'],
    image: 'https://static.wixstatic.com/media/ef03dd_d91ac51925f54494a857088718a53af5~mv2.jpg',
    format: 'A',
    images: [
      'https://static.wixstatic.com/media/ef03dd_d91ac51925f54494a857088718a53af5~mv2.jpg',
      'https://static.wixstatic.com/media/ef03dd_5db4a4fc50a7411e971aa8da4ccbf3f7~mv2.jpg',
      'https://static.wixstatic.com/media/ef03dd_ee7eb8c7a1844cdabb3602d08bd8647af000.jpg',
      'https://static.wixstatic.com/media/ef03dd_34a92b350a5a48fc8c3a97a96a48fcd2f000.jpg',
      'https://static.wixstatic.com/media/ef03dd_e1f85b3648bb4f8c9c77db919d7ff660f000.jpg',
      'https://static.wixstatic.com/media/ef03dd_9b86f8aeac3b4f3bb16e5e9b42be2dc6f000.jpg',
      'https://static.wixstatic.com/media/ef03dd_2a8eed377002425a83468ad239b802d2f000.jpg',
    ],
  },
  {
    id: 'kuka-gripper-design',
    index: 2,
    title: 'KUKA Gripper Design',
    date: 'Nov 2024',
    location: 'Saltillo, MX',
    description:
      'Led CAD design of a GecVac-style suction gripper for integration with a KUKA KRC5 arm. Modeled and simulated in KUKASim, then validated through iterative physical prototyping and calibration runs on the production cell.',
    tags: ['ROBOTICS', 'KUKA', 'CAD', 'MANUFACTURING'],
    image: 'https://static.wixstatic.com/media/ef03dd_e0849d6c3420442295cc7b826714ce32~mv2.png',
    format: 'B',
    images: [
      'https://static.wixstatic.com/media/ef03dd_e0849d6c3420442295cc7b826714ce32~mv2.png',
      'https://static.wixstatic.com/media/ef03dd_7f4513c8b40840fe95061e54d21b32bb~mv2.png',
      'https://static.wixstatic.com/media/ef03dd_fa3ee24d7de649b9a0cc71df905c7bc7f000.jpg',
      'https://static.wixstatic.com/media/ef03dd_89bc29db5add48cbb9e1644c37ed9482~mv2.png',
    ],
  },
  {
    id: 'rgbd-research-cinvestav',
    index: 3,
    title: 'RGB-D Research at CINVESTAV',
    date: 'Feb 2025',
    location: 'Ramos Arizpe, MX',
    description:
      'Research at CINVESTAV Saltillo on RGB-D sensing for robotic perception. Work spans point cloud acquisition, semantic segmentation, and spatial mapping pipelines aimed at enabling autonomous manipulation in unstructured environments.',
    tags: ['VISION', 'POINT CLOUDS', 'RESEARCH', 'ROBOTICS'],
    image: 'https://static.wixstatic.com/media/ef03dd_f270020e932f451bba66441b75c4657b~mv2.png',
    format: 'C',
    images: [
      'https://static.wixstatic.com/media/ef03dd_f270020e932f451bba66441b75c4657b~mv2.png',
      'https://static.wixstatic.com/media/ef03dd_fd7157c35f7045779941acd3585981ed~mv2.png',
      'https://static.wixstatic.com/media/ef03dd_7cb8f6ba90b94b3fb86933d99107d1bc~mv2.png',
    ],
  },
  {
    id: '3d-scanning-rig-magna',
    index: 4,
    title: '3D Scanning Rig at Magna',
    date: 'May 2025',
    location: 'Ramos Arizpe, MX',
    description:
      'Designed and built a production-floor 3D scanning rig using a Microsoft Kinect sensor and a custom SolidWorks-modeled fixture. The system captures dimensional data of automotive parts for real-time quality control without interrupting line throughput.',
    tags: ['3D SCANNING', 'SOLIDWORKS', 'QC', 'KINECT'],
    image: 'https://static.wixstatic.com/media/ef03dd_8896320d3685451a9c1fd07f947c1a0f~mv2.jpeg',
    format: 'A',
  },
  {
    id: 'humanoid-motion-mimicry',
    index: 5,
    title: 'Humanoid Motion Mimicry',
    date: 'Mar 2025',
    location: 'Saltillo, MX',
    description:
      'Built during a one-week TEC21 intensive challenge: programmed a bipedal humanoid robot using Dynamixel servo actuators to mirror human upper-body motion in real time, solving inverse kinematics on-board within strict time and hardware constraints.',
    tags: ['ROBOTICS', 'DYNAMIXEL', 'KINEMATICS', 'BIPEDAL'],
    image: 'https://static.wixstatic.com/media/ef03dd_97fab624c9054e6f9008ed6847f1fb66f000.jpg',
    format: 'B',
  },
  {
    id: 'self-stabilizing-sphere',
    index: 6,
    title: 'Self-Stabilizing Sphere',
    date: 'Nov 2024',
    location: 'Saltillo, MX',
    description:
      'Spherical robot driven by an internal pendulum mechanism. Uses an MPU6050 IMU for orientation sensing, an H-bridge for motor direction control, a LiPo battery for untethered power, and a Raspberry Pi Pico running Python for closed-loop stabilization.',
    tags: ['ROBOTICS', 'EMBEDDED', '3D PRINTING', 'PYTHON'],
    image: 'https://static.wixstatic.com/media/ef03dd_f599ac31145e40c08124837092995d38~mv2.jpg',
    format: 'C',
    images: [
      'https://static.wixstatic.com/media/ef03dd_f599ac31145e40c08124837092995d38~mv2.jpg',
      'https://static.wixstatic.com/media/ef03dd_e78b90a39f1f4039b11dae598af85eac~mv2.jpg',
      'https://static.wixstatic.com/media/ef03dd_730bf39707ac411bbbed0bc491c2c1f6~mv2.jpg',
      'https://static.wixstatic.com/media/ef03dd_1e704f19796946a58f22a8390d496ba3~mv2.jpg',
      'https://static.wixstatic.com/media/ef03dd_3fbbdd6394da4ded85615314aeef3da4~mv2.jpg',
      'https://static.wixstatic.com/media/ef03dd_714ca12c58c24b01a7e1e44a0732726df000.jpg',
      'https://static.wixstatic.com/media/ef03dd_d9b5a9957b5640fb92734977256f09baf000.jpg',
      'https://static.wixstatic.com/media/ef03dd_7cc1d8d05d3d45438697ab60a3e4edf8~mv2.jpg',
    ],
  },
  {
    id: 'gravity-racer',
    index: 7,
    title: 'Gravity Racer',
    date: 'May 2024',
    location: 'Mesa de las Tablas, MX',
    description:
      'Designed and precision-machined a gravity-powered race car for a regional downhill competition. Took 2nd place through careful weight distribution, aerodynamic shaping, and CNC-milled chassis components that minimized friction losses.',
    tags: ['MACHINING', 'COMPETITION', 'FABRICATION', 'DESIGN'],
    image: 'https://picsum.photos/seed/gravity-racer/1600/900',
    format: 'A',
  },
  {
    id: 'vex-u-world-championship',
    index: 8,
    title: 'VEX U – World Championship',
    date: 'Apr 2024',
    location: 'Dallas, TX',
    description:
      'Programmer for team ITESM3 in VEX U, the collegiate division of VEX Robotics. Developed autonomous routines and driver-control code in VEXcode and RobotC — optimizing sensor feedback, motion accuracy, and subsystem integration — helping the team qualify for the VEX Robotics World Championship in Dallas.',
    tags: ['ROBOTICS', 'VEX U', 'PROGRAMMING', 'COMPETITION'],
    image: 'https://static.wixstatic.com/media/ef03dd_a36d5e8276f84073b5f120486a3f5695~mv2.jpg',
    format: 'B',
    images: [
      'https://static.wixstatic.com/media/ef03dd_a36d5e8276f84073b5f120486a3f5695~mv2.jpg',
      'https://static.wixstatic.com/media/ef03dd_3c501bfb956e4c159f8ba191c41c16a0~mv2.jpg',
      'https://static.wixstatic.com/media/ef03dd_470ef71c9f194cf6ae2baca09a705b36~mv2.jpg',
      'https://static.wixstatic.com/media/ef03dd_aced4b4f24964b8da9b894d00578f44b~mv2.jpg',
      'https://static.wixstatic.com/media/ef03dd_97d2f74843394ce6903c744db1be909c~mv2.jpg',
      'https://static.wixstatic.com/media/ef03dd_19d7bba6b8c1421a87d47a712e40df72~mv2.png',
      'https://static.wixstatic.com/media/ef03dd_11f9217cbde943b18a150a49a57197fd~mv2.png',
      'https://static.wixstatic.com/media/ef03dd_ba2c605b119a4810976727f821568d2b~mv2.jpg',
      'https://static.wixstatic.com/media/ef03dd_20c077b95f2249eb9a5f3df1b8f73244f000.jpg',
      'https://static.wixstatic.com/media/ef03dd_e8f6b653dd8743a8ba6b7e23a8a7bd2a~mv2.jpg',
    ],
  },
];
