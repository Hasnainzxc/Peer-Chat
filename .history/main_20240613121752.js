let localStream;
let remoteStream;
let peerConnection;

let init = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  document.getElementById("user-1").srcObject = localStream;
};

let createOffer = async  () => {
  peerConnection = new RTCPeerConnection();
  remoteStream = new MediaStream();
  document.getElementById("user-2").srcObject = remoteStream;
  localStream.getTracks().forEach((track) => {
init();
