const { Deepgram } = require('@deepgram/sdk');
const mic = require('microphone-stream');

const deepgram = new Deepgram('YOUR_API_KEY'); // Replace with Deepgram API Key

const micStream = mic();
const audioBuffer = [];

micStream.on('data', (chunk) => {
    audioBuffer.push(chunk);
});

console.log('Listening... Speak into the microphone.');

setTimeout(async() => {
    micStream.stop();
    const audio = Buffer.concat(audioBuffer);

    const response = await deepgram.transcription.preRecorded({
        buffer: audio,
        mimetype: 'audio/wav',
    });

    console.log('Transcription:', response.results.channels[0].alternatives[0].transcript);
}, 10000); // Stops after 10 seconds