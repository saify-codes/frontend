"use client"
import React, { useContext, useEffect, useState } from 'react'
import "@/styles/profile.css";
import Order from "@/components/Orders.jsx"
import context from '@/context/context';
import Loading from '@/components/Loading';
const page = () => {
  const getlinkparams = () => {
    if(typeof window!=="undefined"){

    const searchParams = new URLSearchParams(window?.location.search);
    var link2 = searchParams.get('link');
    return link2
    }
  };
  const handlechangeparams = (name, value) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(name, value);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState(null, '', newUrl);
  };
  // Get my orders
  const a = useContext(context);
  const orders = a.orders;
  const loading = a.loading
  const getmyorders = a.getmyorders;


  const [link, setlink] = useState(getlinkparams())

  useEffect(() => {
    if (link === null) {
      getmyorders("active")
    } else {
      getmyorders(link)
    }
  }, [link])

  return (
    <div className='container' style={{ minHeight: "60vh" }}>
      <h1 className='text-center my-3 ' >Orders</h1>
      <div className="profile-nav-section">
        <div className={link === 'active' || link === null ? "active" : ""} onClick={() => {
          setlink("active");
          handlechangeparams("link", "active")
        }}>
          Active
        </div>
        <div className={link === 'cancelled' ? "active" : ""} onClick={() => {
          handlechangeparams("link", "cancelled")
          setlink("cancelled")
        }}>
          Cancelled
        </div>
        <div className={link === 'completed' ? "active" : ""} onClick={() => {
          handlechangeparams("link", "completed")
          setlink("completed")
        }}>
          Completed
        </div>
      </div>
      <div className="gig-cards">
        {
          !loading ? <Order orders={orders} /> : <Loading />
        }
      </div>

    </div>
  )
}

export default page