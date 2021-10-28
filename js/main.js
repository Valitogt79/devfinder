/* API state */
const API = "http://api.github.com/users/";
let dark = true;

/* Grab DOM elements */
const form = document.querySelector(".form");
const input = document.querySelector(".form__input");
const result = document.querySelector(".result");
const notFound = document.querySelector(".not-found");
const themeSwitch = document.querySelector(".theme__switch");
const themeCSS = document.querySelector(".theme-css");
const themeName = document.querySelector(".theme__name");
/* Listen varius event */

form.addEventListener("submit", (e) => {
  e.preventDefault();

  /* Get the username form the imput */
  const username = input.value.trim();
  if (!username) return;
  getUserData(username);
  input.value = "";
});

themeSwitch.addEventListener("click", switchTheme);

/* Query the Github API for that username */
async function getUserData(username) {
  try {
    const response = await fetch(API + username);
    if (!response.ok) {
      throw new Error("User not found");
    }
    const data = await response.json();
    showUserData(data);
  } catch (error) {
    console.error("ERROR", error);
    showNotFound();
  }
}
/* Show Not Found (404) message */
function showNotFound() {
  const image = '<img src="img/404.gif" alt="Not Found" class="not-found" />';
  result.innerHTML = image;
}

/* Show username data */
function showUserData(data) {
  const {
    login,
    avatar_url: avatar,
    name,
    company,
    blog,
    location,
    bio,
    email,
    twitter_username: twitter,
    public_repos: repos,
    followers,
    following,
    created_at: joined,
  } = data;
  const userData = `<img
          src="${avatar}"
          alt=""
          class="avatar"
        />

        <h2 class="name">${name}</h2>
        <h4 class="joined">${parseDate(joined)}</h4>
        <h5 class="username">${login}</h5>
        <p class="bio">
          ${bio}
        </p>

        <section class="stats">
          <p class="repos">Repos</p>
          <p class="followers">Followers</p>
          <p class="following">Following</p>
          <small class="repos">${repos} </small>
          <small class="followers">${followers}</small>
          <small class="following">${following}</small>
        </section>

        <nav class="contact">
          <a href="#" class="link"
            ><i class="fa fa-map-marker-alt"></i>${location}</a
          >
          <a href="#" class="link"><i class="fab fa-twitter"></i> ${twitter}</a>
          <a href="#" class="link"><i class="fab fa-github"></i> ${email}</a>
          <a href="#" class="link"
            ><i class="fas fa-link"></i> ${company}</a
          >
        </nav> `;
  result.innerHTML = userData;
  function parseDate(date) {
    let options = {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleString("es-ES", options);
  }
}
/* Do the theme Switching stuff */
function switchTheme() {
  dark = !dark;
  if (dark) {
    themeCSS.setAttribute("href", "css/light.css");
    themeName.textContent = "DARK";
  } else {
    themeCSS.setAttribute("href", "css/dark.css");
    themeName.textContent = "LIGHT";
  }
}
