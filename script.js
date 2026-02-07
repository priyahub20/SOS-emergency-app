function sendSOS() {
  const status = document.getElementById("status");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      // Update map with live coordinates
      document.querySelector("iframe").src = `https://www.google.com/maps?q=${lat},${lon}&hl=es;z=14&output=embed`;

      status.style.display = "block";
      status.innerHTML = `
        <strong>📍 Live Location:</strong> ${lat.toFixed(4)}° N, ${lon.toFixed(4)}° E<br>
        <strong>🚨 Alert Status:</strong> SOS sent to emergency contacts.<br>
        <strong>📞 Contacts:</strong> ${savedContacts.length > 0 ? savedContacts.join(", ") : "No contacts saved"}
      `;

      alert("✅ SOS Alert sent with your live location!");
    });
  } else {
    alert("❌ Geolocation not supported on this device.");
  }
  status.className = "sending";
status.style.display = "block";
status.innerText = "📡 Sending SOS Alert...";
setTimeout(() => {
  status.className = "status-box";
  // then display the live location message
}, 2000);
}
function saveContacts() {
  const name1 = document.getElementById('name1').value;
  const phone1 = document.getElementById('phone1').value;
  const name2 = document.getElementById('name2').value;
  const phone2 = document.getElementById('phone2').value;

  savedContacts = [];
  if (name1 && phone1) savedContacts.push(`${name1} (${phone1})`);
  if (name2 && phone2) savedContacts.push(`${name2} (${phone2})`);

  localStorage.setItem("contacts", JSON.stringify(savedContacts));

  alert("📞 Contacts saved successfully!");
  showPage('home');
}

window.onload = function() {
  const stored = JSON.parse(localStorage.getItem("contacts"));
  if (stored) savedContacts = stored;
};
const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/send-sos", async (req, res) => {
  const { latitude, longitude } = req.body;

  const message = `🚨 SOS ALERT 🚨
I am in danger.
Location: https://maps.google.com/?q=${latitude},${longitude}`;

  try {
    await axios.post("https://www.fast2sms.com/dev/bulkV2", {
      route: "q",
      message: message,
      language: "english",
      numbers: "9876543210"
    }, {
      headers: {
        authorization: "YOUR_FAST2SMS_API_KEY"
      }
    });

    res.send({ status: "SOS Sent Successfully" });
  } catch (error) {
    res.send({ status: "SMS Failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
fetch("http://localhost:3000/send-sos", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    latitude: lat,
    longitude: lon
  })
})
.then(res => res.json())
.then(data => alert(data.status));
function showPage(pageId) {
  const pages = document.querySelectorAll(".page");
  pages.forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");

  const navButtons = document.querySelectorAll("nav button");
  navButtons.forEach(btn => btn.classList.remove("active"));

  if (pageId === "home") navHome.classList.add("active");
  if (pageId === "contacts") navContacts.classList.add("active");
  if (pageId === "about") navAbout.classList.add("active");
}

