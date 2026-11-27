import { describe, it, expect } from 'vitest';
import { validate, toSections, readForm } from '@/lib/applications/public-form';

const good = { first: 'Ana', last: 'Lee', email: 'ana@example.com', email2: 'ANA@example.com', phone: '+66 81 234 5678', gender: 'Prefer not to say', genderSelf: '',
  nationality: 'Thailand', residence: 'Thailand', dob: '2003-04-05', stage: '', institution: 'Chulalongkorn University', study: 'BBA Marketing', gradYear: String(new Date().getFullYear() + 1),
  experience: '', link: '', program: 'taipei-marketing', destinations: ['taiwan'], ptype: 'internship', start: 'Summer 2027', duration: '', fields: [], mandarin: 'basic', english: 'Fluent',
  otherLangs: '', motivation: 'I want to build marketing experience in Taiwan and improve my Mandarin at work.', heard: '', notes: '', accurate: 'on', consent: 'on' };

describe('public application form', () => {
  it('accepts a complete application', async () => {
    const { stages } = await import('@/content/taxonomy');
    expect(validate({ ...good, stage: stages[0] })).toEqual({});
  });
  it('flags missing required answers and mismatched email', () => {
    const e = validate({ ...good, stage: 'x', email2: 'other@example.com', phone: '0812345678', destinations: [], motivation: 'short', consent: '' });
    expect(Object.keys(e).sort()).toEqual(['consent', 'destinations', 'email2', 'motivation', 'phone', 'stage']);
  });
  it('rejects values outside the allowed lists', () => {
    const e = validate({ ...good, program: 'evil', destinations: ['mars'], nationality: 'Atlantis' });
    expect(e.program && e.destinations && e.nationality).toBeTruthy();
  });
  it('reads multi-value fields and produces readable email sections', () => {
    const fd = new FormData(); fd.append('destinations', 'taiwan'); fd.append('destinations', 'singapore'); fd.set('program', 'not-sure');
    const v = readForm(fd); expect(v.destinations).toEqual(['taiwan', 'singapore']);
    const { program, sections } = toSections({ ...good, ...v });
    expect(program).toMatch(/Not sure/);
    expect(sections.find(s => s.title === 'Program preferences')!.rows.find(r => r[0] === 'Destinations')![1]).toBe('Taiwan, Singapore');
  });
});
