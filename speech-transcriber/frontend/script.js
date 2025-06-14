let mediaRecorder;
let audioChunks = [];

document.getElementById("start").onclick = async() => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
    mediaRecorder.onstop = async() => {
        const blob = new Blob(audioChunks, { type: "audio/wav" });
        const formData = new FormData();
        formData.append("file", blob, "voice.wav");

        document.getElementById("status").innerText = "Uploading...";

        const res = await fetch("http://localhost:8000/upload-audio/", {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        document.getElementById("status").innerText = "Done! Transcribed: " + data.text;
    };

    mediaRecorder.start();
};

document.getElementById("stop").onclick = () => {
    mediaRecorder.stop();
};
ja