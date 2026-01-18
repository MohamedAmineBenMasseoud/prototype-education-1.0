let cameraActive = false;
let currentCard = null;
const cameraBtn = document.querySelectorAll(".camera-btn");
const cameraContainer = document.getElementById("cameraContainer");
const videoElement = document.getElementById("camera");
const captureBtn = document.getElementById("captureBtn");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
cameraBtn.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    cameraContainer.style.display = "block";
    currentCard = btn.closest(".mission-card");
    if (!cameraActive) {
      startCamera();
    }
  });
});
function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      videoElement.srcObject = stream;
      cameraActive = true;
    })
    .catch(err => {
      console.error("Erreur lors de l'accès à la caméra : ", err);
      alert("Impossible d'accéder à la caméra. Assurez-vous d'être en HTTPS ou de tester en local avec un serveur.");
    });
}
captureBtn.addEventListener("click", () => {
  ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  checkImage();
  videoElement.srcObject.getTracks().forEach(track => track.stop());
  cameraContainer.style.display = "none";
});
function checkImage() {
  const result = Math.random() > 0.5 ? "success" : "failure";
  if (result === "success") {
    completeMission(currentCard, true);
  } else {
    completeMission(currentCard, false);
  }
}
function completeMission(card, success) {
  if (card.classList.contains("completed")) return;
  if (success) {
    card.classList.add("completed");
    avatar.src = "../photos/Avatar fier.jpeg";
    alert("Félicitations ! Mission réussie. Continue comme ça !");
  } else {
    card.classList.remove("completed");
    avatar.src = "../photos/Avatar content.jpeg";
    alert("Dommage ! Essaie encore une fois, tu peux le faire !");
  }
}
