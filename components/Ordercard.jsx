
import React, { useContext } from 'react';
import './GigAnalytics.css';
import context from '@/context/context';

const GigCard = ({ order }) => {
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
  function convertToNormaltime(dateString) {
    const date = new Date(dateString);

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

    return time;
  }
  const a=useContext(context)
//   const sellerme=a.sellerme;
//   const user=a.user;
  return (
    <div className="gig-analytics-card table-responsive">
      <table className="table  table-hover">
        <thead>
          <tr>
            <th>Buyer</th>
            <th>Business</th>
            <th>Gig</th>
            <th>Price</th>
            <th>Due On</th>
            <th>Due Time</th>
          </tr>
        </thead>
        <tbody>
           {
            order!=="loading"&& <tr style={{cursor:"pointer"}} onClick={()=>window.location.href=`/order/${order._id}`} >
            <td><span>{order.user.name}</span></td>
            <td><span>{order.business.name}</span></td>
            <td className='d-flex align-items-center'>
              <a href={`/gig/${order.gig._id}`} className='gig-link'>{shortenString(order.gig.title)}</a>
            </td>
            <td><span>{order.price}$</span></td>
            <td>{order.deliverytime?convertToNormalDate(order.deliverytime):"Not given"}</td>
            <td>{order.deliverytime?convertToNormaltime(order.deliverytime):"Not given"}</td>
          </tr>
           }
        </tbody>
      </table>
    </div>
  );
};

export default GigCard;
