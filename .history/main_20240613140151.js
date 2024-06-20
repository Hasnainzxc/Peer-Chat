let APP_ID = "59a94246d6c244d7b261ec179d9b1c02";

let token = null;
let uid = String(Math.floor(Math.random() * 10000));

let client;
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

let init = async () => {
  try {
    console.log("Initializing Agora RTM client...");
    // Create Agora RTM client
    client = AgoraRTM.createInstance(APP_ID);
    await client.login({ uid, token });
    console.log("Client logged in with UID:", uid);

    // Create channel
    channel = client.createChannel("roomID");
    await channel.join();
    console.log("Joined channel: roomID");

    channel.on("MemberJoined", handleUserJoined); // Occurs when another member joins

    localStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    document.getElementById("user-1").srcObject = localStream;
    console.log("Local stream set");

    createOffer();
  } catch (error) {
    console.error("Error during init:", error);
  }
};

let handleUserJoined = async (MemberId) => {
  console.log("A new user has joined:", MemberId);
};

let createOffer = async () => {
  console.log("Creating offer...");
  try {
    peerConnection = new RTCPeerConnection(servers);
    remoteStream = new MediaStream();
    document.getElementById("user-2").srcObject = remoteStream;

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
      console.log("Added local track:", track);
    });

    peerConnection.ontrack = (event) => {
      console.log("On track event:", event);
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
        console.log("Added remote track:", track);
      });
    };

    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        console.log("New ICE candidate:", event.candidate);
      }
    };

    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    console.log("Offer created:", offer);
  } catch (error) {
    console.error("Error creating offer:", error);
  }
};

init()
  .then(() => {
    console.log("Init completed, creating offer...");
  })
  .catch((error) => {
    console.error("Error during init:", error);
  });
