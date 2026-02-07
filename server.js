const sosBtn = document.getElementById("sosBtn");

sosBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sendSOS);
  } else {
    alert("Geolocation not supported");
  }
});

function sendSOS(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  fetch("http://localhost:3000/send-sos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      latitude: lat,
      longitude: lon
    })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.status);
    console.log(data);
  })
  .catch(err => {
    alert("Error sending SOS");
    console.error(err);
  });
}
