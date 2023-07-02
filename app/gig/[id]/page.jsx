"use client"
import Loading from '@/components/Loading'
import context from '@/context/context'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { Typography, Rating } from '@mui/material';
import "./giglanding.css"
import { Modal, Form } from 'react-bootstrap'
const Page = () => {
  const { id } = useParams()
  const a = useContext(context);
  const getpublicgig = a.getpublicgig;
  const gig = a.publicgig;
  const user = a.user;
  const createorder = a.createorder;
  const loggedIn = a.loggedIn;

  const gigloading = a.gigloading;
  const creatproductorder = a.creatproductorder;
  const authloading = a.authloading
  const [street, setstreet] = useState("")
  const [city, setcity] = useState("")
  const [State, setState] = useState("")
  const [postcode, setpostcode] = useState("")
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    getpublicgig(id)
  }, [id])
  const [userCoordinates, setUserCoordinates] = useState(null);
  // const businessCoordinates = { latitude: 37.7749, longitude: -122.4194 }; 

  useEffect(() => {
    // Function to get user's location coordinates using the Geolocation API
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setUserCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        }, (error) => {
          console.error('Error getting user location:', error);
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getUserLocation();
  }, []);
  const calculateDistance = () => {
    if (!gig) return 'Calculating...'
    if (!userCoordinates) return 'Calculating...';
    if (!gig.business) return 'Calculating...';

    const R = 6371; // Radius of the Earth in km
    const lat1 = userCoordinates.latitude;
    const lon1 = userCoordinates.longitude;
    const lon2 = gig.business.location.coordinates[0];
    const lat2 = gig.business.location.coordinates[1];
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance.toFixed(2);
  };

  const toRadians = (angle) => {
    return angle * (Math.PI / 180);
  };
  // Handle Order;
  const handlerorder = () => {
    if (loggedIn === "no") {
      alert("Please Login to continue!")
      window.location.href = "/buyer/signin";
    } else if (user.business === gig.business._id) {
      alert("You are not allowed to order from your self")
    }
    else {
      // Take payment from buyer
      if (gig.type === "service") {
        createorder(gig._id)
      } else {
        handleOpenModal()
      }

    }
  }
  function calculateAverageRating(reviews) {
    console.log(reviews)
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = sum / reviews.length;

    return average.toFixed(1);
  }


  const handledeliveryaddressSubmit = () => {
    creatproductorder({ id: gig._id, deliveryaddress: `${street},${city},${State},${postcode},Canada` })

  }
  return (
    <div>
      {gigloading ? (
        <Loading />
      ) : (
        <div className="gig container">
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Deliver Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form style={{ maxWidth: "600px", margin: "auto" }} className='container my-3' onSubmit={handledeliveryaddressSubmit}>
                <Form.Group className='my-3' controlId="gigTitle">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter street number and house number"
                    style={{ padding: "8px" }}
                    className="input-field"
                    rows={7}
                    value={street}
                    onChange={(e) => setstreet(e.target.value)}
                    required
                  />

                </Form.Group>
                <Form.Group className='my-3' controlId="gigTitle">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    as="input"
                    placeholder="Enter street number and house number"
                    className="input-field"
                    rows={7}
                    value={State}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />

                </Form.Group>
                <Form.Group className='my-3' controlId="gigTitle">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    as="input"
                    placeholder="Enter street number and house number"
                    className="input-field"
                    rows={7}
                    value={city}
                    onChange={(e) => setcity(e.target.value)}
                    required
                  />

                </Form.Group>
                <Form.Group className='my-3' controlId="gigTitle">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    as="input"
                    className="input-field"
                    rows={7}
                    value={"Canada"}
                    required
                    disabled
                  />

                </Form.Group>
                <Form.Text className="text-muted">
                  At this time we are only in canada
                </Form.Text>


                <hr />
                <button disabled={authloading} type="submit" style={{ width: "auto", float: "right" }} className="login-btn  btn mt-3">
                  {authloading ? "Loading..." : "Submit"}
                </button></form>
            </Modal.Body>
          </Modal>
          <div className="seller-info mt-3">
            <img style={{ margin: "3px" }} width={50} height={50} src={gig?.business?.profileimage?.url ? gig.business.profileimage.url : "../profiledefault.jpg"} alt="Profile Image" />
            <a className="seller-name mx-1 gig?-link" onClick={()=>window.location.href=`/profile/${gig?.business._id}`}  >{gig?.business.name}</a>
            <div className="level">Level 2</div>
            <div className="rating mx-2" >
              <Rating
                name={`half-rating-read`}
                size="large"
                precision={0.5}
                value={calculateAverageRating(gig?.reviews)}
                readOnly
                style={{ marginBottom: "3px" }}
              />
              <b>{gig?.reviews ? calculateAverageRating(gig.reviews) : "Not rated"}&#160;({gig?.reviews.length ? gig.reviews.length : 0} ) </b>
            </div>
          </div>
          <div className="image">
            <div id={`hero-carousel-${gig?._id}`} className="carousel slide" >
              <div className="carousel-indicators">
                {gig?.images.map((img, index) => (
                  <button
                    type="button"
                    data-bs-target={`#hero-carousel-${gig?._id}`}
                    data-bs-slide-to={index}
                    className={index === 0 ? "active" : ""}
                    aria-current="true"
                    aria-label={`Slide ${index + 1}`}
                    key={index}
                  ></button>
                ))}
              </div>
              <div className="carousel-inner">
                {gig?.images.map((img, index) => (
                  <div className={`carousel-item ${index === 0 ? "active" : ""} c-item`} key={index}>
                    <img src={img.url} className="d-block  c-img" alt="Slide 1" />
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target={`#hero-carousel-${gig?._id}`} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target={`#hero-carousel-${gig?._id}`} data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="content">
            <div className="title gig-link my-2">{gig?.title}</div>
            <div className="description mb-3">
              <h2>About</h2>
              {gig?.description}
            </div>
            <div className="buttons">
              <div className="price">Distance : <b>{calculateDistance()}km</b> </div>
              {
                gig?.type !== "job" ? <div className="price">Price : {gig?.price}$</div> : <div className="price">Salary : {gig?.price}$</div>
              }
              {
                gig?.type !== "job" ?
              <div className="delivery">
                {
                  gig?.type === "food" ?
                    ` Delivery in ${gig?.deliverytime} minutes` :
                    ` Delivery in ${gig?.deliverytime} day/s`
                }
              </div>:""}
              <div>
                {
                  gig?.type !== "job" ? <div style={{ cursor: "pointer" }} className="orderbtn my-3" onClick={handlerorder}>
                    Order Now
                  </div> : <div
                    style={{ cursor: "pointer" }}
                    className="orderbtn my-3"
                    onClick={() => {
                      let website = gig?.website;
                      if (!website.startsWith("http://") && !website.startsWith("https://")) {
                        website = "https://" + website;
                      }
                      window.open(website, "_blank");
                    }}
                  >
                    Apply Now
                  </div>


                }
              </div>
            </div>
          </div>
          <div className="reviews">
            <h4>Reviews</h4>
            {gig?.reviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="profile">
                  <img src={review.user?.profileimage?.url ? review.user.profileimage.url : "../profiledefault.jpg"} alt="Profile Image" className="profile-image" />
                  <h5 className="name mx-3">{review.user.name} </h5>
                </div>
                <Rating
                  name={`half-rating-read`}
                  size="large"
                  precision={0.5}
                  value={review.rating}
                  readOnly
                  style={{ marginLeft: "50px" }}
                />
                <Typography
                  style={{ marginLeft: "50px" }}
                  variant="body1" gutterBottom>
                  {review.comment}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
