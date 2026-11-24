import { describe, it, expect } from 'vitest';
import * as profileMod from './profile.js';
import * as experienceMod from './experience.js';
import * as companyProjectsMod from './companyProjects.js';
import * as caseStudiesMod from './caseStudies.js';
import * as projectsMod from './projects.js';
import * as leadershipMod from './leadership.js';
import * as workflowMod from './workflow.js';
import * as awardsMod from './awards.js';
import * as educationMod from './education.js';
import * as skillsMod from './skills.js';
import { projects } from './projects.js';
import { caseStudies } from './caseStudies.js';
import { profile } from './profile.js';

const ASSET_KEYS = [
  'fairobuy',
  'flight-booking',
  'Claude-Session',
  'History-Shorts-Planner',
  'formula-one',
  'money-flow',
  'event-log',
  'Ambient-Music',
  'Piik-Alternative',
];

const allModules = [
  profileMod, experienceMod, companyProjectsMod, caseStudiesMod, projectsMod,
  leadershipMod, workflowMod, awardsMod, educationMod, skillsMod,
];

describe('projects', () => {
  it('has exactly 8 entries', () => {
    expect(projects).toHaveLength(8);
  });

  it('lists the 6 public repos in display order', () => {
    const repos = projects.map((p) => p.repo).filter((r) => r !== null);
    expect(repos).toEqual(['Claude-Session', 'formula-one', 'money-flow', 'event-log', 'Ambient-Music', 'Piik-Alternative']);
  });
});

describe('image keys', () => {
  it('every image key in projects and caseStudies is a known asset key', () => {
    const used = [
      ...projects.map((p) => p.image),
      ...caseStudies.map((c) => c.image),
    ].filter((k) => k !== null && k !== undefined);
    for (const key of used) {
      expect(ASSET_KEYS).toContain(key);
    }
  });
});

describe('caseStudies', () => {
  it('has 5 items with no empty-string field', () => {
    expect(caseStudies).toHaveLength(5);
    for (const cs of caseStudies) {
      for (const value of Object.values(cs)) {
        expect(value).not.toBe('');
      }
    }
  });

  it('Direct Marketing did lists the three demos in order', () => {
    const did = caseStudies[0].did;
    expect(did[0].startsWith('Demo 1')).toBe(true);
    expect(did[1].startsWith('Demo 2')).toBe(true);
    expect(did[2].startsWith('Demo 3')).toBe(true);
  });
});

describe('content', () => {
  it('no data value contains "public repos" or "http://"', () => {
    for (const mod of allModules) {
      const text = JSON.stringify(mod);
      expect(text).not.toContain('public repos');
      expect(text).not.toContain('http://');
    }
  });

  it('stats has exactly three entries', () => {
    expect(profile.stats).toHaveLength(3);
  });
});
