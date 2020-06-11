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
        console.log(res);
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
    console.log("clicking");
    let id = e.target.getAttribute("data");
    console.log(id);
    watchVideo(id);
  }
};

window.addEventListener("load", getVideos);

section.addEventListener("click", function (e) {
  clickEvent(e);
});
