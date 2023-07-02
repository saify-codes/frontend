
import React, { useContext } from 'react';
import './GigAnalytics.css';
import context from '@/context/context';

const GigCard = ({ orders }) => {
  function shortenString(str) {
    if (str.length <= 40) {
      return str;
    } else {
      return str.slice(0, 37) + '...';
    }
  }
  function convertToNormalDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
  
    return `${day}/${month}/${year}`;
  }
  
  const a=useContext(context)
//   const sellerme=a.sellerme;
//   const user=a.user;
  return (
    <div className="gig-analytics-card">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Buyer</th>
            <th>Business</th>
            <th>Gig</th>
            <th>Price</th>
            <th>Due On</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => (
            <tr style={{cursor:"pointer"}} onClick={()=>{
              if(order.type==="product"){
                window.location.href=`/productorder/${order._id}`
              }else{
                window.location.href=`/order/${order._id}`
              }
            }} key={index}>
              <td><span>{order.user.name}</span></td>
              <td><span>{order.business.name}</span></td>
              <td className='d-flex align-items-center'>
                <a href={`/gig/${order.gig._id}`} className='gig-link'>{shortenString(order.gig.title)}</a>
              </td>
              <td><span>{order.price}$</span></td>
              <td>{order.deliverytime?convertToNormalDate(order.deliverytime):"Not given"}</td>
              <td>{order.secondstatus?order.secondstatus:order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GigCard;
