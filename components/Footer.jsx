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
      document.getElementById('footer').style.display = "none"
    }
  }, [])

  return (
    <div id='footer' className='footer mt-5 pt-5'>

      <div className="py-5">
        <div className='d-flex gap-5 align-items-center justify-content-center flex-wrap'>
          <h2 style={{ fontFamily: "Playfair Display" }}>
            Subscribe Newsletters
          </h2>
          <form method="POST" className="border d-flex gap-3 p-2 rounded-3">
            <input
              type="email"
              name="newsletter"
              placeholder="Enter your email"
              className="form-control border-0 bg-transparent"
            />
            <button
              type="submit"
              className="btn btn-primary flex-shrink-0 py-3 px-3"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>

      <div className="circle py-5 ">
        <div className="container text-white">
          <div className="row justify-content-lg-start justify-content-center">
            <div className="col-md-6 d-flex flex-column align-items-center  align-items-lg-start justify-content-center">
              <h1 className='fw-bold' style={{ fontFamily: "Playfair Display" }}>Ready to get Started?</h1>
              <button className='btn btn-lg rounded-5 mt-3  px-4 py-3 fs-6 fw-bold' style={{background:'#EAE5D9'}} onClick={clickhandler}>KICKSTART YOUR FUTURE</button>
              <div className='mt-5 text-lg-start text-center '>
                <img className="d-block mb-3" src="../../footer-logo.svg" alt="" />
                <img className='mx-2' width={100} src="../../footer-download-1.svg" alt="" />
                <img width={100} src="../../footer-download-2.svg" alt="" />
              </div>
            </div>
            <div className="col-md-6 d-none d-lg-block">
              <img className='img-fluid' src="../../footer.svg" alt="" srcSet="" />
            </div>
          </div>
          <div className='mt-3'><p className='text-center text-lg-end '>© 2023 Africab Networking. All Rights Reserved.</p></div>
        </div>
        {/* <div className="left">
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
        </div> */}
      </div>

    </div>
  )
}

export default Footer