const playlist = [
    { title: "Goofy Tropique", file: "goofy-tropique.mp3", image: "goofy-tropique.jpeg", artist: "rbn, Mathela, S-go" },
    { title: "Extreme Ways", file: "extreme-ways.mp3", image: "extreme-ways.jpeg", artist: "Moby" },
    { title: "Genius", file: "genius.mp3", image: "genius.jpeg", artist: "Sia, Diplo, Labrinth" },
    { title: "Goofy Night", file: "goofy-night.mp3", image: "goofy-night.jpeg", artist: "rbn" },
];

for (let i = playlist.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
}

const cover = document.getElementById('track-cover');
const title = document.getElementById('track-title');
const artist = document.getElementById('track-artist');



var currentTrack = 0;
var sound = new Howl({
    src: ["../sounds/" + playlist[currentTrack].file],
    autoplay: true,
    loop: false,
    volume: 1,
    onend: function() {
        nextTrack();
    }
});



cover.src = "../images/" + playlist[currentTrack].image;
title.textContent = playlist[currentTrack].title;
artist.textContent = playlist[currentTrack].artist;


function playPause() {
    if (sound.playing()) {
        sound.pause();
        document.getElementById('play-pause-icon').classList.replace('fa-pause', 'fa-play');
    } else {
        sound.play();
        document.getElementById('play-pause-icon').classList.replace('fa-play', 'fa-pause');
    }
}

function setVolume(value) {
    sound.volume(value);
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;

    cover.src = "../images/" + playlist[currentTrack].image;
    title.textContent = playlist[currentTrack].title;
    artist.textContent = playlist[currentTrack].artist;

    sound.stop();
    sound = new Howl({
        src: ["../sounds/" + playlist[currentTrack].file],
        autoplay: true,
        loop: false,
        volume: sound.volume(),
        onend: function() {
            nextTrack();
        }
    });
}

function prevTrack() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    sound.stop();
    sound = new Howl({
        src: [playlist[currentTrack].file],
        autoplay: true,
        loop: false,
        volume: sound.volume(),
        onend: function() {
            nextTrack();
        }
    });
}

function toggleVolumeSlider() {
    var volumeControls = document.getElementById('volume-controls');
    volumeControls.style.display = volumeControls.style.display === 'none' ? 'block' : 'none';
}
