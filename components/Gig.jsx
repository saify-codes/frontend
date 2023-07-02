import React from 'react';
import PropTypes from 'prop-types';
import './GigCard.css';

const GigCard = ({ gigid,images, title, price,  sellerName,sellerimage, level, reviews,id ,sellerid}) => {
    function calculateAverageRating(reviews2) {
        if (!reviews2 || reviews2.length === 0) {
          return 0;
        }
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        const average = sum / reviews.length;
    
        return average.toFixed(1); // Round to 1 decimal places
      }
    return (
        <div className="gig-card">
            <div className="image">

                <div id={`hero-carousel-${gigid}`}  className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {
                            images.map((img, index) => {
                                return <button type="button" data-bs-target={`#hero-carousel-${gigid}`} data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-current="true"
                                    aria-label={`Slide ${index + 1}`} key={index}></button>
                            })

                        }
                    </div>

                    <div className="carousel-inner">
                        {
                            images.map((img, index) => {
                                return <div  className={`carousel-item ${index === 0 ? "active" : ""} c-item`} key={index}>
                                    <img src={img.url}
                                        className="d-block  c-img" alt="Slide 1" />
                                </div>
                            })

                        }
                    </div>
                    <button className="carousel-control-prev" type="button"  data-bs-target={`#hero-carousel-${gigid}`}  data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button"  data-bs-target={`#hero-carousel-${gigid}`}  data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="content">
                <div className="seller-info">
                    <img
                     src={sellerimage?.url?sellerimage.url:"../profiledefault.jpg"}
                        alt="Profile Image"
                    />
                    <a onClick={()=>window.location.href=`/profile/${sellerid}`}  className="seller-name gig-link">{sellerName}</a>
                    <div className="level">{level}</div>
                </div>
                <a onClick={()=>window.location.href=`/gig/${gigid}`} className="title gig-link">{title}</a>
                <div className="rating">
                    <img src="../rating-star.svg" alt="" /><b>{reviews ? calculateAverageRating(reviews) : "Not rated"}&#160;({reviews?.length ? reviews.length : 0} ) </b>
                </div>
                <div className="price">Price${price}</div>
            </div>
        </div>
    );
};


export default GigCard;
