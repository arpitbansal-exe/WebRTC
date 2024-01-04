import React, { useEffect, useCallback, useState } from 'react'
import { useSocket } from '../context/SocketProvider';
import ReactPlayer from 'react-player';
import peer from '../services/peer'
import  Style from '../Style/Room.module.css'
export default function Room() {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const handleUserJoined = useCallback(
    ({ email, id }) => {
      console.log(email, "joined the room");
      setRemoteSocketId(id);
    }, []);

  const handeCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);

  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setMyStream(stream);
      console.log("Incomming call from", from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    }, [socket]
  );
  const SendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    async ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      SendStreams();
    }
    , [SendStreams]
  );



  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [socket, remoteSocketId]);

  const handleNegoNeedIncomming = useCallback(async ({ from, offer }) => {
    console.log("Nego needed from", from);
    const ans = await peer.getAnswer(offer);
    socket.emit("peer:nego:done", { to: from, ans });
  }, [socket]);

  const handleNegoNeedFinal = useCallback(async ({ from, ans }) => {
    peer.setLocalDescription(ans);
  }, []);


  useEffect(() => {
    peer.peer.addEventListener('negotiationneeded', handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener('negotiationneeded', handleNegoNeeded);
    }
  }, [handleNegoNeeded]);



  useEffect(() => {
    peer.peer.addEventListener('track', async ev => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on('room:joined', handleUserJoined);
    socket.on('incomming:call', handleIncommingCall);
    socket.on('call:accepted', handleCallAccepted)
    socket.on('peer:nego:needed', handleNegoNeedIncomming);
    socket.on('peer:nego:final', handleNegoNeedFinal)
    return () => {
      socket.off('room:joined', handleUserJoined);
      socket.off('incomming:call', handleIncommingCall);
      socket.off('call:accepted', handleCallAccepted);
      socket.off('peer:nego:needed', handleNegoNeedIncomming);
      socket.off('peer:nego:final', handleNegoNeedFinal)
    }
  }, [socket, handleUserJoined, handleIncommingCall, handleCallAccepted, handleNegoNeedIncomming, handleNegoNeedFinal]);

  return (
    <div>
      <div className={Style.Title}>Room</div>
      <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
      {
        myStream && <button className={Style.Button} onClick={SendStreams} > Send Stream </button>
      }
      <br />
      {remoteSocketId && <button className={Style.Button} onClick={handeCallUser}>Call</button>}


      <div className={Style.Container} >
      <div className={Style.Streams_Container}> 
        {
          myStream && <div>
            <h1>My Stream</h1>
            <ReactPlayer className={Style.Streams}
              playing muted
              width="600px"
              height="300px" url={myStream} />
          </div>
        }
      </div>
      <div className={Style.Streams_Container}>
      {
        
        remoteStream && <div>
          <h1>Remote Stream</h1>
          <ReactPlayer className={Style.Streams}
            playing muted
            width="600px"
            height="300px" url={remoteStream} />
        </div>
      }
      </div>
      </div>
    </div>
  )
}
