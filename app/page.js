"use client"
import React, { useState } from 'react';
import Header from '@/components/Header';
import "./Home.css"
const Page = () => {
  const [search, setsearch] = useState("")
  const searchbtnhandler=()=>{
    if(search){
       window.location=`/buyer/gigs?search=${search}`
    }
  }
  return (
    <>
      <div className="homepage-search">
        <div className='home-text'>
          <h1 className='mt-5'>Find the right Product or service, right away</h1>
          <p>Thousands of Products and Services in different Categories are waiting for you.</p>
        </div>
        <div className="search-bar my-5">
          <div className="search-bar-body">
            <input value={search} onChange={(e)=>{setsearch(e.target.value)}} className='searchbarinput' type="text" placeholder="Search for any service or product..." />
            <div onClick={searchbtnhandler} className="searchicon">
              <img className='mx-2' src="../searchicon.svg" alt="Search" />
            </div>
          </div>
          <select defaultValue={"Product"} className="form-select searchselect" aria-label="Default select example">
            <option value="product">Product</option>
            <option value="service">Service</option>
            <option value="food">Food</option>
          </select>
        </div>
      </div>


      <div className="trusted-by max-width-container">
        <h2 className="trusted-by-text text-center mt-3" style={{ color: "#a7a6a6" }}>Trusted by</h2>
        <ul className='trustedbyul'>
          <li>
            <picture>
              <source
                media="(max-width: 899px)"
                srcSet="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.99a0dda.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta2x.d8d5bc3.png 2x"
              />
              <source
                media="(min-width: 900px)"
                srcSet="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.12b5e5c.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta2x.b364aec.png 2x"
              />
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.12b5e5c.png"
                alt="facebook"
                data-uw-rm-ima-original="facebook"
              />
            </picture>
          </li>
          <li>
            <picture>
              <source
                media="(max-width: 899px)"
                srcSet="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.9d71a37.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google2x.0053d08.png 2x"
              />
              <source
                media="(min-width: 900px)"
                srcSet="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.61e78c8.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google2x.4fa6c20.png 2x"
              />
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.61e78c8.png"
                alt="Google"
                data-uw-rm-ima-original="google"
              />
            </picture>
          </li>
          <li>
            <picture>
              <source
                media="(max-width: 899px)"
                srcSet="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.35dc5cd.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix2x.9022712.png 2x"
              />
              <source
                media="(min-width: 900px)"
                srcSet="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix2x.6b36ad6.png 2x"
              />
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png"
                alt="NETFLIX"
                data-uw-rm-ima-original="netflix"
              />
            </picture>
          </li>
          <li>
            <picture>
              <source
                media="(max-width: 899px)"
                srcSet="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg.967b1ad.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg2x.6665fbe.png 2x"
              />
              <source
                media="(min-width: 900px)"
                srcSet="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg.0f4cfc2.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg2x.0d06f7b.png 2x"
              />
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg.0f4cfc2.png"
                alt="P&G"
                data-uw-rm-ima-original="p&g"
              />
            </picture>
          </li>
          <li className="display-from-sm">
            <picture>
              <source
                media="(max-width: 899px)"
                srcSet="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.910e738.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal2x.bd199ac.png 2x"
              />
              <source
                media="(min-width: 900px)"
                srcSet="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.305e264.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal2x.d2fa54d.png 2x"
              />
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.305e264.png"
                alt="PayPal"
                data-uw-rm-ima-original="paypal"
              />
            </picture>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Page;
