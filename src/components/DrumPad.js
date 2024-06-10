// components/DrumPad.js
import { useEffect } from 'react';

const DrumPad = ({ keyTrigger, sound, soundName, updateDisplay, volume, power }) => {
  useEffect(() => {
    const audio = document.getElementById(keyTrigger);
    audio.load();
  }, [keyTrigger]);

  const playSound = () => {
    if (!power) return; // Do nothing if power is off
    const audio = document.getElementById(keyTrigger);
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play().catch(error => console.error(`Error playing sound: ${error.message}`));
    updateDisplay(soundName);
  };

  const handleKeyPress = (event) => {
    if (!power) return; // Do nothing if power is off
    if (event.key.toUpperCase() === keyTrigger) {
      playSound();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [power]); 

  return (
    <button
      className={`drum-pad bg-gray-700 text-white rounded-lg flex items-center justify-center h-24 w-24 cursor-pointer ${
        power ? 'hover:bg-gray-600' : 'opacity-50 cursor-not-allowed'
      }`}
      id={soundName}
      onClick={playSound}
      disabled={!power}
    >
      {keyTrigger}
      <audio className="clip" id={keyTrigger} src={sound} preload="auto"></audio>
    </button>
  );
};

export default DrumPad;
