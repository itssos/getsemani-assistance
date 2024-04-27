const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");
const btnScanQR = document.getElementById("btn-scan-qr");
const toggleCameraBtn = document.getElementById("toggle-camera");

let scanning = false;
let cameraOn = false;

const encenderCamara = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
      scanning = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true);
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    })
    .catch(error => {
      console.error('Error al encender la cámara:', error);
    });
};

const cerrarCamara = () => {
  if (video.srcObject) {
    video.srcObject.getTracks().forEach((track) => {
      track.stop();
    });
  }
  canvasElement.hidden = true;
  btnScanQR.hidden = false;
};

toggleCameraBtn.addEventListener("click", () => {
  if (cameraOn) {
    cerrarCamara();
    toggleCameraBtn.textContent = "Encender cámara";
  } else {
    encenderCamara();
    toggleCameraBtn.textContent = "Apagar cámara";
  }
  cameraOn = !cameraOn;
});

function tick() {
  if (scanning) {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    requestAnimationFrame(tick);
  }
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}

qrcode.callback = (respuesta) => {
  if (respuesta) {
    window.postMessage({ type: 'qrCodeScanned', data: respuesta }, '*');
    cerrarCamara()
  }
}

window.addEventListener('load', (e) => {
  // encenderCamara();
  //toggleCameraBtn.textContent = "Apagar cámara";
});
