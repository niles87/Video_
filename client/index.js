const ul = document.getElementById("video-list");
let li = document.createElement("li");

const getVideos = async function () {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status === 200) {
        let res = JSON.parse(xhr.response);
        res.forEach((element) => {
          let title = document.createElement("p");
          let description = document.createElement("p");
          let img = document.createElement("img");
          title.innerHTML = `<strong>Title: </strong>${element.title}`;
          description.innerHTML = `<strong>Description: </strong>${element.description}`;
          img.setAttribute("alt", element.image);
          li.appendChild(title);
          li.appendChild(description);
          li.appendChild(img);
          ul.appendChild(li);
        });
      }
      if (xhr.status === 404) {
        console.log("resource not found");
      }
    }
  };
  await xhr.open("get", `${window.location.href}api/v1/`, true);
  xhr.send();
};

window.addEventListener("load", getVideos);
