// Selecting
const weatherForm = document.getElementById("submit");
const search = document.getElementById("address");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");
const messageThree = document.getElementById("message-3");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  messageOne.textContent = "Loading...";

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = "Location: " + data.location;
        messageTwo.textContent = "Forecast: " + data.forecast;
        messageThree.textContent = "Temperature: " + data.temperature + "°";
        search.value = "";
      }
    });
  });
});
