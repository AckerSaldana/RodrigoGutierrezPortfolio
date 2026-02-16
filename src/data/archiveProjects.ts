export interface ArchiveProjectData {
  id: string;
  title: string;
  year: number;
  description: string;
  tags: string[];
  image: string;
}

export const archiveProjects: ArchiveProjectData[] = [
  {
    id: 'cnc-pen-plotter',
    title: 'CNC Pen Plotter',
    year: 2023,
    description:
      'Built a two-axis CNC pen plotter from scratch using stepper motors, an Arduino Uno, and a custom G-code interpreter for precise vector drawing.',
    tags: ['CNC', 'ARDUINO', 'FABRICATION'],
    image: 'https://picsum.photos/seed/cnc-plotter/800/600',
  },
  {
    id: 'line-following-bot',
    title: 'Line-Following Robot',
    year: 2023,
    description:
      'Developed a PID-controlled line-following robot with infrared sensor arrays, achieving top-three placement in an intercollegiate competition.',
    tags: ['ROBOTICS', 'PID', 'EMBEDDED'],
    image: 'https://picsum.photos/seed/line-bot/800/600',
  },
  {
    id: 'weather-station-iot',
    title: 'IoT Weather Station',
    year: 2024,
    description:
      'Designed a solar-powered weather station transmitting real-time data over LoRa to a custom dashboard built with Python and Grafana.',
    tags: ['IOT', 'LORA', 'PYTHON', 'GRAFANA'],
    image: 'https://picsum.photos/seed/weather-iot/800/600',
  },
  {
    id: 'fpga-traffic-controller',
    title: 'FPGA Traffic Controller',
    year: 2023,
    description:
      'Implemented a state-machine traffic light controller on an FPGA using VHDL, with pedestrian crossing logic and configurable timing.',
    tags: ['FPGA', 'VHDL', 'DIGITAL DESIGN'],
    image: 'https://picsum.photos/seed/fpga-traffic/800/600',
  },
  {
    id: 'robotic-arm-inverse-k',
    title: 'Robotic Arm Inverse Kinematics',
    year: 2024,
    description:
      'Programmed a 5-DOF robotic arm to solve inverse kinematics in real time, enabling pick-and-place operations guided by a vision system.',
    tags: ['ROBOTICS', 'KINEMATICS', 'OPENCV'],
    image: 'https://picsum.photos/seed/arm-ik/800/600',
  },
  {
    id: 'portable-oscilloscope',
    title: 'Portable Oscilloscope',
    year: 2024,
    description:
      'Designed a handheld oscilloscope around an STM32 microcontroller with a TFT display, capable of sampling signals up to 1 MHz.',
    tags: ['EMBEDDED', 'STM32', 'PCB DESIGN'],
    image: 'https://picsum.photos/seed/oscilloscope/800/600',
  },
  {
    id: 'solidworks-topology-opt',
    title: 'Topology Optimization Study',
    year: 2025,
    description:
      'Conducted topology optimization on a suspension upright using SolidWorks Simulation, reducing mass by 34% while maintaining structural targets.',
    tags: ['SOLIDWORKS', 'FEA', 'OPTIMIZATION'],
    image: 'https://picsum.photos/seed/topology-opt/800/600',
  },
  {
    id: 'ev-battery-monitor',
    title: 'EV Battery Monitor',
    year: 2025,
    description:
      'Created a CAN-bus battery monitoring system for a Formula SAE Electric vehicle, displaying cell voltages, temperatures, and SOC on a custom HMI.',
    tags: ['CAN BUS', 'FSAE', 'HMI', 'EMBEDDED'],
    image: 'https://picsum.photos/seed/ev-battery/800/600',
  },
];
