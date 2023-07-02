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
import { Typography ,Rating} from '@mui/material';
const page = () => {
  const getlinkparams = () => {
    if(typeof window!=="undefined"){
    const searchParams = new URLSearchParams(window?.location.search);
    var tab = searchParams.get('link');
    return tab
    }
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
  const getorder = a.getorder
  const addreview = a.addreview
  const sellerme = a.sellerme
  const sendrequirements = a.sendrequirements
  const senddelivery = a.senddelivery
  const loading = a.loading
  const acceptcancel = a.acceptcancel
  const requestcancel = a.requestcancel
  const acceptdelivery = a.acceptdelivery
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
  // Requirements page
  const [files, setFiles] = useState([]);
  const [rating, setrating] = useState(5)
  const [comment, setcomment] = useState("")
  const [bodyrequirementfiles, setRequirementFiles] = useState([]);
  const [requirementtext, setrequirementstext] = useState("")
  const [isReaderReady, setIsReaderReady] = useState(true);

  const fileInputRef = useRef();
  const getExtensionFromFileName = (file) => {
    var fileName = file.name;
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex !== -1 && lastDotIndex < fileName.length - 1) {
      return fileName.substring(lastDotIndex);
    }
    return '';
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

    const reader = new FileReader();

    const readNextFile = (index) => {
      if (index >= selectedFiles.length) {
        setIsReaderReady(true);
        return;
      }

      const file = selectedFiles[index];

      reader.onload = () => {
        const base64File = reader.result;
        setRequirementFiles((prevBase64Files) => [...prevBase64Files, { file: base64File, type: getExtensionFromFileName(file), name: file.name }]);
        readNextFile(index + 1);
      };

      reader.onerror = (error) => {
        console.error("Error occurred while reading the file:", error);
        setIsReaderReady(true);
      };

      reader.readAsDataURL(file);
    };

    if (isReaderReady) {
      setIsReaderReady(false);
      readNextFile(0);
    }
  };

  // const handleRemoveFile = (fileIndex) => {
  //   setFiles((prevFiles) => prevFiles.filter((_, index) => index !== fileIndex));
  // };

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendrequirements({ order: order._id, requirementtext, bodyrequirementfiles });
  };
  const handledeliverySubmit = (event) => {
    event.preventDefault();
    senddelivery({ order: order._id, deliverytext: requirementtext, bodydeliveryfiles: bodyrequirementfiles });
  };


  function formatFileSize(fileSize) {
    if (fileSize < 1024 * 1024) {
      // Size is less than 1 MB
      const sizeInKB = Math.round(fileSize / 1024);
      return sizeInKB + ' KB';
    } else {
      // Size is 1 MB or greater
      const sizeInMB = (fileSize / (1024 * 1024)).toFixed(2);
      return sizeInMB + ' MB';
    }
  }
  function truncateString(string) {
    const maxLength = 8;

    if (string.length > maxLength) {
      const truncatedString = string.substring(string.length - maxLength);
      return '...' + truncatedString;
    }

    return string;
  }
  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      return updatedFiles;
    });

    setRequirementFiles((prevBase64Files) => {
      const updatedBase64Files = prevBase64Files.filter((_, i) => i !== index);
      return updatedBase64Files;
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const downloadFile = async (fileUrl, fileName) => {
    try {
      const response = await axios.get(fileUrl, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error occurred while downloading the file:', error);
    }
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
                    <Form.Label>Order Delivery</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter Any Details"
                      style={{ padding: "8px" }}
                      className="input-field"
                      rows={7}
                      value={requirementtext}
                      onChange={(e) => setrequirementstext(e.target.value)}
                      required
                    />
                    <Form.Text className="text-muted">
                      Share everything
                    </Form.Text>

                  </Form.Group>
                  <div>
                    <label htmlFor="file-upload" className="file-upload-icon">
                      <input
                        type="file"
                        id="file-upload"
                        multiple
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                      {
                        isReaderReady ? <> <span>Upload</span> <img className='upload-btn' width={50} style={{ cursor: "pointer" }} src="../../uploadfile.png" alt="Upload" srcset="" /></>
                          : "Loading..."
                      }
                    </label>
                  </div>



                  <div className='allfiles'>
                    {files.map((file, index) => (
                      <div className='uploadedimgs mx-2 my-2' key={index}>
                        {file.type.startsWith('image/') ? (
                          <img className='uploadedimg' style={{ width: "100%", margin: "auto" }} src={URL.createObjectURL(file)} alt={file.name} />
                        ) : (
                          <div className='file-info'>

                            <div><img width={50} src="../../fileimg.jpg" alt="" srcset="" /></div>
                            <div>{truncateString(file.name)}</div>
                            <div>{formatFileSize(file.size)}</div>
                          </div>
                        )}
                        <div className='crossicon' onClick={() => handleRemoveFile(index)}>
                          ❌
                        </div>
                      </div>
                    ))}
                  </div>
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
              {
                order.requirementtext === null && order.business?._id !== user?.business ? <div className={link === 'requirements' ? "active" : ""} onClick={() => {
                  handlechangeparams("link", "requirements")
                  setlink("requirements")
                  // console.log(order.business,user.business)
                }}>
                  Requirements
                </div> : ""
              }
            </div>
            {
              link === "details" || link === null ?
                <div className="orderdetails">
                  <div className="orderfiles">
                    <div className="requirements">
                      {/* Requirements */}
                      {
                        !loading && order.requirementtext !== null ? <div style={{ display: "flex", alignItems: "center" }} className="top my-3">
                          <img width={40} height={40} className="mx-2" src="../../order-icon.svg" alt="" />
                          <h4 style={{ margin: "0" }}>{order?.user?.name} Sent Requirements</h4>
                          <span style={{ alignSelf: "center" }} className='mx-3'>{convertToNormalDate(order.startdate)}</span>
                        </div> : ""
                      }
                      <div className="message">
                        {order.requirementtext}
                      </div>

                      <div className='allfiles'>
                        {!loading ? (order.requirementfiles?.map((file, index) => (
                          <div className='uploadedimgs downloadimgs mx-2 my-2' key={index}>
                            {file.extension === 'png' || file.extension === 'jpg' ? (
                              <img className='uploadedimg' style={{ width: "100%", margin: "auto" }} src={file.url} alt={file.name} />
                            ) : (
                              <div className='file-info'>

                                <div><img width={50} src="../../fileimg.jpg" alt="" srcset="" /></div>
                                <div>{truncateString(file.name)}</div>
                                <div>1.4mb</div>
                              </div>
                            )}
                            <div className='downloadicon' style={{ cursor: "pointer" }} onClick={() => downloadFile(file.url, file.name)}>
                              <img width={20} src="../../downloadicon.png" alt="" />
                            </div>
                          </div>
                        ))) : ""
                        }

                      </div>
                      {/* Delivery */}

                      {
                        !loading && order.deliverytext !== null ? <div style={{ display: "flex", alignItems: "center" }} className="top my-3">
                          <img width={40} height={40} className="mx-2" src="../../order-icon2.svg" alt="" />
                          <h4 style={{ margin: "0" }}>{order?.business?.name} Sent Delivery</h4>
                          <span style={{ alignSelf: "center" }} className='mx-3'>{convertToNormalDate(order.completedate)}</span>
                        </div> : ""
                      }
                      <div className="message">
                        {order.deliverytext}
                      </div>

                      <div className='allfiles'>
                        {!loading ? (order.deliveryfiles?.map((file, index) => (
                          <div className='uploadedimgs downloadimgs mx-2 my-2' key={index}>
                            {file.extension === 'png' || file.extension === 'jpg' ? (
                              <img className='uploadedimg' style={{ width: "100%", margin: "auto" }} src={file.url} alt={file.name} />
                            ) : (
                              <div className='file-info'>

                                <div><img width={50} src="../../fileimg.jpg" alt="" srcset="" /></div>
                                <div>{truncateString(file.name)}</div>
                                <div>1.4mb</div>
                              </div>
                            )}
                            <div className='downloadicon' style={{ cursor: "pointer" }} onClick={() => downloadFile(file.url, file.name)}>
                              <img width={20} src="../../downloadicon.png" alt="" />
                            </div>
                          </div>
                        ))) : ""
                        }


                      </div>

                      {
                        user?._id === order.user?._id && order.deliverytext !== null && order.status !== "completed"&&order.status !== "cancelled" ? <> <div id='acceptbtn' onClick={() => {
                          document.getElementById("acceptbtn").innerText = "Loading...";
                          acceptdelivery({ id: order._id })
                        }} style={{ float: "right", background: "#108a00", color: "white", border: "none" }} className="btn btn-info my-3">
                          Accept Delivery
                        </div>
                        </> : ""
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
                        user?._id === order.user?._id && order.review === undefined && order.status === "completed" ? <>
                          <form onSubmit={(e) =>{
                            e.preventDefault()
                           addreview({ comment, order: order._id,rating })
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
                          user?.business === order?.business?._id && order?.status !== "completed"&& order?.status !== "cancelled" ? <div onClick={handleOpenModal} style={{ float: "right" }} className="btn btn-success">
                            Deliver
                          </div> : ""
                        }
                        {
                          order.secondstatus === "dispute" ? (
                            order.requestcancel === "user" && order.business?._id === user?.business ? (
                              <div id='cancelbtn' onClick={() => {
                                document.getElementById("cancelbtn").innerText = "Loading...";
                                acceptcancel({ id: order._id });
                              }} style={{ float: "right" }} className="btn btn-danger mx-2">
                                Accept Cancel
                              </div>
                            ) : (
                              order.requestcancel === "business" && order.user?._id === user?._id ? (
                                <div id='cancelbtn' onClick={() => {
                                  document.getElementById("cancelbtn").innerText = "Loading...";
                                  acceptcancel({ id: order._id });
                                }} style={{ float: "right" }} className="btn btn-danger mx-2">
                                  Accept Cancel
                                </div>
                              ) : ""
                            )
                          ) : order.status !== "completed" ? (

                            <div id='cancelbtn' onClick={() => {
                              document.getElementById("cancelbtn").innerText = "Loading...";
                              handleOpenModal2();
                            }} style={{ float: "right" }} className="btn btn-danger mx-2">
                              Request Cancel
                            </div>
                          ) : ""
                        }
                      </div>
                      <Orders order={order} />
                    </>
                  </div>
                </div>
                : ""
            }
            {
              link === "requirements" && order.requirementtext === null && order.business !== user?.business ?
                <form style={{ maxWidth: "600px", margin: "auto" }} className='container my-3' onSubmit={handleSubmit}>
                  <Form.Group className='my-3' controlId="gigTitle">
                    <Form.Label>Order Requirements</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter Order requirements"
                      style={{ padding: "8px" }}
                      className="input-field"
                      rows={7}
                      value={requirementtext}
                      onChange={(e) => setrequirementstext(e.target.value)}
                      required
                    />
                    <Form.Text className="text-muted">
                      Share everything
                    </Form.Text>

                  </Form.Group>
                  <div>
                    <label htmlFor="file-upload" className="file-upload-icon">
                      <input
                        type="file"
                        id="file-upload"
                        multiple
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                      {
                        isReaderReady ? <> <span>Upload</span> <img className='upload-btn' width={50} style={{ cursor: "pointer" }} src="../../uploadfile.png" alt="Upload" srcset="" /></>
                          : "Loading..."
                      }
                    </label>
                  </div>



                  <div className='allfiles'>
                    {files.map((file, index) => (
                      <div className='uploadedimgs mx-2 my-2' key={index}>
                        {file.type.startsWith('image/') ? (
                          <img className='uploadedimg' style={{ width: "100%", margin: "auto" }} src={URL.createObjectURL(file)} alt={file.name} />
                        ) : (
                          <div className='file-info'>

                            <div><img width={50} src="../../fileimg.jpg" alt="" srcset="" /></div>
                            <div>{truncateString(file.name)}</div>
                            <div>{formatFileSize(file.size)}</div>
                          </div>
                        )}
                        <div className='crossicon' onClick={() => handleRemoveFile(index)}>
                          ❌
                        </div>
                      </div>
                    ))}
                  </div>

                  <button disabled={authloading} type="submit" style={{ width: "auto", float: "right" }} className="login-btn  btn mt-3">
                    {authloading ? "Loading..." : "Submit"}
                  </button></form>
                : ""
            }
          </div>
      }
    </>
  )

}

export default page