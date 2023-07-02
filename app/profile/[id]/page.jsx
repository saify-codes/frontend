"use client"
import React, { useContext, useEffect, useState } from 'react'
import "@/styles/profile.css";
import { useRouter, useParams } from 'next/navigation';
import Gig from "@/components/Gig.jsx"
import GoogleMap from '@/components/Location';
import context from '@/context/context';
import Loading from '@/components/Loading';
import { Typography, Rating } from '@mui/material';

const page = () => {
    const a = useContext(context)
    const myposts = a.myposts
    const loading = a.analyticsloading
    const seller = a.publicprofile;
    const loggedIn=a.loggedIn;
    const createchat=a.createchat;
    const user=a.user;
    const getpublicprofile = a.getpublicprofile
    const pararms = useParams()
    const getlinkparams = () => {
        const searchParams = new URLSearchParams(window?.location.search);
        var link2 = searchParams.get('link');
        return link2
    };
    const handlechangeparams = (name, value) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set(name, value);
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.pushState(null, '', newUrl);
    };


    const [link, setlink] = useState(getlinkparams())

    useEffect(() => {
        getpublicprofile(pararms.id)
    }, []);





    return (
        <>
            <div className='profile-page'>
                {loading ? <Loading /> :
                    <>
                        <div className="top-section">
                            <div style={{ background: "black" }} className="cover mt-4">
                                <img className='mx-auto' src={seller?.coverimage?.url ? seller.coverimage.url : "../profile-cover.png"} alt="" />
                            </div>
                            <div className="profile-div">
                                <div className="profile">
                                    <img src={seller?.profileimage?.url ? seller.profileimage.url : "../profiledefault.jpg"} alt="Profile Image" className="profile-image" />
                                    <h2 className="name"><span>{seller?.name} </span><img src="../verified.svg" alt="" /></h2>
                                    <p className="bio">{seller?.slogan}</p>
                                    <div className="rating">
                                        <Rating
                                            name={`half-rating-read`}
                                            size="large"
                                            precision={0.5}
                                            value={seller?.totalrating}
                                            readOnly
                                            style={{ margin: "0" }}
                                        />
                                         <b>{seller?.totalrating}</b>
                                        <Typography
                                            style={{ marginLeft: "50px" }}
                                            variant="body1" gutterBottom>
                                            ({seller?.totalreviews} reviews)
                                        </Typography>
                                    </div><script src=""></script>
                                </div>
                                {
                                 user?.business===seller?._id?"":<div onClick={() => {
                                    if(loggedIn==="yes"){
                                        console.log(seller)
                                        createchat({userId:seller.user})
                                    }else{
                                        window.location.href="/buyer/login"
                                    }
                                }}  className="icon-container">
                                 Contact<img src="../message.png" alt="Icon 1" className="icon" />
                             </div>
                                }
                            </div>
                        </div>
                        <div className="profile-nav-section">
                            <div className={link === 'about' || link === null ? "active" : ""} onClick={() => {
                                setlink("about");
                                handlechangeparams("link", "about")
                            }}>
                                About
                            </div>
                            <div className={link === 'location' ? "active" : ""} onClick={() => {
                                handlechangeparams("link", "location")
                                setlink("location")
                            }}>
                                Location
                            </div>
                        </div>
                        {
                            link === "about" || link === null ?
                                <>
                                    <div className="profile-about-section py-3">
                                        <h5>Overview</h5>
                                        {seller?.description}
                                    </div>
                                    <div className=' my-5 '>
                                        <h1 className='text-center my-3'> Services</h1>
                                        <div className="gigs">
                                            {
                                                myposts.map((gig) => (
                                                    <Gig
                                                        gigid={gig._id}
                                                        images={gig.images}
                                                        title={gig.title}
                                                        price={gig.price}
                                                        reviews={gig.reviews}
                                                        sellerName={gig.business.name}
                                                        sellerid={gig.business._id}
                                                        sellerimage={gig.business.profileimage}
                                                        level="Top Rated Seller"
                                                        id={gig.business._id}
                                                    />
                                                ))
                                            }
                                        </div>

                                    </div>

                                </>
                                :
                                <>
                                </>

                        }
                        {
                            link === "location" ?
                                <>

                                    <div className=' my-3 '>
                                        <h1 className='text-center my-5'> Location</h1>
                                        <div className="map">
                                            <GoogleMap lng={seller?.location.coordinates[0]} lat={seller?.location.coordinates[1]} />

                                        </div>
                                    </div>

                                </>
                                :
                                <>
                                </>

                        }

                    </>

                }
            </div >

        </>
    )
}

export default page