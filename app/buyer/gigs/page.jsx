"use client"
import React, { useContext, useEffect } from 'react'
import "./gigs.css"
import "../../Home.css"
import { useSearchParams } from 'next/navigation'
import context from '@/context/context'
import GigCard from '@/components/Gig'
import Loading from '@/components/Loading'
import { useState } from 'react'
const page = () => {
const query = useSearchParams();
const searchquery = query.get("search")
const a=useContext(context);
const loading=a.gigloading;
const resultgigs=a.resultgigs;
const getresultgigs=a.getresultgigs;
const [search, setsearch] = useState(null)
const searchbtnhandler=()=>{
  if(search){
     window.location=`/buyer/gigs?search=${search}`
  }
}
useEffect(() => {
  if(!searchquery){
    window.location.href="/"
  }
  else{
    getresultgigs({search:searchquery.toString()})
  }
}, [])


  return (
    <div className='gigs'>
      <div class="search-bar gigsearchbar my-5">
          <div  className="search-bar-body">
            <input value={search} onChange={(e)=>{setsearch(e.target.value)}} className='searchbarinput gigsearchbarinput' type="text" placeholder="Search for any service or product..." />
            <div onClick={searchbtnhandler} className="searchicon">
              <img className='mx-2' src="../searchicon.svg" alt="Search" />
            </div>
          </div>
          <select class="form-select searchselect" aria-label="Default select example">
            <option value="product">Product</option>
            <option selected value="service">Service</option>
          </select>
        </div>
      <div className="heading my-3 mx-5">
        {
          loading?"":      <span>{resultgigs.length === 0 ? "No gigs Found" : <span>Results of <b dangerouslySetInnerHTML={{ __html: searchquery }}></b></span>}</span>

        }
      </div>
      <div className="gigsbody">
        {
          !loading ? <>
            {
            resultgigs.map((gig) => (
              <GigCard
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

            ))}</> : <Loading/>
        }
      </div>
    </div>
  )
}

export default page