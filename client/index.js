const section = document.getElementById("video-list");
const h3 = document.getElementById("list-title");

// video player variables
const player = document.querySelector(".player");
const video = player.querySelector(".player_video");
const progress = player.querySelector(".elapsed");
const progressBar = player.querySelector(".elapsed_filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const volume = player.querySelector(".player_slider");

let mouseDown = false;

const getVideos = function () {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status === 200) {
        let res = JSON.parse(xhr.response);
        res.forEach(function (element) {
          let div = document.createElement("div");
          let title = document.createElement("p");
          let description = document.createElement("p");
          let img = document.createElement("img");
          div.setAttribute("data", element._id);
          div.className = "content";
          title.innerHTML = `<strong>Title: </strong>${element.title}`;
          description.innerHTML = `<strong>Description: </strong>${element.description}`;
          img.setAttribute("alt", element.image);
          div.appendChild(title);
          div.appendChild(description);
          div.appendChild(img);
          section.appendChild(div);
        });
      }
      if (xhr.status === 404) {
        console.log("resource not found");
      }
    }
  };
  xhr.open("get", `${window.location.href}api/v1/`, true);
  xhr.send();
};

const watchVideo = function (id) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let res = JSON.parse(xhr.response);
        video.setAttribute("src", res.src);
        video.play();
      }
      if (xhr.status === 404) {
        console.log("resource not found");
      }
    }
  };
  xhr.open("get", `${window.location.href}api/v1/${id}`, true);
  xhr.send();
};

const clickEvent = function (e) {
  if (e.target && e.target.matches("div.content")) {
    let id = e.target.getAttribute("data");
    if (player.className === "player inactive") {
      player.className = "player active";
      section.style.display = "none";
    }
    watchVideo(id);
  }
};

const playVideoToggle = function () {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const updateButton = function () {
  const icon = this.paused ? "▶️" : "| |";
  toggle.textContent = icon;
};

const handleElapsed = function () {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

const skip = function () {
  video.currentTime += parseFloat(this.dataset.skip);
};

const handleVolumeUpdate = function () {
  video[this.name] = this.value;
};

const scrub = function (e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

const videoEnded = function () {
  section.style.display = "flex";
};

// event listeners

window.addEventListener("load", getVideos);

section.addEventListener("click", function (e) {
  clickEvent(e);
});
video.addEventListener("click", playVideoToggle);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleElapsed);
video.addEventListener("ended", videoEnded);

toggle.addEventListener("click", playVideoToggle);

skipButtons.forEach(function (button) {
  button.addEventListener("click", skip);
});

volume.addEventListener("change", handleVolumeUpdate);

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", function (e) {
  mouseDown && scrub(e);
});
progress.addEventListener("mousedown", function () {
  mouseDown = true;
});
progress.addEventListener("mouseup", function () {
  mouseDown = false;
});
