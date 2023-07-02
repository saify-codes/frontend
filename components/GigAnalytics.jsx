
import React, { useContext } from 'react';
import './GigAnalytics.css';
import { Dropdown } from 'react-bootstrap';
import context from '@/context/context';

const GigCard = ({ title, gigs }) => {
  function shortenString(str) {
    if (str.length <= 40) {
      return str;
    } else {
      return str.slice(0, 37) + '...';
    }
  }
  const a = useContext(context);
  const deletegig = a.deletemygig;
  const updategigstatus = a.updategigstatus;
  return (
    <div className="gig-analytics-card">
      <table className="table">
        <thead>
          <tr>
            <th>Gig</th>
            <th>Impressions</th>
            <th>Clicks</th>
            <th>Orders</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {gigs?.map((gig, index) => (
            <tr key={index}>
              <td className='d-flex align-items-center'>
                <img src={gig?.images[0]?.url} alt={shortenString(gig.title)} className="gig-image" />
                <a href={`/gig/${gig._id}`} className='gig-link'>{shortenString(gig.title)}</a>
              </td>
              <td><span>{gig.impressions}</span></td>
              <td>{gig.clicks}</td>
              <td>{gig.orders}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle style={{ background: "#acadad", border: "none" }} variant="primary" id="dropdown-basic">
                    <i className="bi bi-caret-down-fill"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>

                    <Dropdown.Item onClick={() => {
                      const verify = window.confirm('Do you really want to Delete this gig?');
                      if (verify) {
                        deletegig({ id: gig._id });
                      }
                    }}>Delete</Dropdown.Item>

                    {title === "draft" &&(
                        <Dropdown.Item href={`/seller/create${gig.type}?tab=1&id=${gig._id}`}>Edit</Dropdown.Item>
                    )}

                    {title === "active" && (
                      <>
                        <Dropdown.Item href={`/seller/create${gig.type}?tab=1&id=${gig._id}`}>Update</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                          const verify = window.confirm('Do you really want to pause this gig?');
                          if (verify) {
                            updategigstatus({ id: gig._id, status: "paused" });
                          }
                        }}>Pause</Dropdown.Item>
                      </>

                    )}

                    {title === "paused" && (
                      <>
                       <Dropdown.Item onClick={() => {
                          updategigstatus({ id: gig._id, status: "active" });
                        }}>Activate</Dropdown.Item>
                        <Dropdown.Item href={`/seller/create${gig.type}?tab=1&id=${gig._id}`}>Update</Dropdown.Item>
                       
                      </>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GigCard;
