export interface CelebProfile {
  name: string;
  handle: string;
  platform: 'instagram' | 'youtube';
  profileUrl: string;
  category: '일반' | '뷰티' | '푸드';
  tagline: string;
  identity: string[];
  dna: {
    label: string;
    value: number;
  }[];
}

export interface MatchPoint {
  id: number;
  feature: string;
  connection: string;
  title: string;
  logic: string;
  isCore: boolean;
}

export interface ContentIdea {
  id: string;
  title: string;
  subTitle: string;
  tags: string[];
  concept: string;
  flow: string[];
  rationale: string;
  synergy: string;
  theme: 'purple' | 'green' | 'blue' | 'teal' | 'pink';
}

export interface StrategicPillar {
  id: number;
  tabTitle: string;
  icon: string;
  title: string;
  subtitle: string;
  context: {
    label: string;
    headline: string;
    subHeadline: string;
    description: string;
    keywords: string[];
  };
  bridge?: string;
  solution: {
    label: string;
    headline: string;
    description: string;
    keyPoints: string[];
  };
  theme: 'purple' | 'green' | 'blue' | 'teal' | 'pink';
}

export interface MatchScore {
  score: number;
  summary: string;
}

export interface KeyConcept {
  icon: string;
  title: string;
  description: string;
  theme: 'purple' | 'green' | 'blue' | 'teal' | 'pink';
}

export interface ProductDefinition {
  headline: string;
  highlight: string;
  description: string;
  quote: string;
  keyConcepts: KeyConcept[];
}

export interface ExternalLink {
  label: string;
  url: string;
  icon: string;
  color: string;
}
