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
  const audioRef = useRef(null);

  // Called directly from WelcomeScene's click handler (synchronous in
  // the user-gesture call stack) so the browser allows audio.play().
  const startMusic = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      audio.play().catch((err) => console.warn("Audio play failed:", err));
    }
    setMusicPlaying(true);
  }, []);

  const nextScene = useCallback(() => {
    setSceneIndex((prev) => Math.min(prev + 1, SCENES.length - 1));
  }, []);

  const currentScene = SCENES[sceneIndex];

  return (
    <div className="w-full h-screen overflow-hidden relative" style={{ background: '#0a0008' }}>
      {/* Background music — always in the DOM so the ref is ready on first tap */}
      <audio ref={audioRef} src="/song.mp3" loop preload="auto" />

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
          <WelcomeScene key="welcome" onComplete={nextScene} onStart={startMusic} />
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

      {/* Mute/unmute toggle button */}
      <MusicPlayer audioRef={audioRef} playing={musicPlaying} />
    </div>
  );
}
