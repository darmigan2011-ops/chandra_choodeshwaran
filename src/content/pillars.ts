// ====================================================================
// PILLARS DATA — The Five Pillars & Human OS Pentagon View
// ====================================================================

/**
 * HUMAN_OS.pillars — used for the pentagon/interconnected view.
 * Each pillar represents a core capacity of the Human Operating System.
 */
export const HUMAN_OS_PILLARS = [
  {
    id: 'self-awareness',
    title: 'Self Awareness',
    description:
      'Understanding your thoughts, emotions, and behaviors is the foundation of all growth. Through evidence-based techniques and reflective practices, I help individuals develop deep self-awareness that transforms how they show up in every area of life.',
    icon: 'eye',
  },
  {
    id: 'emotional-intelligence',
    title: 'Emotional Intelligence',
    description:
      'EQ is the strongest predictor of personal and professional success. I teach practical frameworks to recognize, understand, and manage emotions — both your own and others — creating deeper connections and better decisions.',
    icon: 'heart',
  },
  {
    id: 'communication',
    title: 'Communication',
    description:
      'Clear, empathetic communication is the bridge between confusion and connection. My approach helps people express themselves with precision and confidence while truly hearing what others are saying.',
    icon: 'message-circle',
  },
  {
    id: 'leadership',
    title: 'Leadership',
    description:
      'True leadership begins with self-leadership. I mentor emerging leaders to build authentic influence, inspire teams, and create environments where people feel valued, heard, and motivated to do their best work.',
    icon: 'zap',
  },
  {
    id: 'growth',
    title: 'Growth',
    description:
      'Continuous learning and adaptability define a fulfilling life. I guide individuals and organizations to embrace growth mindsets, build systems for lasting development, and turn potential into performance.',
    icon: 'trending-up',
  },
]

/**
 * FIVE_PILLARS — detailed data for the Five Pillars section.
 * Each pillar includes full descriptions, metrics, variant, and visualType.
 */
export const FIVE_PILLARS = [
  {
    id: 'self-awareness',
    number: 'Pillar One',
    title: 'Self Awareness',
    subtitle: 'The Foundation of All Growth',
    description:
      'Before you can lead others, communicate effectively, or manage emotions — you must first understand yourself. Self-awareness is not introspection. It is the ability to see yourself clearly, recognize your patterns, and understand how your thoughts shape your reality. This is where every transformation begins.',
    metrics: [
      { value: '500+', label: 'Individuals Trained' },
      { value: '96%', label: 'Report Improved Self-Awareness' },
      { value: '50+', label: 'Workshops Delivered' },
    ],
    variant: 'split' as const,
    visualType: 'mirror',
  },
  {
    id: 'emotional-intelligence',
    number: 'Pillar Two',
    title: 'Emotional Intelligence',
    subtitle: 'The Operating System of Human Interaction',
    description:
      'Emotional intelligence is the single strongest predictor of personal and professional success — stronger than IQ, stronger than technical skills. It is the ability to recognize, understand, and manage emotions in yourself and others. From boardrooms to classrooms, EI determines how far you go.',
    metrics: [
      { value: '300+', label: 'EI Sessions Conducted' },
      { value: '89%', label: 'Report Stronger Relationships' },
    ],
    variant: 'full-width' as const,
    visualType: 'waves',
  },
  {
    id: 'communication',
    number: 'Pillar Three',
    title: 'Communication',
    subtitle: 'Turning Confusion Into Clarity',
    description:
      "Most conflicts are not about what was said — they are about what was heard. Communication is a science and an art. It is feedback systems and accountability. It is public speaking and active listening. It is knowing when to speak and when to stay silent. My clients learn to communicate with precision, empathy, and impact.",
    metrics: [
      { value: '200+', label: 'Communication Sessions' },
      { value: '85%', label: 'Report Better Relationships' },
    ],
    variant: 'diagonal' as const,
    visualType: 'network',
  },
  {
    id: 'leadership',
    number: 'Pillar Four',
    title: 'Leadership',
    subtitle: 'From Managing to Inspiring',
    description:
      'Leadership is not a title — it is a way of being. Real leadership starts with self-leadership. Through mentorship programs and immersive workshops, emerging leaders learn to build authentic influence, navigate difficult conversations, and create cultures where people feel valued and motivated.',
    metrics: [
      { value: '100+', label: 'Leaders Mentored' },
      { value: '93%', label: 'Report Increased Confidence' },
    ],
    variant: 'grid' as const,
    visualType: 'compass',
  },
  {
    id: 'growth',
    number: 'Pillar Five',
    title: 'Growth',
    subtitle: 'A Lifelong System for Human Potential',
    description:
      'Growth is not a destination — it is a system. The ability to continuously learn, adapt, and evolve defines a fulfilling life. I guide individuals and organizations to build growth architectures: habits, feedback loops, and mindsets that compound over time to create lasting transformation.',
    metrics: [
      { value: '15+', label: 'Years of Experience' },
      { value: '1000+', label: 'Lives Impacted' },
    ],
    variant: 'split-mirrored' as const,
    visualType: 'ascent',
  },
]

/**
 * HUMAN_OS section metadata for the pentagon framework display.
 */
export const HUMAN_OS = {
  badge: 'FRAMEWORK',
  title: 'The Human Operating System',
  subtitle:
    'Five interconnected capacities that define how we navigate life, relate to others, and grow.',
  pillars: HUMAN_OS_PILLARS,
}
