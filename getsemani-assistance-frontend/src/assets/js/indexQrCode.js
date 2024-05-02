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
    cameraOn = true
    cerrarCamara();
    toggleCameraBtn.textContent = "Encender cámara";
  }
}

window.addEventListener('load', (e) => {
  // encenderCamara();
  //toggleCameraBtn.textContent = "Apagar cámara";
});

const switchCameraBtn = document.getElementById("switch-camera");

switchCameraBtn.addEventListener("click", () => {
  toggleCamera();
});

function toggleCamera() {
  const constraints = {
    video: { facingMode: cameraOn ? "user" : "environment" }
  };

  navigator.mediaDevices.enumerateDevices().then(devices => {
    const videoDevices = devices.filter(device => device.kind === 'videoinput');
    const currentDeviceIndex = videoDevices.findIndex(device => device.label === video.srcObject.getVideoTracks()[0].label);
    const nextDeviceIndex = (currentDeviceIndex + 1) % videoDevices.length;
    constraints.video.deviceId = { exact: videoDevices[nextDeviceIndex].deviceId };

    // Detenemos la transmisión de video actual
    video.srcObject.getTracks().forEach(track => track.stop());

    // Solicitamos el acceso a la nueva cámara
    navigator.mediaDevices.getUserMedia(constraints)
      .then(function (stream) {
        // Asignamos la nueva transmisión de video
        video.srcObject = stream;
        // Reproducimos el video
        video.play();
        // Continuamos con el proceso de escaneo
        scanning = true;
        tick();
        scan();
      })
      .catch(error => {
        console.error('Error al cambiar de cámara:', error);
      });
  });
}



canvasElement.addEventListener("click", () => {
  const track = video.srcObject.getVideoTracks()[0];
  const capabilities = track.getCapabilities();
  // Verificamos si el enfoque automático está disponible
  if (capabilities.focusMode.includes("continuous")) {
    // Si es continuo, establecemos el modo de enfoque continuo
    const settings = track.getSettings();
    settings.focusMode = "continuous";
    track.applySettings(settings);
  } else if (capabilities.focusMode.includes("manual")) {
    // Si es manual, intentamos ajustar el enfoque manualmente
    track.applyConstraints({
      advanced: [{ focusMode: "manual" }]
    });
  }
});
