import { useState, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScene from './scenes/WelcomeScene';
import IntroScene from './scenes/IntroScene';
import RoseBloomScene from './scenes/RoseBloomScene';
import CountdownScene from './scenes/CountdownScene';
import RoseGardenScene from './scenes/RoseGardenScene';
import LoveLetterScene from './scenes/LoveLetterScene';
import HeartExplosionScene from './scenes/HeartExplosionScene';
import MusicPlayer from './components/MusicPlayer';

const SCENES = [
  'welcome',
  'intro',
  'rose-bloom',
  'countdown',
  'rose-garden',
  'love-letter',
  'heart-explosion',
];

export default function App() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const musicRef = useRef(null);

  const nextScene = useCallback(() => {
    setSceneIndex((prev) => {
      const next = Math.min(prev + 1, SCENES.length - 1);
      // Start music after welcome screen — play() called directly
      // from the user gesture call stack to satisfy autoplay policy
      if (prev === 0 && next === 1) {
        setMusicPlaying(true);
        musicRef.current?.play();
      }
      return next;
    });
  }, []);

  const currentScene = SCENES[sceneIndex];

  return (
    <div className="w-full h-screen overflow-hidden relative" style={{ background: '#0a0008' }}>
      {/* Ambient background gradient */}
      <div
        className="fixed inset-0 transition-all duration-[2000ms]"
        style={{
          background:
            sceneIndex <= 2
              ? 'radial-gradient(ellipse at 50% 50%, #1a001108 0%, transparent 50%)'
              : 'radial-gradient(ellipse at 50% 50%, #ff2d550a 0%, transparent 50%)',
        }}
      />

      <AnimatePresence mode="wait">
        {currentScene === 'welcome' && (
          <WelcomeScene key="welcome" onComplete={nextScene} />
        )}
        {currentScene === 'intro' && (
          <IntroScene key="intro" onComplete={nextScene} />
        )}
        {currentScene === 'rose-bloom' && (
          <RoseBloomScene key="rose-bloom" onComplete={nextScene} />
        )}
        {currentScene === 'countdown' && (
          <CountdownScene key="countdown" onComplete={nextScene} />
        )}
        {currentScene === 'rose-garden' && (
          <RoseGardenScene key="rose-garden" onComplete={nextScene} />
        )}
        {currentScene === 'love-letter' && (
          <LoveLetterScene key="love-letter" onComplete={nextScene} />
        )}
        {currentScene === 'heart-explosion' && (
          <HeartExplosionScene key="heart-explosion" />
        )}
      </AnimatePresence>

      {/* Background music with mute toggle */}
      <MusicPlayer ref={musicRef} playing={musicPlaying} />
    </div>
  );
}
