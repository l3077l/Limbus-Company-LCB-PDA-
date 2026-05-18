const playlist = [
    "01. In Hell We Live, Lament.mp3",
    "04. Dongbaek.mp3",
    "01. Dungeon Theme.mp3"
];
let currentTrackIndex = 0;
const audio = document.getElementById('bgMusic');
const statusText = document.getElementById('musicStatus');
const playBtn = document.getElementById('playBtn');

function loadTrack(index) {
    audio.src = playlist[index];
    audio.play().then(() => updateUI(true)).catch(showError);
}

function toggleMusic() {
    if (!audio.src || audio.src === "") {
        loadTrack(currentTrackIndex);
    } else if (audio.paused) {
        audio.play().then(() => updateUI(true)).catch(showError);
    } else {
        audio.pause();
        updateUI(false);
    }
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
}

function updateUI(isPlaying) {
    if (isPlaying) {
        statusText.innerText = "TRACK " + (currentTrackIndex + 1);
        statusText.style.color = "#4ade80";
        playBtn.innerText = "PAUSE";
    } else {
        statusText.innerText = "НА ПАУЗЕ";
        statusText.style.color = "#6b7280";
        playBtn.innerText = "PLAY";
    }
}

function showError() {
    statusText.innerText = "ОШИБКА";
    statusText.style.color = "#bf1919";
}

audio.onended = nextTrack; // Автопереключение
