let currentSong = new Audio();
let songs;
let currfolder;

function convertSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Pad with leading zeros if necessary
  const formattedMinutes = parseInt(String(minutes).padStart(2, "0"));
  const formattedSeconds = parseInt(String(remainingSeconds).padStart(2, "0"));

  return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
  currfolder = folder;
  let a = await fetch(`${folder}`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  songs = [];
  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`${folder}`)[1].slice(1));
    }
  }

  // Show all the songs in playlist:-
  let songUL = document
    .querySelector(".songsList")
    .getElementsByTagName("ul")[0];

  songUL.innerHTML = "";

  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li class="list-item">
        <img class="invert" src="img/music.svg" alt="">
        <div class="info">
          <div>${song.replaceAll("%20", " ")}</div>
          <div>-</div>
        </div>
        <div class="playnow">
          <span>Play Now</span>
          <img class="invert" src="img/play.svg" alt="">
        </div> 
      </li>`;
  }

  // Attach an event listener to each song:-
  Array.from(
    document.querySelector(".songsList").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
  });

  return songs;
}

const playMusic = (track, pause = false) => {
  currentSong.src = `/${currfolder}/` + track;
  if (!pause) {
    currentSong.play();
    play.src = "img/pause.svg";
  }
  document.querySelector(".songinfo").innerHTML = decodeURI(track);
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";

  // Add event listener for when the song ends
  currentSong.onended = () => {
    let index = songs.indexOf(track); // Find the index of the current track
    if (index + 1 < songs.length) { // Check if there's a next song
      playMusic(songs[index + 1]); // Play the next song
    }
  };
};

async function displayAlbums() {
  let a = await fetch(`songs`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let anchors = div.getElementsByTagName("a");
  let cardContainer = document.querySelector(".cardContainer");
  let array = Array.from(anchors);

  for (let index = 0; index < array.length; index++) {
    const e = array[index];

    if (e.href.includes("songs") && !e.href.includes(".htaccess")) {
      let folder = e.href.split("/").slice(-2)[0];
      // Get the metadata of the folder:-
      let a = await fetch(`songs/${folder}/info.json`);
      let response = await a.json();
      cardContainer.innerHTML =
        cardContainer.innerHTML +
        `<div data-folder = "${folder}" class="card">
            <div class="play">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"
                   fill="000000">
                   <!-- Circular background -->
                   <circle cx="12" cy="12" r="12" fill="#0cec09" />
                   <!-- Original SVG content -->
                   <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" stroke-width="1.5"
                    stroke-linejoin="round" />
              </svg>
            </div>
            <img src="/songs/${folder}/cover.jpeg" alt="">
            <h2>${response.title}</h2>
            <p>${response.description}</p>
          </div>`;
    }
  }

  // load the playlist whenever card is clicked:-
  Array.from(document.getElementsByClassName("card")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
      playMusic(songs[0]);
      document.querySelector('.left').style.left = '0%'
    });
  });
}

async function main() {
  // Get a list of the songs:-
  await getSongs(`songs/ncs`);
  playMusic(songs[0], true);

  // Display all the albums on the page:-
  displayAlbums();

  // Attach an event listener to play:-
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "img/pause.svg";
    } else {
      currentSong.pause();
      play.src = "img/play.svg";
    }
  });

  // Listen For timeupdate event:-
  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = `${convertSeconds(
      currentSong.currentTime
    )}/${convertSeconds(currentSong.duration)}`;
    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  // Add an  event listener to seekbar:-
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });

  // Add an event listener for hamburger:-
  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0%";
  });
  // Add an event listener for close button:-
  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%";
  });

  // Add Event listener for previous and next:-
  previous.addEventListener("click", (e) => {
    currentSong.pause()
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index - 1 >= 0) {
      playMusic(songs[index - 1]);
    }
  });

  next.addEventListener("click", (e) => {
    currentSong.pause();
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index + 1 <= songs.length - 1) {
      playMusic(songs[index + 1]);
    }
  });

  // Add an event listener for volume:-
  document
    .querySelector(".range")
    .getElementsByTagName("input")[0]
    .addEventListener("change", (e) => {
      currentSong.volume = parseInt(e.target.value) / 100;
    });

  // Add event listener for mute the volume:-
  document.querySelector(".volume img").addEventListener("click", (e) => {
    if (e.target.src.includes("volume.svg")) {
      e.target.src = e.target.src.replace("volume.svg", "mute.svg");
      currentSong.volume = 0;
      document
        .querySelector(".range")
        .getElementsByTagName("input")[0].value = 0;
    } else {
      e.target.src = e.target.src.replace("mute.svg", "volume.svg");
      currentSong.volume = 0.2;
      document
        .querySelector(".range")
        .getElementsByTagName("input")[0].value = 20;
    }
  });
}

main();
