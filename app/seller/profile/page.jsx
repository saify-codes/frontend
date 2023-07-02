"use client"
import React, { useContext, useEffect, useState } from 'react'
import "@/styles/profile.css";
import { useRouter } from 'next/navigation';
import { NextPage } from "next";
import Gig from "@/components/Gig.jsx"
import GigAnalytics from "@/components/GigAnalytics.jsx"
import { useSearchParams } from 'next/navigation'
import GoogleMap from '@/components/Location';
import context from '@/context/context';
import Loading from '@/components/Loading';
const page = () => {
    const a = useContext(context)
    const mygigs = a.mygigs
    const myposts = a.myposts
    const myproducts  = a.myproducts 
    const myfoods  = a.myfoods
    const myjobs  = a.myjobs
    const getmygigs = a.getmygigs
    const getmyjobs = a.getmyjobs
    const getmyposts = a.getmyposts
    const getmyproducts  = a.getmyproducts
    const getmyfoods  = a.getmyfoods
    const getpausedgigs = a.getpausedgigs
    const pausedgigs = a.pausedgigs
    const getdraftgigs = a.getdraftgigs
    const draftgigs = a.draftgigs
    const loading = a.analyticsloading
    const sellerme = a.sellerme
    const isseller = a.isseller
    const seller = a.seller
    const getgigstateparams = () => {
        if(typeof window!=="undefined"){

        const searchParams = new URLSearchParams(window?.location.search);
        var link2 = searchParams.get('gigstate');
        return link2
        }
    };
    const getproductstateparams = () => {
        if(typeof window!=="undefined"){
        const searchParams = new URLSearchParams(window?.location.search);
        var link3 = searchParams.get('productstate');
        return link3
        }
    };
    const getfoodstateparams = () => {
        if(typeof window!=="undefined"){
        const searchParams = new URLSearchParams(window?.location.search);
        var link3 = searchParams.get('foodstate');
        return link3
        }
    };
    const getjobstateparams = () => {
        if(typeof window!=="undefined"){
        const searchParams = new URLSearchParams(window?.location.search);
        var link3 = searchParams.get('jobstate');
        return link3
        }
    };
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


    const [link, setlink] = useState(getlinkparams())
    const [gigstate, setgigstate] = useState(getgigstateparams())
    const [productstate, setproductstate] = useState(getproductstateparams())
    const [foodstate, setfoodstate] = useState(getfoodstateparams())
    const [jobstate, setjobstate] = useState(getjobstateparams())

    useEffect(() => {
        if (seller === "no") {
            window.location.href = "/"
        }
    }, [seller])
    useEffect(() => {
        getmygigs();
        getmyposts();
        if (gigstate === "paused") {
            getpausedgigs()
        }
        if (gigstate === "draft") {
            getdraftgigs()
        }
        getmyproducts(productstate)
        getmyfoods(foodstate)
        getmyjobs(jobstate)
    }, []);





    return (
        <div className='profile-page'>
            <div className="top-section">
                <div style={{ background: "black" }} className="cover mt-4">
                    <img className='mx-auto' src={sellerme?.coverimage?.url ? sellerme.coverimage.url : "../profile-cover.png"} alt="" />
                </div>
                <div className="profile-div">
                    <div className="profile">
                        <img src={sellerme?.profileimage?.url ? sellerme.profileimage.url : "../profiledefault.jpg"} alt="Profile Image" className="profile-image" />
                        <h2 className="name"><span>{sellerme?.name} </span><img src="../verified.svg" alt="" /></h2>
                        <p className="bio">{sellerme?.slogan}</p>
                    </div>
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
                <div className={link === 'gigs' ? "active" : ""} onClick={() => {
                    handlechangeparams("link", "gigs")
                    setlink("gigs")
                     getmygigs(gigstate)
                }}>
                    Services
                </div>
                <div className={link === 'product' ? "active" : ""} onClick={() => {
                    handlechangeparams("link", "product")

                    setlink("product")
                    getmyproducts(productstate)
                   
                }}>
                    Product
                </div>
                <div className={link === 'food' ? "active" : ""} onClick={() => {
                    handlechangeparams("link", "food")

                    setlink("food")
                    getmyfoods(foodstate)
                }}>
                  Foods&restaurant
                </div>
                <div className={link === 'jobs' ? "active" : ""} onClick={() => {
                    handlechangeparams("link", "jobs")

                    setlink("jobs")
                    getmyjobs(jobstate)
                }}>
                  Jobs
                </div>
            </div>
            {
                link === "about" || link === null ?
                    <>
                        <div className="profile-about-section py-3">
                            <h5>Overview</h5>
                            {sellerme?.description}
                        </div>
                        <div className=' my-5 '>
                            <h1 className='text-center my-3'> Services</h1>
                            <div className="gigs">
                                {
                                    !loading ? <>
                                        {myposts.map((gig) => (
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
                                        ))}</> : <Loading />
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
                                <GoogleMap lng={sellerme?.location.coordinates[0]} lat={sellerme?.location.coordinates[1]} />

                            </div>
                        </div>

                    </>
                    :
                    <>
                    </>

            }
            {/* Services */}
            {
                link === "gigs" ?
                    <>
                        <div className="profile-nav-section mt-5">
                            <div className={gigstate === 'active' || gigstate === null ? "gig-active" : ""} onClick={() => {
                                handlechangeparams("gigstate", "active")
                                getmygigs()
                                setgigstate("active")
                            }}>
                                Active
                            </div>
                            <div className={gigstate === 'paused' ? "gig-active" : ""} onClick={() => {
                                handlechangeparams("gigstate", "paused")
                                getpausedgigs()
                                setgigstate("paused")
                            }}>
                                Paused
                            </div>
                            <div className={gigstate === 'draft' ? "gig-active" : ""} onClick={() => {
                                handlechangeparams("gigstate", "draft")
                                getdraftgigs()
                                setgigstate("draft")
                            }}>
                                Draft
                            </div>
                            <div className={"active ml-auto create-gig"} onClick={() => { window.location.href = "/seller/creategig" }}>
                                Create A new Gig
                            </div>
                        </div>
                        {
                            gigstate === "active" || gigstate === null ?
                                <>
                                    <div className="analytics-page">
                                        <div className="gig-cards">
                                            {
                                                !loading ? <GigAnalytics
                                                    title="active"
                                                    gigs={mygigs}
                                                /> : <Loading />
                                            }

                                        </div>
                                    </div>
                                </> : ""
                        }
                        {
                            gigstate === "paused" ?
                                <div className="analytics-page">
                                    <div className="gig-cards">
                                        {
                                            !loading ? <GigAnalytics
                                                title="paused"
                                                gigs={pausedgigs}
                                            /> : <Loading />
                                        }
                                    </div>
                                </div> : ""
                        }
                        {
                            gigstate === "draft" ?
                                <>
                                    <div className="analytics-page">
                                        <div className="gig-cards">
                                            {
                                                !loading ? <GigAnalytics
                                                    title="draft"
                                                    gigs={draftgigs}
                                                /> : <Loading />
                                            }
                                        </div>
                                    </div>
                                </> : ""
                        }


                    </>
                    :
                    <>
                    </>

            }
            {/* Products */}
            {
                link === "product" ?
                    <>
                        <div className="profile-nav-section mt-5">
                            <div className={productstate === 'active' || productstate === null ? "gig-active" : ""} onClick={() => {
                                handlechangeparams("productstate", "active")
                                getmyproducts("active")
                                setproductstate("active")
                            }}>
                                Active
                            </div>
                            <div className={productstate === 'paused' ? "gig-active" : ""} onClick={() => {
                                handlechangeparams("productstate", "paused")
                                getmyproducts("paused")
                                setproductstate("paused")
                            }}>
                                Paused
                            </div>
                            <div className={productstate === 'draft' ? "gig-active" : ""} onClick={() => {
                                handlechangeparams("productstate", "draft")
                                getmyproducts("draft")
                                setproductstate("draft")
                            }}>
                                Draft
                            </div>
                            <div className={"active ml-auto create-gig"} onClick={() => { window.location.href = "/seller/createproduct" }}>
                                Create A new Product
                            </div>
                        </div>
                        {
                            productstate === "active" || productstate === null ?
                                <>
                                    <div className="analytics-page">
                                        <div className="gig-cards">
                                            {
                                                !loading ? <GigAnalytics
                                                    title="active"
                                                    gigs={myproducts}
                                                /> : <Loading />
                                            }

                                        </div>
                                    </div>
                                </> : ""
                        }
                        {
                            productstate === "paused" ?
                                <div className="analytics-page">
                                    <div className="gig-cards">
                                        {
                                            !loading ? <GigAnalytics
                                                title="paused"
                                                gigs={myproducts}
                                            /> : <Loading />
                                        }
                                    </div>
                                </div> : ""
                        }
                        {
                            productstate === "draft" ?
                                <>
                                    <div className="analytics-page">
                                        <div className="gig-cards">
                                            {
                                                !loading ? <GigAnalytics
                                                    title="draft"
                                                    gigs={myproducts}
                                                /> : <Loading />
                                            }
                                        </div>
                                    </div>
                                </> : ""
                        }


                    </>
                    :
                    <>
                    </>

            }
            {/* Food */}
            {
                link === "food" ?
                    <>
                        <div className="profile-nav-section mt-5">
                            <div className={foodstate === 'active' || foodstate === null ? "gig-active" : ""} onClick={() => {
                                handlechangeparams("foodstate", "active")
                                getmyfoods("active")
                                setfoodstate("active")
                            }}>
                                Active
                            </div>
                            <div className={foodstate === 'paused' ? "gig-active" : ""} onClick={() => {
                                handlechangeparams("foodstate", "paused")
                                getmyfoods("paused")
                                setfoodstate("paused")
                            }}>
                                Paused
                            </div>
                            <div className={foodstate === 'draft' ? "gig-active" : ""} onClick={() => {
                                handlechangeparams("foodstate", "draft")
                                getmyfoods("draft")
                                setfoodstate("draft")
                            }}>
                                Draft
                            </div>
                            <div className={"active ml-auto create-gig"} onClick={() => { window.location.href = "/seller/createfood" }}>
                                Create a new product
                            </div>
                        </div>
                        {
                            foodstate === "active" || foodstate === null ?
                                <>
                                    <div className="analytics-page">
                                        <div className="gig-cards">
                                            {
                                                !loading ? <GigAnalytics
                                                    title="active"
                                                    gigs={myfoods}
                                                /> : <Loading />
                                            }

                                        </div>
                                    </div>
                                </> : ""
                        }
                        {
                            foodstate === "paused" ?
                                <div className="analytics-page">
                                    <div className="gig-cards">
                                        {
                                            !loading ? <GigAnalytics
                                                title="paused"
                                                gigs={myfoods}
                                            /> : <Loading />
                                        }
                                    </div>
                                </div> : ""
                        }
                        {
                            foodstate === "draft" ?
                                <>
                                    <div className="analytics-page">
                                        <div className="gig-cards">
                                            {
                                                !loading ? <GigAnalytics
                                                    title="draft"
                                                    gigs={myfoods}
                                                /> : <Loading />
                                            }
                                        </div>
                                    </div>
                                </> : ""
                        }


                    </>
                    :
                    <>
                    </>

            }
            {
                link === "jobs" ?
                    <>
                        <div className="profile-nav-section mt-5">
                            <div className={jobstate === 'active' || jobstate === null ? "gig-active" : ""} onClick={() => {
                                handlechangeparams("jobstate", "active")
                                getmyjobs("active")
                                setjobstate("active")
                            }}>
                                Active
                            </div>
                            <div className={jobstate === 'paused' ? "gig-active" : ""} onClick={() => {
                                handlechangeparams("jobstate", "paused")
                                getmyjobs("paused")
                                setjobstate("paused")
                            }}>
                                Paused
                            </div>
                            <div className={jobstate === 'draft' ? "gig-active" : ""} onClick={() => {
                                handlechangeparams("jobstate", "draft")
                                getmyjobs("draft")
                                setjobstate("draft")
                            }}>
                                Draft
                            </div>
                            <div className={"active ml-auto create-gig"} onClick={() => { window.location.href = "/seller/createjob" }}>
                                Create a new Job
                            </div>
                        </div>
                        {
                            jobstate === "active" || jobstate === null ?
                                <>
                                    <div className="analytics-page">
                                        <div className="gig-cards">
                                            {
                                                !loading ? <GigAnalytics
                                                    title="active"
                                                    gigs={myjobs}
                                                /> : <Loading />
                                            }

                                        </div>
                                    </div>
                                </> : ""
                        }
                        {
                            jobstate === "paused" ?
                                <div className="analytics-page">
                                    <div className="gig-cards">
                                        {
                                            !loading ? <GigAnalytics
                                                title="paused"
                                                gigs={myjobs}
                                            /> : <Loading />
                                        }
                                    </div>
                                </div> : ""
                        }
                        {
                            jobstate === "draft" ?
                                <>
                                    <div className="analytics-page">
                                        <div className="gig-cards">
                                            {
                                                !loading ? <GigAnalytics
                                                    title="draft"
                                                    gigs={myjobs}
                                                /> : <Loading />
                                            }
                                        </div>
                                    </div>
                                </> : ""
                        }


                    </>
                    :
                    <>
                    </>

            }

        </div >
    )
}

export default page