import { Product, Athlete, FieldEvent, LeaderboardEntry, Article } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Quantum Aero Hoodie v2',
    category: 'outerwear',
    categoryLabel: 'OUTERWEAR LAB',
    price: 185.00,
    badge: 'CORE',
    badgeType: 'core',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqBEWBCLUXjH2wQ5WPxq_fb9KULa9tUPRppui_Zpp5uzA5A_wF5nzHl9idE-X-NKrKVkG6Y6YYC_QYnkvESd_XCTyPVtgH0b3p1Ea3qPfDYy4S_AaIeGvlr1wb7ZCIPZLlbF1wn1aEgPohLrwETqeVQ5adY_5Rqnrp-oYOMP6LHDCMlxM420ve2Gzt-Tdo2qVmE-V3HuElYU58vfTM5eJUCxmzBzUrMEoR_0oDvRNovvb5KT-HbqWJ',
    alt: 'High tech athletic jacket designed in deep obsidian black with architectural ergonomic shoulder panels in studio light',
    description: 'Tri-density composite membrane crafted with micro-ventilation lattices. Heat-regulating core with laser-cut ultrasonic bonding for absolute storm resistance.',
    colors: ['#000000', '#e2e2e2'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'prod-2',
    title: 'Hyper-Flex Track Pant 01',
    category: 'performance',
    categoryLabel: 'PERFORMANCE',
    price: 140.00,
    badge: 'NEW',
    badgeType: 'new',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsRI37H9-DuUo9Uf5Xm8QkNxSzo7Y7hrJ8h6idCjWZogvFkl5XlKpX8__Ty6CzwaYd1fzdZaD_l-_XDAhMjjbU5MkdE5ysXCzQ7qaMKBcWXL78QTXu0ycOoC5LcHIAQ5pyJ54yjh_BBsBfHRLd7d0oFoNLpRWIbz0D4p7_lOIPgV-ZqQH4ENpd1oELNrPGeD7o0Sia4JFk9Q9ZqB8zNK5scza8SK6h2kXA1FNJuLhPneFs778IJqyJ',
    alt: 'Technical urban track pants with ergonomic knee articulated patterning and waterproof matte utility zip pockets on white backdrop',
    description: '4-way stretch ballistic nylon with articulated dart knees and waterproof magnetic pocket closures engineered for intense urban mobility and high-cadence strides.',
    colors: ['#000000'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'prod-3',
    title: 'Kinetic Velocity Runner',
    category: 'footwear',
    categoryLabel: 'FOOTWEAR KINETICS',
    price: 220.00,
    badge: 'LIMITED / 500',
    badgeType: 'limited',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCm86an99AJ_Mt3D-O739HPzdUxHnadnGGvwQOQH7KKt-rTFKU40qlKgJ_7P77nhlArGkjis0H1JaN0wQ7OefXXjqIm8TZ4kNxYZq3J3Uzr5LTOX4rJZp7mY6QMUWntn1eRwIUzAMobHo5N7CvkvFulKQCxI7MKgRHM9YM4xwQBCy9n7qfr8HqG2fP4Si5297p2hjNM4OIO4oJfvfnD3p764uvAWLzGJvUkVi3AM9Mi6IhQBRzejdRr',
    alt: 'Stealthy technical running shoe with carbon fiber mid-plate and reflective electric cyan thread highlights floating in air',
    description: 'Dual-density supercritical foam with an integrated 3K full-length carbon propulsion plate and ultra-breathable matrix knit shell. Calibrated for instant energy return.',
    colors: ['#0db5ed', '#000000'],
    sizes: ['US 8.5', 'US 9.5', 'US 10.5', 'US 11.5']
  },
  {
    id: 'prod-4',
    title: 'Carbon Modular Vest',
    category: 'outerwear',
    categoryLabel: 'OUTERWEAR LAB',
    price: 195.00,
    badge: 'EXPERIMENTAL',
    badgeType: 'experimental',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9Qw8wr-3JcP0nfH0XDGMYIjNqd9XjomnxZxHBpwCZP0np-3azVvuUHW82-21cDXIHzzmPIwn7y6Cmf-2Bgy5BkFihjkN7zB1L5JpB4z75rmPiY0YGtxAXDXRdivoZIYVXuJaF03WDTVIX-m5qjoXwUNUT1xKDsLaMij7ShumJl8Ze7R7iqazVQTTRX-7wKDwQ8CdgI18IHtJdnmeZAYfN2_yb8H11eH2X1RCEun3rKnrT8rC4rkov',
    alt: 'Futuristic modular tactical chest rig vest with carbon fiber reinforcement clips and water repellent finish',
    description: 'Modular load-bearing system crafted with lightweight aramid panels. Fidlock magnetic buckles and hydration port routing for sustained high-intensity city operations.',
    colors: ['#000000'],
    sizes: ['S/M', 'L/XL']
  }
];

export const ATHLETES_DATA: Athlete[] = [
  {
    id: 'ath-1',
    name: 'Maya Chen',
    tagline: 'Urban Sprint & Parkour Kinetics',
    location: 'Taipei / Paris',
    badge: 'OLYMPICS FINALIST · 100M',
    badgeColor: 'bg-[#0db5ed] text-black',
    quote: 'When you move at maximum velocity, friction isn\'t just resistance—it\'s feedback. Quantum gear disappears on the skin.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqFuw0BZ6qRLIYR-36nfOjr5BkkBml5KIc0X6fpgX6j68dxjzsn5eh2v6LuZnQ47mc4H4cMSvYCprlb6xEkJiLfWM54nY6tyg3tI-1HwJigpGh03qKFm0pJTJb6qerypNwdYXAlGGljTyvW513VkWh2lUsVm-fKQ3Bbu58KUBDLII7SnxzkrQU3lGnw7WH2HZ_0CZ2yPxt7y4894ePdwO4refM2fWy1KQWgfM3vVb6YUINg9Um2F1R',
    alt: 'Dynamic black and white cinematic portrait of an Asian female urban sprint and parkour athlete leaping between concrete architectural pillars',
    bio: 'Maya operates at the intersection of competitive sprint athletics and free-form urban parkour. Her testing feedback on textile shear forces under rapid lateral decelerations directly informed the seam construction in the Aero Hoodie v2.',
    stats: [
      { label: 'Top Velocity', value: '34.8 km/h' },
      { label: '100m Personal Best', value: '11.02s' },
      { label: 'Active Cohort', value: 'Alpha-09' }
    ],
    featuredGear: ['Quantum Aero Hoodie v2', 'Hyper-Flex Track Pant 01']
  },
  {
    id: 'ath-2',
    name: 'Marcus Vance',
    tagline: 'Street Basketball & Dunk Artisan',
    location: 'Brooklyn, NYC',
    badge: 'RED BULL REIGN CHAMP',
    badgeColor: 'bg-white text-black',
    quote: 'Asphalt does not forgive weakness. You need garments that absorb the shock without restricting horizontal cut angles.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB05pO8sN7r3bv1Gl6niIxR4bD_pFFTtbQJKLDb_Q06hV_JEFrcQD3pC4W2Oeh17JnAC1Zce6MQbzZzeOwmUjNJMoKJi2pxkguYO8neiAcFlfd1yx8a9nMUa-lbd8gkHv1RV2a-pUQ6QsGnpGPVKaePtFohxSFub2pPQd12TNZZ4hLMIhTjxgJOBhSkFcszCO-nyPK_9RsyoJd5UnCASNAXHFvYkNEY_vLDarEQR4TnYFCihPSk3wwf',
    alt: 'Dramatic high contrast sports portrait of an African American male basketball athlete mid flight above an asphalt street court at twilight',
    bio: 'A native of Red Hook, Brooklyn, Marcus pioneered the raw athletic style seen across East Coast outdoor streetball leagues. He stress-tests abrasion thresholds and footwear mid-plate response during 48-inch vertical drops.',
    stats: [
      { label: 'Vertical Jump', value: '48.5 in' },
      { label: 'Tournaments Won', value: '14 Titles' },
      { label: 'Active Cohort', value: 'Grid-NYC' }
    ],
    featuredGear: ['Kinetic Velocity Runner', 'Carbon Modular Vest']
  },
  {
    id: 'ath-3',
    name: 'Elena Rostova',
    tagline: 'High-Altitude Endurance & Trail Ultra',
    location: 'Chamonix',
    badge: 'UTMB 100MI PODIUM',
    badgeColor: 'bg-[#006687] text-white',
    quote: 'At 3,000 meters in zero visibility, clothing is life support. The thermal balance of the Aero membrane is unmatched.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_3gMcFpbD3upkKQKziCkoVQB7prmfLipqhP7XBnF2i6xM-0WxkKymfOu03EciDOUOnfNHbv4XfMgqmjdAwq8Fu6P00nrX97e7k69G_D0yvyYdYm6UazpnbzQfZ4x_JogjlJ2JSs21_SU1BBGIjVR94vxq_663owqrJubKvEzOHYEQiKIEqMf3hn3uSwUlIw8E0XSnilBWIs3qdDi5OUdIRyNeD6dv-8hWAC54NC2JnX9ym9yay4f-',
    alt: 'Epic outdoor portrait of a female endurance trail runner standing on a rocky fog-covered alpine ridge during sunrise',
    bio: 'Elena conquers alpine ridges and extreme elevation gain in sub-zero atmospheric temperatures. Her high-altitude testing grounds in the Mont Blanc massif define the weatherproofing standards of our Lab Series.',
    stats: [
      { label: 'Longest Ultra', value: '171 km' },
      { label: 'Elevation Peak', value: '4,808 m' },
      { label: 'Active Cohort', value: 'Alpine-04' }
    ],
    featuredGear: ['Quantum Aero Hoodie v2', 'Carbon Modular Vest']
  }
];

export const FIELD_EVENTS: FieldEvent[] = [
  {
    id: 'evt-1',
    title: 'NIGHT RUN 04 — CHENNAI',
    month: 'OCT',
    day: '18',
    status: 'open',
    statusLabel: 'REGISTRATION OPEN',
    typeLabel: '10 KM NIGHT RACE',
    location: 'Radial Circuit · Coastal Expressway & Old Harbor Docks',
    bibsLeft: 42,
    description: 'A relentless midnight pack race under coastal fog lamps. Features live radar timing splits and high-cadence pacing through decommissioned container docks.'
  },
  {
    id: 'evt-2',
    title: 'UNDERGROUND 3X3 HOOPS — TOKYO',
    month: 'NOV',
    day: '02',
    status: 'warning',
    statusLabel: 'FEW SPOTS LEFT',
    typeLabel: 'TOURNAMENT',
    location: 'Shibuya Rooftop Cage · 16 Invitational Squads',
    bibsLeft: 3,
    description: '16 hand-picked squads battling under rain-soaked neon lighting atop Shibuya Sector 04. Single elimination rules with streetball pacing.'
  },
  {
    id: 'evt-3',
    title: 'CONCRETE ASCENT — BERLIN',
    month: 'DEC',
    day: '05',
    status: 'upcoming',
    statusLabel: 'UPCOMING NOTIFICATION',
    typeLabel: 'VERTICAL CLIMB',
    location: 'Teufelsberg Radar Dome · Speed Stair & Incline Dash',
    description: 'Extreme elevation dash up the Cold War radar installation ruins. Cold-weather protocol enforced with high thermal demands.'
  }
];

export const LEADERBOARD_DATA: Record<string, LeaderboardEntry[]> = {
  weekly: [
    { rank: '01', callsign: 'Taro_Cyber', initials: 'TC', node: 'Tokyo Sector 03', points: 12480 },
    { rank: '02', callsign: 'Anya_Leap', initials: 'AL', node: 'Berlin Sector 09', points: 11920 },
    { rank: '03', callsign: 'Kaelen_Frost', initials: 'KF', node: 'Toronto Node', points: 10850 },
    { rank: '04', callsign: 'Rhea_Static', initials: 'RS', node: 'Seoul Node', points: 9940 },
    { rank: '05', callsign: 'Dev_Kinetic', initials: 'DK', node: 'London Docks', points: 8720 },
  ],
  monthly: [
    { rank: '01', callsign: 'Anya_Leap', initials: 'AL', node: 'Berlin Sector 09', points: 48920 },
    { rank: '02', callsign: 'Taro_Cyber', initials: 'TC', node: 'Tokyo Sector 03', points: 46210 },
    { rank: '03', callsign: 'Sora_Apex', initials: 'SA', node: 'Kyoto North', points: 41800 },
    { rank: '04', callsign: 'Kaelen_Frost', initials: 'KF', node: 'Toronto Node', points: 39550 },
    { rank: '05', callsign: 'Rhea_Static', initials: 'RS', node: 'Seoul Node', points: 37200 },
  ],
  alltime: [
    { rank: '01', callsign: 'Kaelen_Frost', initials: 'KF', node: 'Toronto Node', points: 184500 },
    { rank: '02', callsign: 'Taro_Cyber', initials: 'TC', node: 'Tokyo Sector 03', points: 172900 },
    { rank: '03', callsign: 'Anya_Leap', initials: 'AL', node: 'Berlin Sector 09', points: 168400 },
    { rank: '04', callsign: 'Maya_Sprint', initials: 'MS', node: 'Taipei Metro', points: 154100 },
    { rank: '05', callsign: 'Marcus_NYC', initials: 'MV', node: 'Brooklyn Grid', points: 142800 },
  ]
};

export const ARTICLES_DATA: Article[] = [
  {
    id: 'art-1',
    title: 'The Evolution of Technical Streetwear in High-Intensity Sprinting',
    date: 'OCT 12, 2025',
    readTime: '6 MIN READ',
    author: 'DEVON V.',
    category: 'SPORT & KINETICS',
    categoryColor: 'bg-black text-white',
    excerpt: 'An architectural breakdown of how membrane shear stresses, sweat dissipation channels, and aerodynamics are rewriting sprint aesthetics.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXrrVFTSbDtN7UMnFMzAL9Z0oLTmKMxsAOKssScuu6jg-xISq8phR-GkKHD19YQBJ4UDKe5I-I4eJcCcd1M27G1tBMrU3Maz8mQG5dWRO95XUtQG5kBelkNAhxbeHC8-HVyD9_EOOSJ0IIaV0sRNNKNQgVpZembV4ygFCZlA_h8zap1VXPyDjt60sAjBxtbRMWe9oBwhRdRo9izqj-b_T52lyAf3R92w3aeX9Sb87BK2Z5hMEkdtWG',
    alt: 'Monochrome urban athletics high contrast editorial photo with runners moving through a concrete subway tunnel with motion blur',
    content: [
      'In traditional sportswear design, apparel was viewed merely as a uniform—a lightweight covering designed not to impede body movement. Today, high-velocity urban athletes recognize that textiles actively alter biological kinetics.',
      'Through computational fluid dynamics (CFD) modeling of human sprinting at 30+ km/h, our aerodynamic lab observed that standard textile micro-creasing creates micro-vortices of parasitic drag across the quadriceps and torso.',
      'The Aero v2 composite membrane solves this by utilizing microscopic unidirectional channels that guide boundary layer airflow around the pelvis, reducing drag coefficient by 4.2% while expelling convective moisture in real-time.',
      'The outcome is a silhouette that looks tailored for brutalist city streets, yet performs with the surgical precision of an aerospace wind tunnel prototype.'
    ]
  },
  {
    id: 'art-2',
    title: 'Soundtracks of the Underground City Run',
    date: 'OCT 08, 2025',
    readTime: '4 MIN READ',
    author: 'SORA TANAKA',
    category: 'CULTURE',
    categoryColor: 'bg-[#006687] text-white',
    excerpt: 'From heavy bass grime in East London to minimal techno in Kreuzberg, we curate the definitive auditory rhythms fueling midnight urban packs.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkFs9xusA9w2b-o2YmY55cdRU9CGII_ILnaa1Zk1VcN_cE8epMuzWIgnJuMF1cy5AdAONpHqXuuTGehT70-73M-8MohKLMcP_pltAsUy4uZpcIAnL3eYp_LFHsczs9X3DGDIFmGP5u5fbkMI5UyryL2JQLcwc9C4kXGznVSUvr3-2Nd_kGyZrK8NLdsz51jItxy_aSOI0yyy870ZtKyhPF_j3-OXTt-Apc1BimkVSu2hMIM2GRTVjV',
    alt: 'Night city lights reflecting on rain soaked asphalt street with runner silhouette in technical garments',
    content: [
      'At 1:00 AM, the metropolis ceases to belong to vehicular traffic and transforms into an expansive acoustic reverberation chamber. Footsteps on rain-soaked tarmac sync precisely with the sub-bass frequencies of our collective headphones.',
      'Across Tokyo, Berlin, and London, urban running crews have developed distinct acoustic identities. In Hackney, it is 140 BPM UK garage and drill rhythms pacing anaerobic intervals between tower blocks.',
      'In Berlin, continuous 132 BPM hypnotic 4/4 kicks provide steady pacing for 30-kilometer nocturnal endurance missions down abandoned railway corridors.',
      'We gathered our cohort sound engineers to produce curated telemetry frequency mixes synced to heart rate zones 3 through 5.'
    ]
  }
];
