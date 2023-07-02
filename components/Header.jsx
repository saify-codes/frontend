"use client"
import Link from "next/link";
import "./Header.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
if (typeof window !== 'undefined') {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }
import { useContext, useEffect, useState } from "react";
import context from "@/context/context";
const Header = () => {
    const logout = () => {
        localStorage.removeItem("africa-login-token")
        window.location.href="/"
    }
    const a = useContext(context);
    const isloggedin = a.isloggedin
    const loggedIn = a.loggedIn
    const sellerme = a.sellerme
    const user = a.user
    useEffect(() => {
        isloggedin()
    }, [])

    // Routes validations
    if (loggedIn === "no"&&typeof window!=="undefined") {
        if ( window.location.pathname === "/seller/profile" &&window.location.pathname.includes("/orders")) {
            window.location = "/buyer/signin";
        }
    }
    // 
    const isseller = a.isseller
    const seller = a.seller
    useEffect(() => {
        isloggedin()
        isseller()
    }, [])

    function shortenString(str) {
        if (str&&str.length <= 20) {
            return str;
        } else {
            return str?.slice(0, 17) + '...';
        }
    }

    const [show, setshow] = useState(false)
    return (
        <div className={ typeof window !== 'undefined' && window.location.pathname === '/'
        ? 'navbar navbar-home'
        : 'navbar'}>

            <div className="container2" style={{zIndex:"1"}}>
                <a href={"/"} >
                    <img className="logo" alt="" width={300} height={38} src="https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" />
                </a>
                <div className="column">
                    <a href={"/"} className="newsletter" >
                        Home
                    </a>
                    <a href={"/news-letter"} className="newsletter">
                        newsletter
                    </a>
                    <a href={"/community"} className="newsletter" >
                        Community

                    </a>
                </div>
                <div className="column1 mx-3">

                    {loggedIn === "no" ?
                        <>
                            <a href={"/buyer/signin"} className="button">
                                <div className="log-in"> Login
                                </div>
                            </a>
                            <a href={"/buyer/signup"} className="button1">
                                <div className="sign-up">    Sign Up
                                </div>
                            </a>
                        </> : ""
                    }
                    <div className={loggedIn === "yes" ? "" : "laptop-none"}>

                        <div onClick={() => (setshow(!show))} className={show ? "checked icon" : "icon"}>

                            <input type="checkbox" />

                            <span></span>
                            <span></span>
                            <span></span>

                        </div>

                    </div>

                    <div className={show ? "popupmenu" : "popupmenunone"}>
                        {
                            loggedIn === "yes" ? <div className="loggedin">
                                <div className="d-avatar-parent">
                                    <div className="d-avatar4">
                                        <img
                                            className="i-iconuser-swap nav-img"
                                            alt="Profile Photo"
                                            src={user?.profileimage?.url?sellerme.profileimage.url:"../profiledefault.jpg"}
                                        />
                                    </div>
                                    <div className="user-info">
                                        <div className="oleg-ojo"><b>{shortenString(user?.name)}</b> </div>
                                        <div className="nav-email">{shortenString(user?.email)}</div>
                                    </div>
                                </div>
                                {
                                    seller === "yes" ?
                                        <><div className="master-header-user-menu ">
                                            <div onClick={() => window.location = "/seller/profile"} className="profile">Profile</div>

                                        </div>
                                            <div className="master-header-user-menu border-b" onClick={() => { window.location = '/seller/profile?link=gigs' }}>
                                                <div className="profile">Gigs</div>
                                                <img
                                                    className="i-icongearsix-settings-sw"
                                                    alt=""
                                                    src=""
                                                    style={{ filter: "invert(100%)" }}

                                                />
                                            </div></> : ""
                                }

                                <div className="master-header-user-menu mobilenav">
                                    <div className="profile">Home</div>

                                </div>
                              
                                <div className="master-header-user-menu mobilenav">
                                    <div className="profile">newsteller</div>

                                </div>
                                <div className="master-header-user-menu mobilenav">
                                    <div className="profile">Community</div>

                                </div>
                                <div className="master-header-user-menu" >
                                    <div onClick={() => { window.location.href = '/orders'}} className="profile">Orders</div>
                                </div>
                                <div className="master-header-user-menu" >
                                    <div onClick={() => { window.location.href = '/chat/none'}} className="profile">Chats</div>
                                </div>
                                <div className="master-header-user-menu" onClick={() => { window.location = '/createpost', hideHandler() }}>
                                    <div onClick={() => { window.location = '/createpost', hideHandler() }} className="profile">Make a Post</div>
                                    <img
                                        onClick={() => { window.location = '/createpost', hideHandler() }}
                                        className="i-icongearsix-settings-sw"
                                        alt=""
                                        src="../iiconglobe--swap.svg"
                                        style={{ filter: "invert(100%)" }}

                                    />
                                </div>
                                <div className="master-header-user-menu">
                                    <div className="profile">Activity log</div>

                                    <img
                                        className="i-icongearsix-settings-sw"
                                        alt=""
                                        src="../iiconclockcounterclockwise--swap.svg"
                                        style={{ filter: "invert(100%)" }}

                                    />
                                </div>
                         
                                <div className="master-header-user-menu" >
                                    <div onClick={() => { window.location = '/createnews' }} className="profile">Create News</div>

                                    <img
                                        onClick={() => { window.location = '/createnews' }}
                                        className="i-icongearsix-settings-sw"
                                        alt=""
                                        src="../iicongearsixsettings--swap.svg"
                                        style={{ filter: "invert(100%)" }}

                                    />
                                </div>
                                <div className="master-header-user-menu">
                                    <div className="profile">Help</div>

                                    <img
                                        className="i-icongearsix-settings-sw"
                                        alt=""
                                        style={{ filter: "invert(100%)" }}

                                        src="../iiconinfo--swap.svg"
                                    />
                                </div>
                                <div className="master-header-user-menu logout">
                                    <div onClick={logout} className="profile  ">Log out</div>

                                    <img
                                        onClick={logout}
                                        className="i-icongearsix-settings-sw"
                                        alt=""
                                        style={{ filter: "invert(100%)" }}

                                        src="../iiconsignout--swap.svg"
                                    />
                                </div>
                            </div> : <div className="loggedin mobilenavbar">
                                <div className="master-header-user-menu ">
                                    <div className="profile">Home</div>

                                </div>
                                <div className="master-header-user-menu ">
                                    <div className="profile">newsteller</div>

                                </div>
                                <div className="master-header-user-menu ">
                                    <div className="profile">Community</div>

                                </div>


                                <div className="master-header-user-menu">
                                    <div className="profile">Help</div>

                                    <img
                                        className="i-icongearsix-settings-sw"
                                        alt=""
                                        style={{ filter: "invert(100%)" }}

                                        src="../iiconinfo--swap.svg"
                                    />
                                </div>
                                <div className="master-header-user-menu ">
                                    <Link href={"/buyer/signin"} className="button nav-log">
                                        <div className="log-in"> Login
                                        </div>
                                    </Link>
                                </div>
                                <div className="master-header-user-menu ">

                                    <Link href={"/buyer/signup"} className="button1 nav-log">
                                        <div className="sign-up">    Sign Up
                                        </div>
                                    </Link>
                                </div>

                            </div>
                        }
                    </div>
                </div>
                {/* <ResponsiveNavbar LogStatus={true} logout={logout} /> */}
            </div>

        </div>
    );
};

export default Header;
