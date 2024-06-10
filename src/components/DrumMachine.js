import { useState } from 'react';
import DrumPad from './DrumPad';
import Display from './Display';

const sounds = [
  { keyTrigger: 'Q', sound: '/sounds/What%20da%20dog%20doin.mp3', soundName: 'What da dog doin' },
  { keyTrigger: 'W', sound: '/sounds/boom.mp3', soundName: 'boom' },
  { keyTrigger: 'E', sound: '/sounds/Augh.mp3', soundName: 'Augh' },
  { keyTrigger: 'A', sound: '/sounds/Taco%20Bell.mp3', soundName: 'Taco Bell' },
  { keyTrigger: 'S', sound: '/sounds/naw-dog.mp3', soundName: 'Naw Dog' },
  { keyTrigger: 'D', sound: '/sounds/Sisyphus.mp3', soundName: 'Sisyphus' },
  { keyTrigger: 'Z', sound: '/sounds/alarm.mp3', soundName: 'Alarm' },
  { keyTrigger: 'X', sound: '/sounds/wutdahell.mp3', soundName: 'Wut da' },
  { keyTrigger: 'C', sound: '/sounds/gordon.mp3', soundName: 'Kitchen Nightmares' },
];

const DrumMachine = () => {
  const [display, setDisplay] = useState('');
  const [volume, setVolume] = useState(1); // Volume state
  const [power, setPower] = useState(true); // Power state
  const [powerDisplay, setPowerDisplay] = useState('ON');
  const [powerDisplayColor, setPowerDisplayColor] = useState('text-green-500');

  const updateDisplay = (soundName) => {
    setDisplay(soundName);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    setDisplay(`Volume: ${Math.round(newVolume * 100)}`);

    // Update volume of all audio elements
    document.querySelectorAll('.clip').forEach(audio => {
      audio.volume = newVolume;
    });
  };

  const togglePower = () => {
    const newPowerState = !power;
    setPower(newPowerState);
    setPowerDisplay(newPowerState ? 'ON' : 'OFF');
    setPowerDisplayColor(newPowerState ? 'text-green-500' : 'text-red-500');

    // Stop all playing audio if power is turned off
    if (!newPowerState) {
      document.querySelectorAll('.clip').forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    }
  };

  return (
    <div id="drum-machine" className="flex flex-col items-center p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 border rounded-lg p-2 text-center">Drum Machine?</h1>
      <div className={`text-2xl font-bold mb-4 ${powerDisplayColor}`}>{powerDisplay}</div>
      <Display display={display} />
      <div className="controls mb-4 flex flex-col items-center">
        <button
          onClick={togglePower}
          className={`px-4 py-2 mb-4 rounded-lg font-bold border ${power ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'}`}
        >
          {power ? 'Power Off' : 'Power On'}
        </button>
        <div className="flex items-center mt-4">
          <label htmlFor="volume" className="mr-2">Volume:</label>
          <input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-40"
          />
        </div>
      </div>
      <div className="pads grid grid-cols-3 gap-4">
        {sounds.map((sound) => (
          <DrumPad
            key={sound.keyTrigger}
            {...sound}
            updateDisplay={updateDisplay}
            volume={volume}
            power={power}
          />
        ))}
      </div>
    </div>
  );
};

export default DrumMachine;
