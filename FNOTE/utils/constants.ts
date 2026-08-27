/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Category, 
  NewsItem, 
  EventItem, 
  SocialChannelItem, 
  VacancyItem, 
  CharityProject, 
  BankAccountInfo,
  SubscriberItem,
  NewsletterDispatch
} from './types';

export const CATEGORIES: Category[] = [
  'Home',
  'Spiritual',
  'Ethiopia',
  'Multimedia',
  'Podcast',
  'Social',
  'Arts'
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Meskel Celebration in Addis Ababa: A Tapestry of Faith and Heritage',
    excerpt: 'Thousands gathered at Meskel Square to witness the Demera bonfire, a tradition spanning centuries that continues to inspire millions across the Ethiopian diaspora.',
    category: 'Spiritual',
    date: '2026-05-06',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    author: 'Abebe Kebede',
    content: 'The Demera celebration in Addis Ababa brought together over 200,000 faithful, religious scholars, and dignitaries at Meskel Square. Patriarchs delivered messages emphasizing unity, peaceful coexistence, and community stewardship.',
    isBreaking: true,
    views: 18420
  },
  {
    id: '2',
    title: 'Lalibela Resilience: Restoring the Sacred Rock-Hewn Monolithic Churches',
    excerpt: 'Comprehensive conservation efforts are underway with UNESCO and local craftsmen to preserve the structural integrity of Biete Giyorgis and Biete Medhani Alem.',
    category: 'Ethiopia',
    date: '2026-05-05',
    imageUrl: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80',
    author: 'Selam Tesfaye',
    content: 'The restoration initiative deploys non-invasive laser scanning, drainage rehabilitation, and traditional stone masonry techniques passed down through generations of Lalibela artisans.',
    views: 14230
  },
  {
    id: '3',
    title: 'Inter-Faith Youth Peace Accord Signed in Hawassa',
    excerpt: 'Leaders from the Inter-Religious Council of Ethiopia and youth representatives celebrate the conclusion of the 2026 National Unity & Reconciliation Forum.',
    category: 'Social',
    date: '2026-05-04',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    author: 'Zeleke Mamo',
    content: 'Over 400 youth ambassadors agreed on joint community welfare projects, tree planting initiatives, and cross-cultural dialogue programs across 12 regional states.',
    views: 9840
  },
  {
    id: '4',
    title: 'New Podcast Series: Ancient Ge\'ez Manuscripts and Digital Preservation',
    excerpt: 'Explore the journey of digitizing rare 14th-century illuminated manuscripts preserved in remote Lake Tana island monasteries.',
    category: 'Podcast',
    date: '2026-05-03',
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    author: 'Hanna Goshu',
    content: 'Archivist Kes Dr. Tewodros explains the high-resolution digital scanning process that makes ancient spiritual literature accessible to scholars globally.',
    views: 12150
  },
  {
    id: '5',
    title: 'Multimedia Highlights: Gonder\'s Timket Epiphany & Fasilides Baths',
    excerpt: 'A visual celebration of the sacred water blessings, ceremonial umbrellas, and choral hymns that define Epiphany in Ethiopia\'s historical capital.',
    category: 'Multimedia',
    date: '2026-05-02',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    author: 'Fnote Tsidk Editorial Team',
    content: 'Experience high-definition panoramic photography and audio recordings of liturgical chants performed by Saint Yared choir ensembles.',
    views: 22600
  },
  {
    id: '6',
    title: 'St. Yared Hymnology Conservatory Announces Annual Scholar Grants',
    excerpt: 'Fellowships offered for researchers documenting the distinct Digua and Zema notation systems of Ethiopian classical sacred music.',
    category: 'Arts',
    date: '2026-05-01',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    author: 'Mahlet Alemu',
    content: 'The conservatory offers ten fully funded research residencies for composers, musicologists, and heritage specialists.',
    views: 8750
  }
];

export const NEWS_ARTICLES = MOCK_NEWS.map(n => ({
  ...n,
  views: n.views || 5400
}));

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'ev-1',
    title: 'Holy Feast of Saint Gabriel (Kulubi Gabriel Pilgrimage & Broadcast)',
    category: 'Liturgical Feast',
    date: 'July 26, 2026',
    time: '04:30 AM – 02:00 PM (EAT)',
    location: 'Kulubi Gabriel Monastery, Dire Dawa Route / Live on Fnote Tsidk TV',
    description: 'Annual sacred pilgrimage featuring nocturnal vigil chants (Mahlet), Divine Liturgy, and direct nationwide high-definition broadcast.',
    isUpcoming: true,
    registrationOpen: false,
    isLiveBroadcast: true
  },
  {
    id: 'ev-2',
    title: 'Pan-Ethiopian Interfaith Peace & Youth Dialogue Symposium',
    category: 'Peace Dialogue',
    date: 'August 14, 2026',
    time: '09:00 AM – 05:00 PM (EAT)',
    location: 'UNECA Conference Center, Addis Ababa',
    description: 'Convened with the Inter-Religious Council of Ethiopia to discuss youth leadership in peacebuilding, shared heritage, and ethical digital communication.',
    isUpcoming: true,
    registrationOpen: true,
    isLiveBroadcast: false
  },
  {
    id: 'ev-3',
    title: 'St. Yared Sacred Choral Hymnology Festival 2026',
    category: 'Choir Concert',
    date: 'September 05, 2026',
    time: '03:00 PM – 08:30 PM (EAT)',
    location: 'Holy Trinity Cathedral Grounds, Addis Ababa',
    description: 'A major gathering of over 40 orthodox Sunday school choirs performing ancient Ge\'ez antiphons and traditional Ethiopian acoustic instruments.',
    isUpcoming: true,
    registrationOpen: true,
    isLiveBroadcast: true
  },
  {
    id: 'ev-4',
    title: 'Holy Synod Autumn Global Theological Assembly',
    category: 'Conference',
    date: 'October 12, 2026',
    time: '08:30 AM – 04:00 PM (EAT)',
    location: 'Patriarchate Headquarters, Addis Ababa',
    description: 'Bishops, scholars, and diocese delegates convene to assess pastoral guidance, digital ministry expansion, and historical monastery preservation.',
    isUpcoming: true,
    registrationOpen: false,
    isLiveBroadcast: true
  }
];

export const VACANCIES_DATA: VacancyItem[] = [
  {
    id: 'vac-1',
    title: 'Senior Theological Content Editor (Amharic & Ge\'ez)',
    department: 'Theology & Research',
    type: 'Full-time',
    location: 'Addis Ababa (On-site)',
    deadline: 'September 15, 2026',
    experience: '4+ Years in theological research or religious journalism',
    description: 'Lead Fnote Tsidk\'s doctrinal review desk, write insightful spiritual analyses, and edit patristic Ge\'ez translations.',
    requirements: [
      'Degree in Orthodox Theology, Philology, Literature, or equivalent spiritual scholarship',
      'Fluency in classical Ge\'ez text comprehension and high-level Amharic writing',
      'Experience in ecclesiastical publications or media editorial boards'
    ]
  },
  {
    id: 'vac-2',
    title: 'Broadcast Audio & Video Studio Engineer',
    department: 'Broadcast & Engineering',
    type: 'Full-time',
    location: 'Addis Ababa (On-site)',
    deadline: 'September 20, 2026',
    experience: '3+ Years in TV/Radio live broadcast production',
    description: 'Operate 24/7 master control room, live satellite/IP video uplinks, and optimize lossless audio streaming for liturgical transmissions.',
    requirements: [
      'BSc in Broadcast Engineering, Sound Technology, or Computer Science',
      'Proficiency in OBS, vMix, Blackmagic Design systems, and lossless Icecast/HLS pipelines',
      'Strong ability to troubleshoot multi-camera setups during live outdoor feasts'
    ]
  },
  {
    id: 'vac-3',
    title: 'Multilingual Digital Journalist & Reporter',
    department: 'Editorial & News',
    type: 'Full-time',
    location: 'Addis Ababa (On-site)',
    deadline: 'September 28, 2026',
    experience: '2+ Years in investigative or newsroom reporting',
    description: 'Cover regional diocese news, interfaith dialogue forums, and cultural preservation stories across Ethiopian regional states.',
    requirements: [
      'Degree in Journalism, Communications, or Social Sciences',
      'Fluency in Amharic and English; working knowledge of Afaan Oromoo or Tigrinya is a huge plus',
      'High commitment to journalistic ethics, fact-checking, and peaceful discourse'
    ]
  },
  {
    id: 'vac-4',
    title: 'Social Media Producer & Youth Engagement Lead',
    department: 'Digital & Social',
    type: 'Full-time',
    location: 'Hybrid',
    deadline: 'October 05, 2026',
    experience: '2+ Years in managing high-traffic spiritual or educational social channels',
    description: 'Create engaging short-form reels, Telegram broadcast packages, YouTube live stream management, and podcast clips for diaspora youth.',
    requirements: [
      'Proven track record in growing YouTube, Telegram, and TikTok channels',
      'Proficiency in Adobe Premiere, Photoshop, and mobile video editing tools',
      'Deep appreciation for sacred aesthetics, church history, and uplifting spiritual storytelling'
    ]
  },
  {
    id: 'vac-5',
    title: 'Volunteer Translators (Tigrinya, Afaan Oromoo, English)',
    department: 'Translation & Outreach',
    type: 'Volunteer',
    location: 'Remote / Diaspora',
    deadline: 'Open Rolling',
    experience: 'Passion for spiritual translation',
    description: 'Help translate weekly liturgical commentaries, synod announcements, and peace bulletins into regional and international languages.',
    requirements: [
      'Fluency in source and target languages',
      'Accurate religious vocabulary and reverence in translation',
      'Commitment of 3-5 hours per week'
    ]
  }
];

export const SOCIAL_CHANNELS: SocialChannelItem[] = [
  {
    id: 'yt',
    name: 'YouTube Official',
    platform: 'YouTube',
    handle: '@FnoteTsidkMedia',
    subscribers: '320,000+ Subscribers',
    followers: '320k',
    description: '24/7 Live Liturgical HD Stream, High Holy Day Documentaries, Sunday School Choirs, and Weekly Spiritual Discourses.',
    link: 'https://youtube.com',
    url: 'https://youtube.com',
    icon: 'youtube',
    badge: 'Official Broadcast',
    color: '#FF0000'
  },
  {
    id: 'tg',
    name: 'Telegram Channel & Audio',
    platform: 'Telegram',
    handle: 't.me/FnoteTsidkOfficial',
    subscribers: '185,000+ Members',
    followers: '185k',
    description: 'Daily morning prayers, audio hymns, PDF liturgical books, breaking synod circulars, and instant audio podcast drops.',
    link: 'https://telegram.org',
    url: 'https://telegram.org',
    icon: 'send',
    badge: 'Fastest Updates',
    color: '#229ED9'
  },
  {
    id: 'fb',
    name: 'Facebook Community',
    platform: 'Facebook',
    handle: 'facebook.com/FnoteTsidk',
    subscribers: '450,000+ Followers',
    followers: '450k',
    description: 'Photojournalism from ancient monasteries, historical anniversary coverage, and youth discussion forums.',
    link: 'https://facebook.com',
    url: 'https://facebook.com',
    icon: 'facebook',
    badge: 'Active Forum',
    color: '#1877F2'
  },
  {
    id: 'tt',
    name: 'TikTok Spiritual Shorts',
    platform: 'TikTok',
    handle: '@fnote_tsidk',
    subscribers: '210,000+ Followers',
    followers: '210k',
    description: '1-minute daily spiritual wisdom quotes, ancient Ge\'ez word origins, and choir chant snippets for youth.',
    link: 'https://tiktok.com',
    url: 'https://tiktok.com',
    icon: 'video',
    badge: 'Youth Outreach',
    color: '#000000'
  },
  {
    id: 'pod',
    name: 'Podcast (Spotify & Apple)',
    platform: 'Podcast',
    handle: 'Fnote Tsidk: Sacred Echoes',
    subscribers: '65,000+ Listeners',
    followers: '65k',
    description: 'Weekly deep-dives into patristics, monastic wisdom, and ethical life with senior scholars and hermits.',
    link: 'https://spotify.com',
    url: 'https://spotify.com',
    icon: 'headphones',
    badge: 'Audio Series',
    color: '#1DB954'
  }
];

export const PODCAST_EPISODES = [
  {
    id: 'p1',
    title: 'Episode 42: The Wisdom of Abba Garima Gospels',
    duration: '38:15',
    speaker: 'Dr. Berhanu Gebre',
    listeners: '14.2k',
    date: 'May 04, 2026',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 'p2',
    title: 'Episode 41: Fasting, Mindfulness & Contemporary Living',
    duration: '45:20',
    speaker: 'Sister Martha Wolde',
    listeners: '21.8k',
    date: 'Apr 28, 2026',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: 'p3',
    title: 'Episode 40: Sacred Architecture of the Debre Damo Cliff Monastery',
    duration: '52:10',
    speaker: 'Arch. Dawit Yohannes',
    listeners: '18.5k',
    date: 'Apr 21, 2026',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  }
];

export const ANNOUNCEMENTS = [
  {
    id: 'a1',
    title: 'Holy Synod Annual Spring Assembly & Pastoral Guidelines',
    date: 'May 12, 2026',
    tag: 'Official Synod',
    urgent: true
  },
  {
    id: 'a2',
    title: 'National Faith-Based Charity Medical Mission in Wolaita',
    date: 'May 18, 2026',
    tag: 'Humanitarian',
    urgent: false
  },
  {
    id: 'a3',
    title: 'Trinity Theological College 2026/2027 Admissions Open',
    date: 'June 01, 2026',
    tag: 'Education',
    urgent: false
  }
];

export const PEACE_STORIES = [
  {
    id: 'peace-1',
    title: 'The Inter-Religious Council of Ethiopia: Building Bridges of Harmony',
    description: 'Joint peace dialogues, inter-faith humanitarian caravans, and conflict mitigation training spanning all regional states.',
    impact: '120+ Communities Reached'
  },
  {
    id: 'peace-2',
    title: 'Youth Ambassadors for Compassion & Shared Values',
    description: 'Equipping the next generation with non-violent communication, cultural literacy, and joint social action initiatives.',
    impact: '4,500 Youth Certified'
  }
];

export const LOCATION_INFO = {
  name: 'Fnote Tsidk Spiritual Media Headquarters & Studios',
  address: 'Kazanchis, Guinea Conakry Street, Addis Ababa, Ethiopia',
  landmark: 'Behind UNECA Conference Center, Next to InterLuxury Plaza',
  coordinates: {
    lat: 9.0177,
    lng: 38.7668
  },
  phone: '+251 11 551 7070 / +251 91 123 4567',
  email: 'info@fnotetsidk.org',
  broadcastEmail: 'live@fnotetsidk.org',
  officeHours: 'Monday – Saturday: 8:00 AM – 6:30 PM (EAT)',
  studioHours: '24/7 Broadcast Operations',
  googleMapsUrl: 'https://maps.google.com/?q=9.0177,38.7668',
  embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5485973977235!2d38.764611!3d9.017700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef049c693%3A0x629571f3793eb128!2sKazanchis%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set'
};

export const CHARITY_PROJECTS: CharityProject[] = [
  {
    id: 'ch-1',
    title: 'Ancient Monasteries & Hermits Sustenance Relief Mission',
    category: 'Monastery Support',
    location: 'Waldiba, Debre Damo & Lake Tana Island Hermitages',
    date: 'Ongoing Initiative 2026',
    description: 'Providing organic grains, pure olive oil for sanctuary lamps, solar lighting kits, and medical first-aid kits for over 1,200 ascetics and elderly monks in remote desert monasteries.',
    beneficiaries: '1,200+ Ascetic Monks & Nuns',
    targetAmount: '3,500,000 ETB',
    raisedAmount: '2,850,000 ETB',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    organizer: 'Fnote Tsidk Monastic Outreach Fellowship',
    impactHighlight: 'Delivered 80 tons of grain and 120 solar illumination systems to 18 remote hermitages.'
  },
  {
    id: 'ch-2',
    title: 'Compassion Feast: Daily Food & Clothing for Vulnerable Elders & Orphans',
    category: 'Food & Relief Aid',
    location: 'Addis Ababa (Kazanchis, Merkato, Gullele) & Debre Birhan',
    date: 'Bi-Weekly Community Kitchen',
    description: 'Fnote Tsidk Media volunteer brigade serves nutritious hot meals, distributes warm traditional blankets (Gabi), and arranges shelter assistance for impoverished mothers and street youth.',
    beneficiaries: '3,400+ Families & Elders',
    targetAmount: '2,000,000 ETB',
    raisedAmount: '1,720,000 ETB',
    status: 'Ongoing',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    organizer: 'Fnote Tsidk Youth Volunteers (ማህበረ ሰናይ)',
    impactHighlight: 'Over 45,000 meals served across 6 parish dining halls in the past year.'
  },
  {
    id: 'ch-3',
    title: 'Rural Sunday School Literacy & Sacred Hymn Book Caravan',
    category: 'Youth & Education',
    location: 'Wollo, Gojjam, Sidama, and Keffa Rural Parishes',
    date: 'Annual Campaign 2026',
    description: 'Equipping rural children and deacon students with exercise books, Ge\'ez literacy primers (Dawit, Tsome Degua), slate boards, and acoustic traditional instruments (Begena, Kebero).',
    beneficiaries: '5,000+ Young Students',
    targetAmount: '1,500,000 ETB',
    raisedAmount: '1,380,000 ETB',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    organizer: 'St. Yared Youth Education Fund',
    impactHighlight: 'Distributed 14,000 hymn books and established 25 rural parish library corners.'
  },
  {
    id: 'ch-4',
    title: 'St. Luke Free Medical & Eye Surgery Mobile Caravan',
    category: 'Medical Caravan',
    location: 'North Shewa & South Gondar Highlands',
    date: 'Quarterly Expedition',
    description: 'Partnering with volunteer doctors, ophthalmologists, and nurses to conduct free cataract restoration surgeries, general health checkups, and diabetes screenings in underserved rural parishes.',
    beneficiaries: '2,800+ Rural Patients',
    targetAmount: '4,000,000 ETB',
    raisedAmount: '3,650,000 ETB',
    status: 'Ongoing',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    organizer: 'Fnote Tsidk Christian Medical Volunteers',
    impactHighlight: 'Successfully restored vision for 420 elderly pilgrims through free cataract interventions.'
  },
  {
    id: 'ch-5',
    title: 'Ancient Illuminated Manuscript & Church Wall Mural Preservation',
    category: 'Heritage Restoration',
    location: 'Tigray & Amhara Historical Monasteries',
    date: 'Long-term Conservation',
    description: 'Deploying traditional parchment conservators and micro-climate storage cabinets to protect 14th-17th century parchment Gospels and fragile vegetable-dye frescoes from humidity damage.',
    beneficiaries: '12 Historical Sanctuaries',
    targetAmount: '5,000,000 ETB',
    raisedAmount: '4,100,000 ETB',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    organizer: 'Sacred Heritage Conservation Trust',
    impactHighlight: 'Stabilized 85 ancient parchments and safeguarded 4 UNESCO-registered parish murals.'
  }
];

export const CHARITY_BANK_ACCOUNTS: BankAccountInfo[] = [
  {
    bankName: 'Commercial Bank of Ethiopia (CBE)',
    accountNumber: '1000 4892 3847 1',
    accountName: 'Fnote Tsidk Spiritual Media Charity & Outreach Fund',
    swiftCode: 'CBETETAA'
  },
  {
    bankName: 'Awash Bank',
    accountNumber: '0130 4882 1092 00',
    accountName: 'Fnote Tsidk Community Welfare Association',
    swiftCode: 'AWINETAA'
  },
  {
    bankName: 'Bank of Abyssinia',
    accountNumber: '8392 0184 9283',
    accountName: 'Fnote Tsidk Humanitarian & Monastic Aid'
  },
  {
    bankName: 'Telebirr SuperApp / CBE Birr',
    accountNumber: '+251 91 123 4567 / 0911234567',
    accountName: 'Fnote Tsidk Media Charity Merchant ID: 884920'
  }
];

export const DEFAULT_SUBSCRIBERS: SubscriberItem[] = [
  {
    id: 'sub-1',
    email: 'dagmawi.hadgu@gmail.com',
    name: 'Dagmawi Hadgu',
    frequency: 'weekly',
    topics: ['liturgy_feasts', 'monasteries_charity', 'peace_dialogue', 'breaking_news'],
    language: 'am',
    subscribedAt: '2026-08-20T10:15:00Z',
    status: 'active',
    location: 'Addis Ababa, Ethiopia',
    source: 'portal_home'
  },
  {
    id: 'sub-2',
    email: 'marta.alemu@orthodoxdiaspora.org',
    name: 'Marta Alemu',
    frequency: 'weekly',
    topics: ['liturgy_feasts', 'sermons_patristics', 'youth_education'],
    language: 'en',
    subscribedAt: '2026-08-22T14:30:00Z',
    status: 'active',
    location: 'Washington DC, USA',
    source: 'dedicated_newsletter'
  },
  {
    id: 'sub-3',
    email: 'tewodros.kassa@gmail.com',
    name: 'Dn. Tewodros Kassa',
    frequency: 'daily',
    topics: ['liturgy_feasts', 'monasteries_charity', 'sermons_patristics', 'breaking_news'],
    language: 'am',
    subscribedAt: '2026-08-18T08:45:00Z',
    status: 'active',
    location: 'Gondar, Ethiopia',
    source: 'sidebar'
  },
  {
    id: 'sub-4',
    email: 'selam.berhane@eotc-europe.de',
    name: 'Selamawit Berhane',
    frequency: 'weekly',
    topics: ['monasteries_charity', 'peace_dialogue'],
    language: 'ti',
    subscribedAt: '2026-08-15T16:20:00Z',
    status: 'active',
    location: 'Frankfurt, Germany',
    source: 'footer'
  },
  {
    id: 'sub-5',
    email: 'abeba.worku@yahoo.com',
    name: 'W/ro Abeba Worku',
    frequency: 'monthly',
    topics: ['liturgy_feasts', 'monasteries_charity'],
    language: 'am',
    subscribedAt: '2026-08-10T11:00:00Z',
    status: 'active',
    location: 'Bahir Dar, Ethiopia',
    source: 'portal_home'
  },
  {
    id: 'sub-6',
    email: 'solomon.g@diasporachurch.ca',
    name: 'Solomon Gebre',
    frequency: 'special_alerts',
    topics: ['breaking_news', 'peace_dialogue'],
    language: 'en',
    subscribedAt: '2026-08-05T09:10:00Z',
    status: 'active',
    location: 'Toronto, Canada',
    source: 'dedicated_newsletter'
  }
];

export const DEFAULT_DISPATCHES: NewsletterDispatch[] = [
  {
    id: 'disp-1',
    edition: 'Weekly Bulletin #92',
    subject: 'Feast of the Transfiguration (Debre Tabor / Buhe) & Sacred Monastery Food Rations',
    preheader: 'Read our liturgical reflection on Debre Tabor, upcoming choir broadcasts, and food delivery to 600 desert hermits.',
    targetTopics: ['liturgy_feasts', 'monasteries_charity'],
    targetFrequency: 'weekly',
    status: 'sent',
    sentAt: '2026-08-21T07:00:00Z',
    recipientsCount: 4280,
    openRate: '79.4%',
    clickRate: '34.2%',
    author: 'Fnote Tsidk Editorial Secretariat',
    content: `Peace and grace to all faithful brethren across Ethiopia and the diaspora.\n\nIn this week's bulletin, we reflect on the spiritual mystery of Mount Tabor (ደብረ ታቦር), where our Lord revealed His uncreated divine light to the Holy Apostles Peter, James, and John. We also share an update on the completed delivery of 350 quintals of teff and solar sanctuary lanterns to the remote monasteries of Lake Tana and Waldiba.\n\nKey Highlights this week:\n1. Liturgical Feast of Debre Tabor & Children's Chants (Hoya Hoye)\n2. Emergency Monastic Granary Sustenance Report\n3. Interview with Geshen Debre Kerbe Elder Abba Gebremeskel\n4. Live Satellite Broadcast Schedule for Sunday Liturgy`
  },
  {
    id: 'disp-2',
    edition: 'Special Heritage Bulletin',
    subject: 'Preserving 14th-Century Ge\'ez Parchments & Youth Hymnology Caravan',
    preheader: 'New conservation laboratory opened in Gondar and 1,200 hymn books distributed to rural Sunday schools.',
    targetTopics: ['sermons_patristics', 'youth_education'],
    targetFrequency: 'all',
    status: 'sent',
    sentAt: '2026-08-14T08:30:00Z',
    recipientsCount: 3890,
    openRate: '82.1%',
    clickRate: '41.0%',
    author: 'Theology & Research Desk',
    content: `Dear Beloved in Christ,\n\nWe are joyful to announce that the first mobile micro-climate preservation unit has arrived in northern historical sanctuaries. Over 85 parchment manuscripts containing ancient Ge'ez patristic commentaries and liturgical musical notations (*Melekete Zema*) have been safeguarded from environmental decay.\n\nSimultaneously, the Youth Literacy Caravan distributed 1,200 copies of Dawit and Tsome Degua to rural Sunday school apprentices.`
  }
];


