"use client"
import React, { useContext, useEffect } from 'react'
import "./footer.css"
import context from '@/context/context';
import axios from 'axios';
const Footer = () => {
  const a = useContext(context)
  const loggedIn = a.loggedIn;
  const seller = a.seller;
  const isseller = a.isseller;
  useEffect(() => {
    isseller()
  }, [])

  const clickhandler = () => {
    if (loggedIn === "yes") {
      if (seller === "no") {
        window.location.href = "/seller/beseller"
      } else {
        alert("You are already A seller!")
      }
    } else {
      window.location.href = "/seller/signup"
    }
  }
  const isChatPage = () => {
    const pathname = window.location.pathname;

    return pathname.startsWith('/chat/');
  };
  useEffect(() => {
    if (isChatPage()) {
      document.getElementById('footer').style.display="none"
    }
  }, [])

  return (
    <div id='footer' className='footer mt-5'>
      <div className="left">
        <h1 className='my-5 text-center'>Ready to get Started?</h1>
        <button className='footer-btn button mb-5' onClick={clickhandler}>Become A Seller</button>
        <img width={200} src="../../footer-logo.svg" alt="" />
        <div className='mt-2'>
          <img className='mx-2' width={100} src="../../footer-download-1.svg" alt="" />
          <img width={100} src="../../footer-download-2.svg" alt="" />
        </div>
      </div>
      <div className="right">
        <img src="../../footer.svg" alt="" srcSet="" />
      </div>

    </div>
  )
}

export default Footer