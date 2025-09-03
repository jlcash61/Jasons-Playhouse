// sound.js
let audioCtx = null;
let noiseNode = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// Generate noise buffer
function createNoiseBuffer(type = "white") {
  const bufferSize = 2 * audioCtx.sampleRate;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const output = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    let value;
    if (type === "white") {
      value = Math.random() * 2 - 1;
    } else if (type === "brown") {
      // Brownian noise
      value = (Math.random() * 2 - 1 + (output[i - 1] || 0)) / 1.02;
    } else if (type === "pink") {
      // Simple pink approximation
      value = (Math.random() * 2 - 1 + (output[i - 1] || 0)) / 2;
    } else {
      value = Math.random() * 2 - 1;
    }
    output[i] = value;
  }

  return buffer;
}

export function playNoise(type = "white") {
  initAudio();
  stopNoise();

  const buffer = createNoiseBuffer(type);
  noiseNode = audioCtx.createBufferSource();
  noiseNode.buffer = buffer;
  noiseNode.loop = true;
  noiseNode.connect(audioCtx.destination);
  noiseNode.start();
}

export function stopNoise() {
  if (noiseNode) {
    noiseNode.stop();
    noiseNode.disconnect();
    noiseNode = null;
  }
}

// Placeholder for fun SFX (future files)
export function playSoundEffect(name) {
  alert(`🔊 Play sound effect: ${name} (file hookup pending)`);
}
