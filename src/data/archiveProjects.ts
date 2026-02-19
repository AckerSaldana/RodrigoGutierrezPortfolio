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
    id: 'three-way-speaker',
    title: 'Three-Way Speaker System with Passive Crossover Filter',
    year: 2023,
    description:
      'Designed and built a three-way speaker cabinet with a custom passive crossover filter network, tuning cutoff frequencies for woofer, midrange, and tweeter to achieve balanced frequency response.',
    tags: ['ACOUSTICS', 'ELECTRONICS', 'FABRICATION'],
    image: 'https://static.wixstatic.com/media/ef03dd_bdfd209b566545269e9bc55d5ad91d39~mv2.jpg',
  },
  {
    id: 'bldc-motor-prototype',
    title: 'Custom-Built BLDC Motor Prototype',
    year: 2023,
    description:
      'Hand-wound a brushless DC motor from scratch: wound stator coils, assembled a 3D-printed rotor structure, and verified magnetic field activation through each coil phase. Rotation was not achieved due to insufficient neodymium magnet strength, but the electromagnetic principles were validated through bench testing.',
    tags: ['ELECTRICAL', 'MOTORS', 'FABRICATION'],
    image: 'https://static.wixstatic.com/media/ef03dd_07518a40f63c449d905cf5219406422b~mv2.jpg',
  },
  {
    id: 'water-leveling-system',
    title: 'Multi-Level Water Leveling System with Energy Recovery',
    year: 2022,
    description:
      'Built a multi-tank water leveling system from a wooden structure, using Bernoulli\'s principle to distribute pressure across levels. A small motor at the final stage recovers kinetic energy from the flowing water, demonstrating basic energy recovery in fluid systems.',
    tags: ['AUTOMATION', 'EMBEDDED', 'FLUID SYSTEMS'],
    image: 'https://static.wixstatic.com/media/ef03dd_1320fbe8f26e4f388cd07cf491f5faee~mv2.jpg',
  },
  {
    id: 'automated-blind',
    title: 'Automated Industrial Blind Prototype',
    year: 2024,
    description:
      'Prototyped a motorized roller blind system using Arduino and ultrasonic sensors to track curtain position in real time. An LCD displays current status and an emergency stop button provides a hardware safety cutoff.',
    tags: ['AUTOMATION', 'ARDUINO', 'MECHANICAL'],
    image: 'https://static.wixstatic.com/media/ef03dd_b7b5d14980d54f4095e107e74f0653c8~mv2.jpg',
  },
  {
    id: 'pisa-exam-interface',
    title: 'PISA Exam Practice Interface in Python',
    year: 2022,
    description:
      'Developed an interactive Python GUI application with a canvas-based interface where questions are rendered as images and students navigate by clicking visual buttons — replicating the look and feel of the actual PISA exam environment.',
    tags: ['PYTHON', 'EDUCATION', 'SOFTWARE'],
    image: 'https://static.wixstatic.com/media/ef03dd_a672caa64e0f4b8695b9877035d2bdb4f000.jpg',
  },
  {
    id: 'pvc-underwater-rov',
    title: 'PVC Underwater ROV for Task Execution',
    year: 2022,
    description:
      'Assembled a tethered underwater ROV from PVC pipe, powered by a lead-acid battery and controlled through an Ethernet tether. Operators command the vehicle using 3-position toggle switches, enabling directional thruster control for object retrieval and inspection tasks in a pool environment.',
    tags: ['ROBOTICS', 'UNDERWATER', 'FABRICATION'],
    image: 'https://static.wixstatic.com/media/ef03dd_5b982c3e856845cea3c7c58234cfa8b9~mv2.jpg',
  },
  {
    id: 'sea-bin',
    title: 'Conceptual Sea Bin for SDG-Inspired Water Cleanup',
    year: 2024,
    description:
      'Built a floating water-surface cleanup device targeting SDG 14 (Life Below Water), using a submersible water pump, PVC piping, and a bucket-based collection structure. Debris-laden water is drawn in by the pump and filtered through the bucket assembly, controlled by a simple on/off switch.',
    tags: ['SUSTAINABILITY', 'DESIGN', 'SDG'],
    image: 'https://static.wixstatic.com/media/ef03dd_0f8953116e2f4856a9842f4ee5770ded~mv2.jpg',
  },
  {
    id: 'cardboard-chair',
    title: 'Cardboard Chair for Visually Impaired Children',
    year: 2023,
    description:
      'Engineered a load-bearing chair from corrugated cardboard using structural honeycomb stacking and interlocking joints, designed with tactile cues to support independent seating for visually impaired children.',
    tags: ['INCLUSIVE DESIGN', 'FABRICATION', 'STRUCTURAL'],
    image: 'https://static.wixstatic.com/media/ef03dd_52884e2ae3124129901616c306c9ccc0~mv2.jpg',
  },
  {
    id: 'laser-cut-can-crusher',
    title: 'Laser-Cut Wooden Can Crusher',
    year: 2024,
    description:
      'Designed and laser-cut a mechanical can crusher from plywood using a toggle-linkage mechanism, optimizing force multiplication to crush aluminum cans with minimal user effort.',
    tags: ['LASER CUTTING', 'MECHANISM DESIGN', 'FABRICATION'],
    image: 'https://static.wixstatic.com/media/ef03dd_fb8ebb1912f2433b8d57a7aa0a25b7ac~mv2.jpg',
  },
  {
    id: 'automated-transport-cart-polsa',
    title: 'Automated Transport Cart – Polsa',
    year: 2024,
    description:
      'Designed an autonomous guided cart for internal logistics at Polsa, built on a PTR steel frame and controlled by a Raspberry Pi Pico. Power is transferred to the wheels through a gear-and-chain drivetrain, automating repetitive material transport routes on the factory floor.',
    tags: ['AUTOMATION', 'EMBEDDED', 'MANUFACTURING'],
    image: 'https://static.wixstatic.com/media/ef03dd_57ef4649bfff4029a85b93192bd9babd~mv2.jpg',
  },
];
