"use client"
import { useParams } from 'next/navigation'
import React, { useState, useRef, useContext, useEffect } from 'react'
import "./order.css"
import "@/styles/Signin.css";
import { Form, Button } from 'react-bootstrap';
import context from '@/context/context';
import "@/styles/profile.css"
import axios from 'axios';
import Loading from '@/components/Loading';
import Orders from "@/components/Ordercard.jsx"
import { Modal } from 'react-bootstrap';
import { Typography, Rating } from '@mui/material';
const page = () => {
  const getlinkparams = () => {
    const searchParams = new URLSearchParams(window?.location.search);
    var tab = searchParams.get('link');
    return tab
  };
  const handlechangeparams = (name, value) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(name, value);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState(null, '', newUrl);
  };
  const [link, setlink] = useState(getlinkparams())
  const { id } = useParams()
  const a = useContext(context);
  const authloading = a.authloading
  const btnloading = a.btnloading
  const user = a.user
  const order = a.order
  const getorder = a.getproductorder
  const addreview = a.addreview
  const sellerme = a.sellerme
  const sendrequirements = a.sendrequirements
  const senddelivery = a.sendproductdelivery
  const loading = a.loading
  const acceptcancel = a.acceptproductcancel
  const requestcancel = a.requestproductcancel
  const sendtrackingid = a.sendtrackingid
  useEffect(() => {
    getorder(id)
  }, [])

  // Validations
  useEffect(() => {
    if (order !== "loading") {
      console.log(user, order)
      if (user?.business !== order?.business._id && user?._id !== order.user._id) {
        window.location.href = "/";
      }
    }
  }, [order])
  // Modal delivery
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [showModal2, setShowModal2] = useState(false);

  const handleOpenModal2 = () => {
    setShowModal2(true);
  };

  const handleCloseModal2 = () => {
    setShowModal2(false);
  };
  const [reason, setreason] = useState("")

  // 
  const [rating, setrating] = useState(5)
  const [comment, setcomment] = useState("")
  const [trackingid, settrackingid] = useState("")
  const [trackingname, settrackingname] = useState("")

  const handledeliverySubmit = (event) => {
    event.preventDefault();
    sendtrackingid({ id: order._id, trackingid, trackingname });
  };

  function convertToNormalDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let period = 'AM';

    // Convert to 12-hour format
    if (hours >= 12) {
      period = 'PM';
      if (hours > 12) {
        hours -= 12;
      }
    }

    const time = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;

    return `${day}/${month}/${year}, ${time}`;
  }

  return (
    <>
      {
        loading ?
          <div className='d-flex ' style={{ minHeight: "60vh", alignItems: "center" }}>
            <Loading />
          </div>
          :
          <div style={{ minHeight: "60vh" }} className='container'>
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Deliver Order</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form style={{ maxWidth: "600px", margin: "auto" }} className='container my-3' onSubmit={handledeliverySubmit}>
                  <Form.Group className='my-3' controlId="gigTitle">
                    <Form.Label>Tracing id</Form.Label>
                    <Form.Control
                      as="input"
                      placeholder="Enter Any Details"
                      style={{ padding: "8px" }}
                      className="input-field"
                      rows={7}
                      value={trackingid}
                      onChange={(e) => settrackingid(e.target.value)}
                      required
                    />

                  </Form.Group>
                  <Form.Group className='my-3' controlId="gigTitle">
                    <Form.Label>Tracing Company</Form.Label>
                    <Form.Control
                      as="input"
                      placeholder="Enter Any Details"
                      style={{ padding: "8px" }}
                      className="input-field"
                      value={trackingname}
                      onChange={(e) => settrackingname(e.target.value)}
                      required
                    />

                    <Form.Text className="text-muted">
                      E.g Fedex,UPS
                    </Form.Text>

                  </Form.Group>



                  <hr />
                  <button disabled={authloading} type="submit" style={{ width: "auto", float: "right" }} className="login-btn  btn mt-3">
                    {authloading ? "Loading..." : "Submit"}
                  </button></form>
              </Modal.Body>
            </Modal>
            {/* Second modal */}
            <Modal show={showModal2} onHide={handleCloseModal2}>
              <Modal.Header closeButton>
                <Modal.Title>Request Cancel</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={() => requestcancel({ reason, id: order._id })}>
                  <Form.Group className='my-3' controlId="gigTitle">
                    <Form.Label>Reason For Cancel</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter complete Details"
                      style={{ padding: "8px" }}
                      className="input-field"
                      rows={7}
                      value={reason}
                      onChange={(e) => setreason(e.target.value)}
                      required
                    />
                    <Form.Text className="text-muted">
                      Share Details
                    </Form.Text>

                  </Form.Group>
                  <hr />
                  <button disabled={loading} type="submit" style={{ width: "auto", float: "right" }} className="login-btn  btn mt-3">
                    {loading ? "Loading..." : "Submit"}
                  </button></form>
              </Modal.Body>
            </Modal>
            <h2 className='text-center my-3'>Order#{id}</h2>
            <div className="profile-nav-section">
              <div className={link === 'details' || link === null ? "active" : ""} onClick={() => {
                setlink("details");
                handlechangeparams("link", "details")
              }}>
                Details
              </div>
            </div>
            {
              link === "details" || link === null ?
                <div className="orderdetails">
                  <div className="orderfiles">
                    <div className="requirements">
                      {/* Requirements */}
                      {
                        !loading ? <div style={{ display: "flex", alignItems: "center" }} className="top my-3">
                          <img width={40} height={40} className="mx-2" src="../../order-icon.svg" alt="" />
                          <h4 style={{ margin: "0" }}>{order?.user?.name} Shared the Delivery Address</h4>
                          <span style={{ alignSelf: "center" }} className='mx-3'>{convertToNormalDate(order.startdate)}</span>
                        </div> : ""
                      }
                      <div className="message">
                        {order.deliveryaddress}
                      </div>
                      {/* Delivery */}

                      {
                        order.trackingid !== null ? <div style={{ display: "flex", alignItems: "center" }} className="top my-3">
                          <img width={40} height={40} className="mx-2" src="../../tracking.png" alt="" />
                          <h4 style={{ margin: "0" }}>{order?.business?.name} Sent Tracking Id : {order.trackingid} {order.trackingname}</h4>
                        </div> : ""
                      }
                      {/* Delivery */}

                      {
                        order.status === "product delivered" || order.status === "completed" ? <div style={{ display: "flex", alignItems: "center" }} className="top my-3">
                          <img width={40} height={40} className="mx-2" src="../../order-icon2.svg" alt="" />
                          <h4 style={{ margin: "0" }}>{order?.business?.name} Marked order as arrived</h4>
                          <span style={{ alignSelf: "center" }} className='mx-3'>{convertToNormalDate(order.completedate)}</span>

                        </div> : ""
                      }
                      {/* Cancel sent */}
                      {
                        order.requestcancel !== null ? (
                          <>
                            <div style={{ display: "flex", alignItems: "center" }} className="top my-3">
                              <img width={40} height={40} className="mx-2" src="../../order-icon2.svg" alt="" />
                              <h4 style={{ margin: "0" }}>{order.requestcancel === 'business' ? order.business?.name : order.user?.name} Sent Cancel request</h4>
                            </div>
                            <div className="message">
                              <b>Reason for this request:</b> {order.reason}
                            </div>
                          </>
                        ) : ""
                      }

                      {/* Reviews */}
                      {
                        user._id === order.user?._id && order.review === undefined &&  (order.status === "product delivered" || order.status === "completed")? <>
                          <form onSubmit={(e) => {
                            e.preventDefault()
                            addreview({ comment, order: order._id, rating })
                          }}>
                            <Typography component="legend">Rating</Typography>
                            <Rating
                              name="half-rating"
                              size='large'
                              precision={0.5}
                              value={rating}
                              onChange={(event, newValue) => {
                                setrating(newValue);
                              }}
                            />
                            <Form.Group className='my-3' controlId="gigTitle">
                              <Form.Label>Comment</Form.Label>
                              <Form.Control
                                as="textarea"
                                placeholder="Enter complete Details"
                                style={{ padding: "8px", resize: "none" }}
                                className="input-field"
                                rows={3}
                                value={comment}
                                onChange={(e) => setcomment(e.target.value)}
                                required
                              />
                              <Form.Text className="text-muted">
                                Share Details
                              </Form.Text>

                            </Form.Group>
                            <button disabled={btnloading} type="submit" style={{ float: "right", background: "#108a00", color: "white", border: "none" }} className="btn btn-info mb-3">
                              {btnloading ? "Loading..." : "Add review"}
                            </button>
                          </form>
                        </>
                          : ""
                      }
                    </div>
                  </div>
                  <div className="ordersummary">

                    <>
                      <div className='my-3'>
                        <h3 style={{ display: "inline" }} >Status : {order?.secondstatus ? order.secondstatus : order.status}</h3>
                        {
                          user?.business === order?.business?._id && order?.status !== "product delivered" && order?.trackingid !== null &&order.status !== "cancelled"? <div style={{ float: "right" }} onClick={() => senddelivery(order._id)} className="btn btn-success">
                            Mark as delivered
                          </div> : ""
                        }
                        {
                          user?.business === order?.business?._id && order?.secondstatus !== "on the way" && order?.status !== "product delivered" &&order.status !== "cancelled"? <div onClick={handleOpenModal} style={{ float: "right" }} className="btn btn-success">
                            Add tracking id
                          </div> : ""
                        }
                        {
                          order.secondstatus === "dispute" ? (
                            order.requestcancel === "user" && order.business?._id === user.business ? (
                              <div id='cancelbtn' onClick={() => {
                                document.getElementById("cancelbtn").innerText = "Loading...";
                                acceptcancel({ id: order._id });
                              }} style={{ float: "right" }} className="btn btn-danger mx-2">
                                Accept Cancel
                              </div>
                            ) : (
                              order.requestcancel === "business" && order.user?._id === user._id ? (
                                <div id='cancelbtn' onClick={() => {
                                  document.getElementById("cancelbtn").innerText = "Loading...";
                                  acceptcancel({ id: order._id });
                                }} style={{ float: "right" }} className="btn btn-danger mx-2">
                                  Accept Cancel
                                </div>
                              ) : ""
                            )
                          ) : ""
                        }
                        {order.status === "product delivered" && order.business._id !== user.business ? (

                          <div id='cancelbtn' onClick={() => {
                            document.getElementById("cancelbtn").innerText = "Loading...";
                            handleOpenModal2();
                          }} style={{ float: "right" }} className="btn btn-danger mx-2">
                           Request cancel
                          </div>
                        ) : ""}
                        {order.status !== "product delivered"&&order.status !== "completed"&&order.status !== "cancelled"  ? (
                          <div id='cancelbtn' onClick={() => {
                            document.getElementById("cancelbtn").innerText = "Loading...";
                            handleOpenModal2();
                          }} style={{ float: "right" }} className="btn btn-danger mx-2">
                            Request Cancel
                          </div>
                        ) : ""}
                      </div>
                      <Orders order={order} />
                    </>
                  </div>
                </div>
                : ""
            }
          </div>
      }
    </>
  )

}

export default page