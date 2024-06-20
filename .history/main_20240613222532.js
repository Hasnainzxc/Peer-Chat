let APP_ID = "59a94246d6c244d7b261ec179d9b1c02";
// let AgoraRTM;
// let token = null;
// let uid = String(Math.floor(Math.random() * 10000));

let Client;
let channel;

let localStream;

console.log("Script loaded");

let remoteStream;
let peerConnection;

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

// let init = async () => {
//   client = await AgoraRTM.createInstance(APP_ID);
//   await client.login({ uid, token });

//   channel = client.createChannel(roomId);
//   await channel.join();

//   channel.on("MemberJoined", handleUserJoined);
//   channel.on("MemberLeft", handleUserLeft);

//   client.on("MessageFromPeer", handleMessageFromPeer);

//   localStream = await navigator.mediaDevices.getUserMedia(constraints);
//   document.getElementById("user-1").srcObject = localStream;
// };

let createOffer = async () => {
  peerConnection = new RTCPeerConnection(servers);
  remoteStream = new MediaStream();
  document.getElementById("user-2").srcObject = remoteStream;

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);

    console.log("added localtrack:", track);
  });

  peerConnection.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);

      console.log("added remote track:", track);
    });
  };

  peerConnection.onicecandidate = async (event) => {
    if (event.candidate) {
      console.log(" new ICe candidate:", event.candidate);
    }
  };

  let offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  console.log("offer:", offer);
};
init() // Call the init function to start the initialization process
  .then(() => {
    // This block executes if init() resolves successfully
    console.log("Init completed, creating offer..."); // Log a success message
    return createOffer(); // Call createOffer to create a WebRTC offer
  })
  .catch((error) => {
    // This block executes if init() is rejected (i.e., an error occurs during init)
    console.error("Error during init:", error); // Log an error message with the error details
  });
