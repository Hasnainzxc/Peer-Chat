let localStream;
let remoteStream;

let init = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  document.getElementById("user-1").srcObject = localStream;
  document.getElementById("user-2").srcObject = localStream;
};

init();
