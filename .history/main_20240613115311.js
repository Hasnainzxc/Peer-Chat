let localStream;
let remoteStream;

let init = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  document.getElementById("user-1").srcObject = localStream;
};

init();
