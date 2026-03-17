import React from 'react';

export default function App() {
  const phrasePool = [
    'I miss you.',
    'I think of you a lot.',
    'It was very weird not having a weekend with you.',
    'I like missing you.',
    'It’s romantic.',
    'There’s a soft sadness in it.',
    'What I feel most often lately is love.',
    'There’s less pressure. Just space.',
    'I feel like I can trust you.',
    'Thank you for the softness.',
    'You’ve been so steady with me.',
    'I enjoy our time together.',
    'Sometimes it hits me suddenly.',
    'This wave of wanting to be with you.',
    'Seeing you made me happy.',
    'Hearing from you made me happy.',
    'There’s something sacred about normal things.',
    'All I need is someone I trust.',
    'Writing to you helps.',
    'It gives shape to the noise.',
    'I feel a little off.',
    'It was quiet. That was the goal.',
    'Every day is a new day I guess.',
    'I just carry it.',
    'Like a thread stitched gently through every day.',
    'I realized I had nothing to complain about.',
    'Not in a forced way, but in a quiet way.',
    'There is a kind of stillness.',
    'And within that stillness, love moves more freely.',
    'I think this is real.',
    'It doesn’t feel like a coincidence.',
    'I don’t need to worry.',
    'It just is.',
    'I wanted to tell you this.',
    'I don’t know why exactly.',
    'But it felt important.',
    'Even if it’s simple.',
    'Even if it’s obvious.',
    'Still.',
    'I nodded a lot, which felt like the correct response.',
    'Closure had clearly been outsourced.',
    'The only ones who still seem to have it figured out are the cats.',
    'Unbothered. Self-sufficient. Still running the show.',
    'Plans feel less like plans and more like vague suggestions.',
    'The design turned out experimental.',
    'More of a symbolic gesture than a functional object.',
    'Like the movie was bad for us, specifically.',
    'It felt oddly communal.',
    'I think I might be in my dessert prime right now.',
    'Dogs are good at that, I guess.',
    'I am just rambling in this email.',
    'I am a busy adult, not a lovesick teenager.',
    'My memory is mush.',
    'Everything is so mush.',
    'Big adventure, small sleep.',
    'That is the version of me you’re getting today.',
    'That’s all folks!',
    'More is more.'
  ];

  const wordPool = [
    'love', 'stillness', 'distance', 'voice', 'thread', 'softness', 'clarity', 'weekend',
    'memory', 'peace', 'ordinary', 'sacred', 'noise', 'echo', 'romantic', 'waiting',
    'letter', 'tenderness', 'weather', 'city', 'pause', 'shape', 'warmth', 'trust',
    'tired', 'light', 'absence', 'presence', 'quiet', 'screen', 'mailbox', 'room',
    'feeling', 'affection', 'chaos', 'detail', 'routine', 'future', 'name', 'gesture',
    'truth', 'longing', 'space', 'window', 'face', 'day', 'mush', 'cats', 'symbolic',
    'experimental', 'unbothered', 'vague', 'dessert', 'prime', 'communal', 'reply'
  ];

  const introText =
    'A real e-mail correspondence between two people, one in Zurich and the other in Tiflis, was reduced to symbols, counted, broken apart, and returned as language again. The letters were shuffled into unstable combinations and asked to gather themselves back into love letters. Somehow they still hold. The feeling survives the procedure. The absurdity does not cancel the weight. Love, unfortunately or usefully, seems to remain coded in every word.';

  const [stage, setStage] = React.useState('title');
  const [name, setName] = React.useState('');
  const [revealedLetter, setRevealedLetter] = React.useState('');
  const [displayedText, setDisplayedText] = React.useState('');
  const [floatingWords, setFloatingWords] = React.useState([]);

  React.useEffect(() => {
    if (stage !== 'words') return undefined;

    const generated = Array.from({ length: 140 }, (_, i) => ({
      id: i,
      word: wordPool[Math.floor(Math.random() * wordPool.length)],
      top: Math.random() * 92,
      left: Math.random() * 92,
      size: 12 + Math.random() * 18,
      opacity: 0.35 + Math.random() * 0.55,
    }));

    setFloatingWords(generated);

    const timer = window.setTimeout(() => {
      setStage('form');
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [stage]);

  React.useEffect(() => {
    if (stage !== 'letter' || !revealedLetter) return undefined;

    setDisplayedText('');
    let index = 0;

    const interval = window.setInterval(() => {
      index += 1;
      setDisplayedText(revealedLetter.slice(0, index));
      if (index >= revealedLetter.length) {
        window.clearInterval(interval);
      }
    }, 16);

    return () => window.clearInterval(interval);
  }, [stage, revealedLetter]);

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const generateLetter = () => {
    const body = [
      pick(phrasePool),
      pick(phrasePool),
      pick(phrasePool),
      pick(phrasePool),
      pick(phrasePool),
      pick(phrasePool),
      'I miss you.'
    ];

    const finalLetter = `Dear ${name || 'you'},

${body.join(' ')}

Yours,`;

    setRevealedLetter(finalLetter);
    setStage('letter');
  };

  const reset = () => {
    setName('');
    setRevealedLetter('');
    setDisplayedText('');
    setStage('form');
  };

  const gridStyle = {
    backgroundImage:
      'linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)',
    backgroundSize: '36px 36px',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#f5f1e8',
        color: '#000',
        fontFamily: 'Helvetica, Arial, sans-serif',
        position: 'relative',
      }}
    >
      <div
        style={{
          pointerEvents: 'none',
          position: 'fixed',
          inset: 0,
          opacity: 0.2,
          ...gridStyle,
        }}
      />
      <div
        style={{
          pointerEvents: 'none',
          position: 'fixed',
          left: 16,
          top: 16,
          border: '1px solid black',
          padding: '4px 8px',
          fontFamily: 'monospace',
          fontSize: 10,
          letterSpacing: '0.3em',
        }}
      >
        ZH / TBS
      </div>
      <div
        style={{
          pointerEvents: 'none',
          position: 'fixed',
          right: 16,
          top: 16,
          width: 12,
          height: 12,
          background: '#dc2626',
        }}
      />

      {stage === 'title' && (
        <div
          onClick={() => setStage('words')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setStage('words');
          }}
          role="button"
          tabIndex={0}
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 32,
            cursor: 'pointer',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div style={{ maxWidth: 1100, textAlign: 'center' }}>
            <p style={{ marginBottom: 32, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.45em', color: '#666' }}>
              UNIVERSAL LOVE LETTERS
            </p>
            <h1 style={{ margin: 0, marginBottom: 24, fontSize: 'clamp(56px, 10vw, 128px)', lineHeight: 0.92, textTransform: 'uppercase', letterSpacing: '-0.04em', fontWeight: 500 }}>
              Shuffled<br />correspondence
            </h1>
            <div style={{ width: 96, height: 2, background: '#dc2626', margin: '0 auto 32px auto' }} />
            <p style={{ maxWidth: 760, margin: '0 auto', fontSize: 18, lineHeight: 1.8, color: '#444' }}>
              {introText}
            </p>
            <p style={{ marginTop: 48, fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.35em', color: '#666' }}>
              CLICK TO PROCEED
            </p>
          </div>
        </div>
      )}

      {stage === 'words' && (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
          {floatingWords.map((item) => (
            <span
              key={item.id}
              style={{
                position: 'absolute',
                top: `${item.top}%`,
                left: `${item.left}%`,
                fontSize: item.size,
                opacity: item.opacity,
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                userSelect: 'none',
              }}
            >
              {item.word}
            </span>
          ))}
        </div>
      )}

      {stage === 'form' && (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 720,
              border: '2px solid black',
              background: '#fffdf8',
              padding: 40,
              boxShadow: '10px 10px 0 0 #000',
            }}
          >
            <p style={{ marginBottom: 32, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.45em', color: '#666' }}>
              READY LETTER SYSTEM
            </p>
            <h2 style={{ margin: 0, marginBottom: 12, fontSize: 'clamp(40px, 6vw, 72px)', textTransform: 'uppercase', letterSpacing: '-0.03em', fontWeight: 500 }}>
              Enter a name
            </h2>
            <p style={{ marginBottom: 32, maxWidth: 520, fontSize: 14, lineHeight: 1.6, color: '#555' }}>
              The system will generate a slightly unstable love letter from a real correspondence.
            </p>
            <div style={{ display: 'grid', gap: 24 }}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Anna"
                style={{
                  width: '100%',
                  border: 'none',
                  borderBottom: '2px solid black',
                  background: 'transparent',
                  padding: '12px 0',
                  fontSize: 32,
                  outline: 'none',
                }}
              />
              <button
                type="button"
                onClick={generateLetter}
                style={{
                  justifySelf: 'start',
                  border: '2px solid black',
                  background: '#dc2626',
                  color: 'white',
                  padding: '12px 20px',
                  fontFamily: 'monospace',
                  fontSize: 14,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}

      {stage === 'letter' && (
        <div style={{ minHeight: '100vh', padding: 48, position: 'relative', zIndex: 1 }}>
          <div
            style={{
              maxWidth: 900,
              margin: '0 auto',
              border: '2px solid black',
              background: '#fffdf8',
              padding: 56,
              boxShadow: '12px 12px 0 0 #000',
            }}
          >
            <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <p style={{ margin: 0, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.45em', color: '#666' }}>
                GENERATED LETTER
              </p>
              <button
                type="button"
                onClick={reset}
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: 0,
                  fontFamily: 'monospace',
                  fontSize: 11,
                  letterSpacing: '0.3em',
                  color: '#666',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                RESET
              </button>
            </div>
            <pre
              style={{
                margin: 0,
                whiteSpace: 'pre-wrap',
                fontFamily: 'Georgia, Times New Roman, serif',
                fontSize: 20,
                lineHeight: 2,
                color: '#000',
              }}
            >
              {displayedText}
              <span style={{ opacity: 0.7 }}>|</span>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
