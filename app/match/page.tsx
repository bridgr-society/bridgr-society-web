import { MatchQuiz } from '@/components/MatchQuiz';
import { stages, destinations, careerFields, programTypes, startPeriods, durations, mandarinLevels, goals } from '@/content/taxonomy';
import { parseAnswers } from '@/lib/match-params';
export const metadata = { title: 'Help me choose' };
export default async function Match({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }){
  const initial = parseAnswers(await searchParams);
  const questions = [
    { k: 'stage' as const, q: 'Where are you right now?', opts: stages.map(s => ({ id: s, name: s })) },
    { k: 'dest' as const, q: 'Where would you like to go?', opts: [{ id: 'any', name: 'I’m open to all three' }, ...destinations.map(d => ({ id: d.slug, name: d.name, desc: d.cities.join(' · ') }))] },
    { k: 'fields' as const, q: 'Which career fields interest you?', hint: 'Choose one or more.', multi: true, opts: careerFields.map(f => ({ id: f.slug, name: f.name, desc: f.blurb })) },
    { k: 'type' as const, q: 'Internship or immersion?', opts: [...programTypes.map(t => ({ id: t.slug, name: t.name, desc: t.short })), { id: 'either', name: 'Either', desc: 'Show me both' }] },
    { k: 'start' as const, q: 'When would you like to start, and for how long?', dates: true },
    { k: 'mandarin' as const, q: 'How would you describe your Mandarin?', hint: 'Self-reported — it only helps us suggest programs.', opts: mandarinLevels.map(m => ({ id: m.slug, name: m.name, desc: m.desc })) },
    { k: 'goal' as const, q: 'What’s your main goal?', opts: goals.map(g => ({ id: g, name: g })) }
  ];
  return <MatchQuiz questions={questions} starts={startPeriods} durations={durations.map(d => ({ id: d.slug, name: d.name }))} initial={initial} />;
}
