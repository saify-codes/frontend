"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import context from '@/context/context'
import './chat.css'
import Loading from '@/components/Loading.jsx'
import InfiniteScroll from "react-infinite-scroll-component"
const { io } = require("socket.io-client");
const Chat = () => {
  const host = process.env.BACKEND
  const { chatId } = useParams()
  const a = useContext(context);
  const getmsgs = a.getallmessages
  const loading = a.loading;
  const messages = a.messages
  const [limit, setLimit] = useState(0);
  const setmessages = a.setmessages
  const user = a.user
  const getallchats = a.getallchats
  const Chats = a.Chats
  const msgloading = a.msgloading
  const hasmore = a.hasmore;
  const router = useRouter()

  let socket;
  const [socketconnected, setsocketconnected] = useState()
  const [msg, setmsg] = useState('')

  useEffect(() => {
    var verifyauth = localStorage.getItem('africa-login-token')
    if (verifyauth === undefined || verifyauth === null) {
      window.location.href = "/buyer/signin"
    }
    socket = io(host);
    setsocketconnected(socket)
  }, [])
  useEffect(() => {
    if (user) {
      console.log(user._id)
      socketconnected?.emit('setup', user._id)
    }
  }, [user])
  useEffect(() => {
    if (chatId !== 'none') {
      getmsgs({ chatId, limit });
      console.log("newchat", messages)
      socket.emit('join chat', chatId);
    }
  }, [chatId])
  useEffect(() => {
    getallchats()

  }, [])
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    if (Chats.length > 0 && currentChat === null) {
      var chat = Chats.filter((child) => child._id === chatId)
      setCurrentChat(chat[0])
      console.log('here')
    }
  }, [Chats])



  useEffect(() => {
    // Add the event listener for "message received"
    const handleReceivedMessage = (messageReceived) => {
      if (chatId === "none" || chatId !== messageReceived.chat._id) {
        // Find the chat object with the given ID and add a notification
      } else {
        console.log(messageReceived);
        setmessages((prevMessages) => [ messageReceived,...prevMessages]);
      }
    };

    socketconnected?.on("message received", handleReceivedMessage);
    return () => {
      socketconnected?.off("message received", handleReceivedMessage);
    };
  });

  const sendmsg = async (e) => {
    e.preventDefault();
    if (!msg || msg.trim() === '') {
      return;
    }

    setmsg('')

    setmessages((prevMessages) => [{ content: msg, sender: { _id: user._id }, createdAt: "now" }, ...prevMessages]);
    // setmessages([...messages, { content: msg, sender: { _id: user._id }, createdAt: "now" }])

    const response = await fetch(`${host}/api/message/sendmsg`, {
      method: "post",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        "authorization": localStorage.getItem('africa-login-token')
      },
      body: JSON.stringify({ content: msg, chatId, type: "normal" })
    })

    const json = await response.json();

    socketconnected.emit("new message", json.message)

  }

  function getFormattedDate(date) {
    if (!date) {
      return
    }
    if (date === "now") {
      date = new Date()
    } else {
      date = new Date(date)
    }
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) {
      return 'Today';
    } else if (isYesterday) {
      return 'Yesterday';
    } else {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear().toString().slice(-2);
      return `${month}/${day}/${year}`;
    }
  }
  function getTimeFromDate(date) {
    if (!date) {
      return
    }
    if (date === "now") {

      date = new Date()
    } else {
      date = new Date(date)
    }
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }
  // const handleScroll = (event) => {
  //   const scrollTop = event.target.scrollTop;

  //   if (scrollTop === 0) {
  //     setLimit((prevLimit) => prevLimit + 10); // Increase the limit by 20 when scrolled to the top
  //     getmsgs({ chatId, limit: limit + 10 });
  //   }


  // };

  const getmoremsgs = () => {
    setLimit((prevLimit) => prevLimit + 15); // Increase the limit by 20 when scrolled to the top
    getmsgs({ chatId, limit: limit + 15 });
  }

  // useEffect(()=>{
  // if(scrollTop){
  //   const container=document.getElementById('messages');
  //   if(container){
  //     console.log(scrollTop)
  //     container.scrollHeight=scrollTop
  //   }
  // }
  // },[scrollTop])

  return (
    <>

      <div className={`chat-container ${currentChat ? "chatselected" : ""} `}>
        <div className="chat-sidebar">
          <div className="chat-list">
            {/* Render list of chats */}
            {
              Chats?.map((chat, index) => {
                return <div
                  key={index}
                  className={`chat ${currentChat?._id === chat._id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const newId = chat._id; // Replace 'your_new_id_here' with the updated ID (chat._id)
                    window.location.href = `/chat/${newId}`; 

                  }}
                >
                  <div className="chat-userinfo">
                    <div className="chat-img">
                      <img src="../../profiledefault.jpg" alt="" srcSet="" />
                    </div>
                    <div className="name">
                      {chat.reciever.name}
                    </div>
                  </div>
                  <div className="date">
                    <div> {getFormattedDate(chat.latestMessage?.createdAt)}
                    </div>
                    <div>{getTimeFromDate(chat.latestMessage?.createdAt)}</div>
                  </div>
                </div>
              })
            }
          </div>
        </div>

        <div className="chat-main">
          {currentChat ? (
            <div className="chat-content">
              <div className="chatbody">

                <div className="chat-header">
                  <div className="chat-userinfo">
                    <div className="chat-img">
                      <img src="../../profiledefault.jpg" alt="" srcSet="" />
                    </div>
                    <div className="name">
                      {currentChat.reciever?.name}
                    </div>
                  </div>
                </div>
                <div id='messages' className="message-list">
                  {/* {msgloading ? <Loading /> : ""} */}
                  {/* Render list of messages */}
                  <InfiniteScroll
                    dataLength={messages.length}
                    next={getmoremsgs}
                    style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                    inverse={true} //
                    hasMore={hasmore}
                    loader={<Loading />}
                    scrollableTarget="messages"
                  >{
                   !loading?( messages.map((message, index) => (
                    <div key={index} className={`message ${message.type === 'none' ? 'd-none' : ''} ${message.sender._id !== user._id ? "" : "me"}`}>
                      <div className="from">
                        {message.sender._id !== user._id ? message.sender.name : "You"}
                      </div>
                      <div className="content">
                        {message.content}
                      </div>
                      <div className="date">
                        {getFormattedDate(message?.createdAt)} {getTimeFromDate(message?.createdAt)}
                      </div>
                    </div>

                  ))):<Loading/>
                    }
                  </InfiniteScroll>
                </div>

              </div>
              <div className="message-bar">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="message-input"
                  value={msg}
                  onKeyUp={(event) => {
                    if (event.key === 'Enter' && !event.ctrlKey) {
                      sendmsg(event);
                    }
                  }}
                  onChange={(e) => setmsg(e.target.value)}
                // Handle input changes
                />
                <img style={{ cursor: "pointer" }} onClick={sendmsg} width={37} src="../../sendmsg.png" alt="" srcSet="" />
              </div>
            </div>

          ) : (
            <div className="chat-placeholder">
              {/* <span>Select a chat</span> */}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Chat