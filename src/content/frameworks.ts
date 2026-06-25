// ====================================================================
// FRAMEWORKS DATA — Transformation Frameworks
// ====================================================================

export const FRAMEWORKS_PAGE = {
  badge: 'HOW IT WORKS',
  title: 'Transformation Frameworks',
  subtitle:
    'Proven systems developed through a decade of training, counselling, and real-world application.',
}

export const FRAMEWORKS = [
  {
    id: 'accountability-ladder',
    name: 'The Accountability Ladder',
    description:
      'A five-rung framework that transforms how people take ownership of their actions. From denial to ownership — each rung represents a higher level of personal responsibility.',
    type: 'ladder' as const,
    steps: [
      {
        label: 'Awareness',
        description: 'Recognizing the situation without judgment',
      },
      {
        label: 'Acknowledgment',
        description: 'Accepting your role in the outcome',
      },
      {
        label: 'Acceptance',
        description:
          'Embracing reality as it is, not as you wish it to be',
      },
      {
        label: 'Ownership',
        description: 'Taking full responsibility for your response',
      },
      {
        label: 'Action',
        description: 'Moving forward with purpose and commitment',
      },
    ],
  },
  {
    id: 'feedback-system',
    name: 'The Feedback System',
    description:
      'A continuous loop for giving and receiving feedback that builds trust instead of defensiveness. Used in corporate workshops and counselling sessions alike.',
    type: 'loop' as const,
    steps: [
      {
        label: 'Give',
        description: 'Frame feedback with empathy and specificity',
      },
      {
        label: 'Receive',
        description: 'Listen without defensiveness',
      },
      {
        label: 'Process',
        description: 'Separate signal from noise',
      },
      {
        label: 'Apply',
        description: 'Turn insight into action',
      },
    ],
  },
  {
    id: 'communication-matrix',
    name: 'The Communication Matrix',
    description:
      'A 2x2 framework that maps intent against impact — revealing where communication breaks down and how to rebuild it with clarity and empathy.',
    type: 'matrix' as const,
    steps: [
      {
        label: 'Intent',
        description: 'What you mean to convey',
      },
      {
        label: 'Expression',
        description: 'How you deliver the message',
      },
      {
        label: 'Perception',
        description: 'How the message is received',
      },
      {
        label: 'Impact',
        description: 'The actual effect on the listener',
      },
    ],
  },
]
