import React, { useCallback } from 'react'
import { useState,useEffect } from 'react';
import { useSocket } from '../context/SocketProvider';
import { useNavigate } from 'react-router-dom';

import Style from '../Style/Lobby.module.css';
export default function Lobby() {
  const [form, setForm] = useState({
    email: '',
    roomNo: ''
  });
  const navigate = useNavigate();
  const socket = useSocket();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const handleform = useCallback(
    (e) => {
      e.preventDefault();
    // console.log(form);
      socket.emit('room:join', form);
  }, [form, socket]
  );
  const handleRoomJoin = useCallback((data) => {
    const {email, roomNo} = data;
    // console.log("Data from sever");
    // console.log(email,roomNo);
    navigate(`/room/${roomNo}`);
  }, [navigate]); 
  useEffect(() => { 
    socket.on('room:joined', handleRoomJoin);
    return () => {
      socket.off('room:joined', handleRoomJoin);
    }
  },[socket,handleRoomJoin] );

  return (
    <div className={Style.main}>
      
      <form className={Style.form} onSubmit={handleform}>
      <div className={Style.title}>WebRTC</div>
      <div className={Style.subtitle}>By:Arpit Bansal</div>
      <div className={Style.input_container}>
          <input className={Style.input} type="email" name='email' onChange={handleChange} placeholder='Email' />
          <input className={Style.input} type="number" name='roomNo' onChange={handleChange} placeholder='Room no'/>
          <button className={Style.submit} type='submit'>Join</button>
          

      </div>
      </form>
    </div>
  )
}
