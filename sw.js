// 1. Плейлист и индекс
const playlist = [
    "01. In Hell We Live, Lament.mp3",
    "01. Dungeon Theme.mp3",
    "04. Dongbaek.mp3"
];
let currentTrackIndex = 0;

// 2. Ссылки на элементы
const audio = document.getElementById('bgMusic');
const statusText = document.getElementById('musicStatus');
const playBtn = document.getElementById('playBtn');

// 3. Функция обновления трека
function updateTrack() {
    const isPlaying = !audio.paused;
    audio.src = playlist[currentTrackIndex];
    audio.load(); // Важно для смены файла
    if (isPlaying) {
        audio.play().catch(e => console.log("Ошибка автоплея:", e));
    }
}

// 4. Логика Кнопок
function toggleMusic() {
    if (audio.paused) {
        audio.play().then(() => {
            statusText.innerText = "СТРИМ_АКТИВЕН";
            statusText.style.color = "#4ade80";
            playBtn.innerText = "PAUSE";
        }).catch(err => {
            console.error(err);
            alert("Нажмите на экран, затем на PLAY. Файл: " + playlist[currentTrackIndex]);
        });
    } else {
        audio.pause();
        statusText.innerText = "НА ПАУЗЕ";
        statusText.style.color = "#6b7280";
        playBtn.innerText = "PLAY";
    }
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    updateTrack();
    // Если музыка уже играла, продолжаем играть новый трек
    if (statusText.innerText === "СТРИМ_АКТИВЕН") audio.play();
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    updateTrack();
    if (statusText.innerText === "СТРИМ_АКТИВЕН") audio.play();
}

// 5. АВТОМАТИЧЕСКИЙ ПЕРЕХОД (Когда песня кончилась)
audio.addEventListener('ended', function() {
    console.log("Трек завершен, переключаю...");
    nextTrack();
    audio.play(); // Запускаем следующий
});

// Остальные функции (Вкладки, Загрузка)
function switchTab(evt, tabName) {
    var i, tabContent, menuBtns;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) { tabContent[i].classList.remove("active"); }
    menuBtns = document.getElementsByClassName("menu-btn");
    for (i = 0; i < menuBtns.length; i++) { menuBtns[i].classList.remove("active"); }
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

function startSystemLoading() {
    document.getElementById('loginBox').style.display = 'none';
    var loader = document.getElementById('terminalLoader');
    loader.style.display = 'block';
    var logs = ["> Загрузка плейлиста...", "> Инициализация аудио-ядра...", "> Готово."];
    var i = 0;
    function printLog() {
        if (i < logs.length) {
            loader.innerHTML += logs[i] + "<br>";
            i++;
            setTimeout(printLog, 200);
        } else {
            setTimeout(() => {
                document.getElementById('screenLogin').style.display = 'none';
                document.getElementById('screenMain').style.display = 'flex';
                // Устанавливаем первый трек при входе
                audio.src = playlist[currentTrackIndex];
            }, 500);
        }
    }
    printLog();
}

function showCharacter(name, status, desc, imgUrl) {
    document.getElementById('modalTargetName').innerText = name;
    document.getElementById('modalTargetStatus').innerText = status;
    document.getElementById('modalTargetDesc').innerText = desc;
    document.getElementById('modalTargetImg').src = imgUrl;
    document.getElementById('charModal').style.display = 'flex';
}

function closeModal() { document.getElementById('charModal').style.display = 'none'; }

