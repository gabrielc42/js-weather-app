let weather = {
  apiKey: "26bac24efa79370756f4d70fc42016bc",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city + "&units=metric&appid=" + this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather information found.");
          throw new Error("No weather information found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { visibility } = data.visibility;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°F";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".visibility").innerText = "Visibility: " + visibility + " yd"
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

weather.fetchWeather("Minneapolis");


