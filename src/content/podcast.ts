// ====================================================================
// PODCAST PAGE — Podcast Metadata, Episodes & Themes
// ====================================================================

import { SPOTIFY_SHOW_URL } from '@/config/social'

export const PODCAST_PAGE = {
  badge: 'LISTEN',
  title: "Chandru's Psychology In Tamil",
  subtitle:
    'A Tamil-language podcast exploring emotional intelligence, psychology, communication, and personal growth. Each episode delivers practical insights you can apply immediately.',
  spotifyUrl: SPOTIFY_SHOW_URL,
  tamilMotto: 'மனதுக்கு ஒரு குரல்',
}

export const PODCAST_THEMES = [
  { id: 'all', label: 'All Episodes' },
  { id: 'emotional-intelligence', label: 'Emotional Intelligence' },
  { id: 'communication', label: 'Communication' },
  { id: 'empathy', label: 'Empathy' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'psychology', label: 'Psychology' },
  { id: 'growth', label: 'Growth' },
]

export const PODCAST_EPISODES = [
  {
    title: 'Positive Feedback',
    description:
      'The art of giving constructive feedback that builds people up instead of tearing them down.',
    duration: '15 min',
    episodeNumber: 1,
    themes: ['communication', 'leadership'],
  },
  {
    title: 'The Accountability Ladder',
    description:
      'Taking ownership of your actions and climbing toward personal excellence. A deep dive into the five rungs.',
    duration: '18 min',
    episodeNumber: 2,
    featured: true,
    themes: ['growth', 'leadership'],
  },
  {
    title: 'Empathy in Detail',
    description:
      'Understanding others deeply — the skill that transforms relationships and builds trust.',
    duration: '22 min',
    episodeNumber: 3,
    themes: ['empathy', 'emotional-intelligence'],
  },
  {
    title: 'Types of Insecurity',
    description:
      'Recognizing and overcoming the invisible barriers that hold us back from our potential.',
    duration: '20 min',
    episodeNumber: 4,
    themes: ['psychology', 'growth'],
  },
  {
    title: 'You and I Messages',
    description:
      'Better communication patterns that reduce conflict and increase understanding in every relationship.',
    duration: '16 min',
    episodeNumber: 5,
    themes: ['communication', 'empathy'],
  },
  {
    title: 'Relationship Management',
    description:
      'Building stronger connections through emotional awareness and intentional communication.',
    duration: '19 min',
    episodeNumber: 6,
    themes: ['emotional-intelligence', 'empathy'],
  },
  {
    title: 'The Art of Listening',
    description:
      'Why most people hear but do not listen — and how to become the person others feel truly understood by.',
    duration: '21 min',
    episodeNumber: 7,
    themes: ['communication', 'empathy'],
  },
  {
    title: 'Emotional Resilience',
    description:
      "Building the inner strength to navigate life's challenges without losing yourself.",
    duration: '17 min',
    episodeNumber: 8,
    themes: ['emotional-intelligence', 'psychology', 'growth'],
  },
  {
    title: 'Leading With Heart',
    description:
      'How emotional intelligence makes you a better leader — in work, family, and community.',
    duration: '23 min',
    episodeNumber: 9,
    themes: ['leadership', 'emotional-intelligence'],
  },
]

// Unified export for podcast page
export const PODCAST = {
  ...PODCAST_PAGE,
  themes: PODCAST_THEMES,
  episodes: PODCAST_EPISODES,
}

