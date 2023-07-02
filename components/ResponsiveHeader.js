import { bubble as Menu } from 'react-burger-menu'

import React from 'react';
import './responsiveheader.css';
import Link from 'next/link';
const ResponsiveNavbar=({LogStatus,logout})=> {

 
  const showSettings=()=>{

  }

 
    return (
<div id='outer-container'>


      <Menu right noOverlay width={"50vw"} pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
        <Link href={"/home"} className="newsletter" >
        Start a search
          </Link>
          <Link href={"/news-letter"} className="newsletter" >
            Newsletter
          </Link>
          <Link href={"/community"} className="newsletter" >
          Community
          </Link>
          {
            LogStatus ? (
              <>
                  <Link href={"/home"} className="newsletter" >
        Profile
          </Link>
          <Link href={"/chats"} className="newsletter" >
            Messages
          </Link>
          <Link href={"/createpost"} className="newsletter" >
            Make A Post
          </Link>
          <Link href={"/createnews"} className="newsletter" >
            Create News
          </Link>
          <Link href={"/activity"} className="newsletter" >
          Activity
          </Link>
          <div className="button" onClick={logout}>
            <div className="log-in">Log out</div>
          </div>
              </>
            ): (
              <>
          <Link href={"/comming"} className="button">
            <div className="log-in">Log in</div>
          </Link>
          <Link   href={"/comming"} className="button1">
            <div className="sign-up">Sign up</div>
          </Link>
              </>
            )
          }
      </Menu>
</div>
    );
  }
export default ResponsiveNavbar;