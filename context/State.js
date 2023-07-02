'use client';
import React, { useEffect, useState } from 'react';
import context from './context.js';
import { useSearchParams } from 'react-router-dom';
const host = "https://africanbbackend-production.up.railway.app"

const State = (props) => {
  const [user, setuser] = React.useState()
  const [loggedIn, setloggedIn] = React.useState(false)
  const [selectedlocation, setselectedlocation] = useState()
  const [authloading, setauthloading] = useState(false)
  const [gigloading, setgigloading] = useState(false)
  const [seller, setseller] = useState(false)
  const [publicprofile, setpublicprofile] = useState()
  const [mygigs, setmygigs] = useState([])
  const [myposts, setmyposts] = useState([])
  const [myproducts, setmyproducts] = useState([])
  const [myfoods, setmyfoods] = useState([])
  const [myjobs, setmyjobs] = useState([])
  const [scrolltop, setscrolltop] = useState(null)
  const [pausedgigs, setpausedgigs] = useState([])
  const [draftgigs, setdraftgigs] = useState([])
  const [me, setme] = useState(null);
  const [sellerme, setsellerme] = useState(null);
  const [analyticsloading, setanalyticsloading] = useState(false)
  const [resultgigs, setresultgigs] = useState([])
  const [draftgigdata, setdraftgigdata] = useState(null)
  const [publicgig, setpublicgig] = useState(null)
  const [order, setorder] = useState("loading")
  const [orders, setorders] = useState([])
  const [loading, setloading] = useState(false)
  const [btnloading, setbtnloading] = useState(false)
  const [hasmore, sethasmore] = useState(false);
  const [msgloading, setmsgloading] = useState(false);

  // chat
  const [thismsgname, setthismsgname] = useState('')
  const [thismsgurl, setthismsgurl] = useState('')
  const [messages, setmessages] = useState([])
  const [Chats, setChats] = useState([])
  const login = async (data) => {
    setauthloading(true)
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('africa-login-token', json.token)
      if (json.redirect) {
        window.location.href = "/seller/beseller"
      }
      else {
        setloggedIn("yes")
      }
    } else {
      alert(json.message)
    }
    setauthloading(false)

  }
  const signup = async (data) => {
    setauthloading(true)

    const response = await fetch(`${host}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)

    })
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('africa-login-token', json.token)
      window.location.href = "/buyer/signin"
    } else {
      alert(json.message)
    }
    setauthloading(false)

  }

  const isloggedin = async (data) => {
    if (localStorage.getItem('africa-login-token')) {
      const response = await fetch(`${host}/api/auth/isloggedin`, {
        method: "post",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Content-Type": "application/json",
          "authorization": localStorage.getItem('africa-login-token')
        }
      })
      const json = await response.json();
      if (!json.success) {
        localStorage.removeItem('africa-login-token');
        setloggedIn("no")
      }
      else {
        setloggedIn("yes")
        setuser(json.user)
      }
    } else {
      setloggedIn("no")

    }
  }
  const isseller = async (data) => {
    if (localStorage.getItem('africa-login-token')) {
      const response = await fetch(`${host}/api/auth/isseller`, {
        method: "post",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Content-Type": "application/json",
          "authorization": localStorage.getItem('africa-login-token')
        }
      })
      const json = await response.json();
      if (!json.success) {
        setseller("no")
      }
      else {
        setsellerme(json.seller)
        setseller("yes")
      }
    } else {
      setseller("no")

    }
  }
  const beseller = async (data) => {
    if (localStorage.getItem('africa-login-token')) {

      setauthloading(true)

      if (!selectedlocation) {
        alert("Select a Location !")
      } else {
        data.lat = selectedlocation.lat;
        data.lng = selectedlocation.lng;
        const response = await fetch(`${host}/api/beseller`, {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('africa-login-token')
          },
          body: JSON.stringify(data)
        })
        const json = await response.json();
        if (!json.success) {
          alert(json.message)
        }
        else {
          window.location.href = "/seller/profile"

        }
        setauthloading(false)

      }
    } else {
      window.location.href = "/buyer/signin"

    }
  }
  // Gigs
  const creategigdraft = async (data, nexttab) => {
    if (localStorage.getItem('africa-login-token')) {

      setgigloading(true)

      const response = await fetch(`${host}/api/gig/create-draft`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Content-Type": "application/json",
          "authorization": localStorage.getItem('africa-login-token')
        },
        body: JSON.stringify(data)
      })
      const json = await response.json();
      if (!json.success) {
        alert(json.message)
      }
      else {
        window.location = `${nexttab}&id=${json.gig._id}`
      }
      setgigloading(false)
    } else {
      window.location.href = "/buyer/signin"
    }
  }
  const getdraftgigdata = async (data) => {
    if (localStorage.getItem('africa-login-token')) {
      setgigloading(true)

      const response = await fetch(`${host}/api/gig/mysinglegig?id=${data}`, {
        method: "get",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Content-Type": "application/json",
          "authorization": localStorage.getItem('africa-login-token')
        }
      })
      const json = await response.json();
      if (!json.success) {
        alert(json.message)
      }
      else {
        setdraftgigdata(json.gig)
      }
      setgigloading(false)
    } else {
      window.location.href = "/buyer/signin"


    }
  }
  const publishgig = async (gig_id, selectedImage, selectedImage2, selectedImage3, selectedvideo) => {
    setgigloading(true);
    try {
      const response = await fetch(`${host}/api/gig/publish-gig`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Content-Type": "application/json",
          "authorization": localStorage.getItem('africa-login-token')
        },
        body: JSON.stringify({ id: gig_id, allselectedimages: [selectedImage, selectedImage2, selectedImage3], selectedvideo })
      });
      const json = await response.json();
      if (!json.success) {
        alert(json.message);
      } else {
        window.location.href = `/gig/${json.gig._id}`;
      }
    } catch (error) {
      console.error("An error occurred while publishing the gig:", error);
      alert("An error occurred while publishing the gig. Please try again later.");
    } finally {
      setgigloading(false);
    }
  };
  const getmygigs = async () => {
    if (localStorage.getItem('africa-login-token')) {

      setanalyticsloading(true);
      try {
        const response = await fetch(`${host}/api/gig/mygigs`, {
          method: "get",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('africa-login-token')
          }
        });
        const json = await response.json();
        if (!json.success) {
          alert(json.message);
        } else {
          setmygigs(json.gigs)
        }
      } catch (error) {
        alert("An error occurred while getting the gig. Please try again later.");
      } finally {
        setanalyticsloading(false);
      }
    } else {
      window.location.href = "/buyer/signin"
    }
  };
  const getpublicprofile = async (id) => {
      setanalyticsloading(true);
      try {
        const response = await fetch(`${host}/api/gig/sellergigs/${id}`, {
          method: "get",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('africa-login-token')
          }
        });
        const json = await response.json();
        if (!json.success) {
          alert(json.message);
        } else {
          var profile=json.gigs[0].business;
          profile.totalrating=json.totalrating;
          profile.totalreviews=json.totalreviews;
          setpublicprofile(profile)
          setmyposts(json.gigs);
        }
      } catch (error) {
        alert("An error occurred while getting the gig. Please try again later.");
      } finally {
        setanalyticsloading(false);
      }
  };
  const getmyposts = async () => {
    if (localStorage.getItem('africa-login-token')) {
      setanalyticsloading(true);
      try {
        const response = await fetch(`${host}/api/gig/allmypost`, {
          method: "get",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('africa-login-token')
          }
        });
        const json = await response.json();
        if (!json.success) {
          alert(json.message);
        } else {
          setmyposts(json.gigs)
        }
      } catch (error) {
        alert("An error occurred while getting the gig. Please try again later.");
      } finally {
        setanalyticsloading(false);
      }
    } else {
      window.location.href = "/buyer/signin"
    }
  };
  const getmyproducts = async (data) => {
    if (localStorage.getItem('africa-login-token')) {
      if (!data) {
        data = "active"
      }
      setanalyticsloading(true);
      try {
        const response = await fetch(`${host}/api/gig/myproducts?type=${data}`, {
          method: "get",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('africa-login-token')
          }
        });
        const json = await response.json();
        if (!json.success) {
          alert(json.message);
        } else {
          setmyproducts(json.products)
        }
      } catch (error) {
        alert("An error occurred while getting the gig. Please try again later.");
      } finally {
        setanalyticsloading(false);
      }
    } else {
      window.location.href = "/buyer/signin"
    }
  };
  const getmyfoods = async (data) => {
    if (localStorage.getItem('africa-login-token')) {
      if (!data) {
        data = "active"
      }
      setanalyticsloading(true);
      try {
        const response = await fetch(`${host}/api/gig/myfoods?type=${data}`, {
          method: "get",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('africa-login-token')
          }
        });
        const json = await response.json();
        if (!json.success) {
          alert(json.message);
        } else {
          setmyfoods(json.products)
        }
      } catch (error) {
        alert("An error occurred while getting the gig. Please try again later.");
      } finally {
        setanalyticsloading(false);
      }
    } else {
      window.location.href = "/buyer/signin"
    }
  };
  const getmyjobs = async (data) => {
    if (localStorage.getItem('africa-login-token')) {
      if (!data) {
        data = "active"
      }
      setanalyticsloading(true);
      try {
        const response = await fetch(`${host}/api/gig/myjobs?type=${data}`, {
          method: "get",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('africa-login-token')
          }
        });
        const json = await response.json();
        if (!json.success) {
          alert(json.message);
        } else {
          setmyjobs(json.products)
        }
      } catch (error) {
        alert("An error occurred while getting the gig. Please try again later.");
      } finally {
        setanalyticsloading(false);
      }
    } else {
      window.location.href = "/buyer/signin"
    }
  };

  const deletemygig = async (data) => {
    try {
      const response = await fetch(`${host}/api/gig/deletegig`, {
        method: "post",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Content-Type": "application/json",
          "authorization": localStorage.getItem('africa-login-token')
        },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      if (!json.success) {
        alert(json.message);
      } else {
        window.location.reload()
      }
    } catch (error) {
      alert("An error occurred while deleting this gig. Please try again later.");
    }

  };
  const getdraftgigs = async (data) => {
    if (localStorage.getItem('africa-login-token')) {

      setanalyticsloading(true)
      try {
        const response = await fetch(`${host}/api/gig/draftgigs`, {
          method: "get",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('africa-login-token')
          }
        });
        const json = await response.json();
        if (!json.success) {
          alert(json.message);
        } else {
          setdraftgigs(json.gigs)
        }
      } catch (error) {
        alert("An error occurred while getting these gigs. Please try again later.");
      }
      finally {
        setanalyticsloading(false);
      }
    } else {
      window.location.href = "/buyer/signin"


    }
  };
  const getpausedgigs = async (data) => {
    if (localStorage.getItem('africa-login-token')) {
      setanalyticsloading(true)
      try {
        const response = await fetch(`${host}/api/gig/pausedgigs`, {
          method: "get",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('africa-login-token')
          }
        });
        const json = await response.json();
        if (!json.success) {
          alert(json.message);
        } else {
          setpausedgigs(json.gigs)

        }
      } catch (error) {
        alert("An error occurred while getting these gigs. Please try again later.");
      } finally {
        setanalyticsloading(false);
      }
    } else {
      window.location.href = "/buyer/signin"
    }

  };
  const updategigstatus = async (data) => {
    if (localStorage.getItem('africa-login-token')) {
      setanalyticsloading(true)
      try {
        const response = await fetch(`${host}/api/gig/updategigstatus`, {
          method: "post",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('africa-login-token')
          },
          body: JSON.stringify(data)
        });
        const json = await response.json();
        if (!json.success) {
          alert(json.message);
        } else {
          window.location.reload()
        }
      } catch (error) {
        alert("An error occurred while getting these gigs. Please try again later.");
      } finally {
        setanalyticsloading(false);
      }
    } else {
      window.location.href = "/buyer/signin"
    }

  };
  const getresultgigs = async (data) => {
    var query = "limit&";
    if (data.search) {
      query += `search=${data.search}`
    }
    setgigloading(true)
    try {
      const response = await fetch(`${host}/api/gig/gigs?${query}`, {
        method: "get",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Content-Type": "application/json"
        }
      });
      const json = await response.json();
      if (!json.success) {
        alert(json.message);
      } else {
        setresultgigs(json.gigs)
      }
    } catch (error) {
      alert("An error occurred while getting these gigs. Please try again later.");
    } finally {
      setgigloading(false);
    }


  };
  const getpublicgig = async (data) => {
    setgigloading(true)
    try {
      const response = await fetch(`${host}/api/gig/gig/${data}`, {
        method: "get",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Content-Type": "application/json"
        }
      });
      const json = await response.json();
      if (!json.success) {
        alert(json.message);
      } else {
        setpublicgig(json.gig)
      }
    } catch (error) {
      alert("An error occurred while getting these gigs. Please try again later.");
    } finally {
      setgigloading(false);
    }
  };


  const createorder = async (data) => {
    setgigloading(true)
    try {
      const response = await fetch(`${host}/api/order/createorder/${data}`, {
        method: "post",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Content-Type": "application/json",
          "authorization": localStorage.getItem('africa-login-token')
        }
      });
      const json = await response.json();
      if (!json.success) {
        alert(json.message);
      } else {
        window.location.href = `/order/${json.order._id}`
      }
    } catch (error) {
      alert("An error occurred while sending this request. Please try again later.");
    } finally {
      setgigloading(false);
    }
  };
  const creatproductorder = async (data) => {
    setgigloading(true)
    try {
      const response = await fetch(`${host}/api/order/product/createorder/${data.id}`, {
        method: "post",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Content-Type": "application/json",
          "authorization": localStorage.getItem('africa-login-token')
        },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      if (!json.success) {
        alert(json.message);
      } else {
        window.location.href = `/productorder/${json.order._id}`
      }
    } catch (error) {
      alert("An error occurred while sending this request. Please try again later.");
    } finally {
      setgigloading(false);
    }
  };


  const getorder = async (data) => {
    if (localStorage.getItem('africa-login-token')) {
      setloading(true)
      try {
        const response = await fetch(`${host}/api/order/order/${data}`, {
          method: "get",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('africa-login-token')
          }
        });
        const json = await response.json();
        if (!json.success) {
          window.location = "/"
          alert(json.message);
        } else {
          setorder(json.order)
        }
      } catch (error) {
        alert("An error occurred while sending this request. Please try again later.");
      } finally {
        setloading(false);
      }
    } else {
      window.location.href = "/buyer/signin"
    }
  };
  const getproductorder = async (data) => {
    if (localStorage.getItem('africa-login-token')) {
      setloading(true)
      try {
        const response = await fetch(`${host}/api/order/productorder/${data}`, {
          method: "get",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('africa-login-token')
          }
        });
        const json = await response.json();
        if (!json.success) {
          window.location = "/"
          alert(json.message);
        } else {
          setorder(json.order)
        }
      } catch (error) {
        alert("An error occurred while sending this request. Please try again later.");
      } finally {
        setloading(false);
      }
    } else {
      window.location.href = "/buyer/signin"
    }
  };
  const getmyorders = async (data) => {
    if (localStorage.getItem('africa-login-token')) {
      setloading(true)
      try {
        const response = await fetch(`${host}/api/order/getmyorders?status=${data}`, {
          method: "get",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('africa-login-token')
          }
        });
        const json = await response.json();
        if (!json.success) {
          window.location = "/"
          alert(json.message);
        } else {
          setorders(json.orders)
        }
      } catch (error) {
        alert("An error occurred while sending this request. Please try again later.");
      } finally {
        setloading(false);
      }
    } else {
      window.location.href = "/buyer/signin"
    }
  };
  const sendrequirements = async (data) => {
    if (localStorage.getItem('africa-login-token')) {
      setloading(true)
      try {
        const response = await fetch(`${host}/api/order/sendrequirements`, {
          method: "post",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('africa-login-token')
          },
          body: JSON.stringify(data)
        });
        const json = await response.json();
        if (!json.success) {
          alert(json.message);
        } else {
          alert("Successfully Updated!")
          window.location.search = null
        }
      } catch (error) {
        alert("An error occurred while sending this request. Please try again later.");
      } finally {
        setloading(false);
      }
    } else {
      window.location.href = "/buyer/signin"
    }
  };
  const sendtrackingid = async (data) => {
    if (localStorage.getItem('africa-login-token')) {
      setloading(true)
      try {
        const response = await fetch(`${host}/api/order/product/sendtracking/${data.id}`, {
          method: "post",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('africa-login-token')
          },
          body: JSON.stringify(data)
        });
        const json = await response.json();
        if (!json.success) {
          alert(json.message);
        } else {
          alert("Successfully Updated!")
          window.location.reload()
        }
      } catch (error) {
        alert("An error occurred while sending this request. Please try again later.");
      } finally {
        setloading(false);
      }
    } else {
      window.location.href = "/buyer/signin"
    }
  };
  const sendproductdelivery = async (data) => {
    if (localStorage.getItem('africa-login-token')) {
      setloading(true)
      try {
        const response = await fetch(`${host}/api/order/product/deliver/${data}`, {
          method: "post",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('africa-login-token')
          }
        });
        const json = await response.json();
        if (!json.success) {
          alert(json.message);
        } else {
          alert("Successfully Updated!")
          window.location.reload()
        }
      } catch (error) {
        alert("An error occurred while sending this request. Please try again later.");
      } finally {
        setloading(false);
      }
    } else {
      window.location.href = "/buyer/signin"
    }
  };
  const senddelivery = async (data) => {
    if (localStorage.getItem('africa-login-token')) {
      setloading(true)
      try {
        const response = await fetch(`${host}/api/order/senddelivery`, {
          method: "post",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('africa-login-token')
          },
          body: JSON.stringify(data)
        });
        const json = await response.json();
        if (!json.success) {
          alert(json.message);
        } else {
          alert("Successfully Updated!")
          window.location.reload()
        }
      } catch (error) {
        alert("An error occurred while sending this request. Please try again later.");
      } finally {
        setloading(false);
      }
    } else {
      window.location.href = "/buyer/signin"
    }
  };
  const acceptdelivery = async (data) => {
    if (localStorage.getItem('africa-login-token')) {
      setloading(true)
      try {
        const response = await fetch(`${host}/api/order/acceptdelivery`, {
          method: "post",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('africa-login-token')
          },
          body: JSON.stringify(data)
        });
        const json = await response.json();
        if (!json.success) {
          alert(json.message);
        } else {
          alert("Successfully Updated!")
          window.location.reload()
        }
      } catch (error) {
        alert("An error occurred while sending this request. Please try again later.");
      } finally {
        setloading(false);
      }
    } else {
      window.location.href = "/buyer/signin"
    }
  };
  const requestcancel = async (data) => {
    if (localStorage.getItem('africa-login-token')) {
      setloading(true)
      try {
        const response = await fetch(`${host}/api/order/requestcancel`, {
          method: "post",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('africa-login-token')
          },
          body: JSON.stringify(data)
        });
        const json = await response.json();
        if (!json.success) {
          alert(json.message);
        } else {
          alert("Successfully Updated!")
          window.location.reload()
        }
      } catch (error) {
        alert("An error occurred while sending this request. Please try again later.");
      } finally {
        setloading(false);
      }
    } else {
      window.location.href = "/buyer/signin"
    }
  };
  const acceptcancel = async (data) => {
    if (localStorage.getItem('africa-login-token')) {
      setloading(true)
      try {
        const response = await fetch(`${host}/api/order/acceptcancel`, {
          method: "post",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('africa-login-token')
          },
          body: JSON.stringify(data)
        });
        const json = await response.json();
        if (!json.success) {
          alert(json.message);
        } else {
          alert("Successfully Updated!")
          window.location.reload()
        }
      } catch (error) {
        alert("An error occurred while sending this request. Please try again later.");
      } finally {
        setloading(false);
      }
    } else {
      window.location.href = "/buyer/signin"
    }
  };
  const requestproductcancel = async (data) => {
    if (localStorage.getItem('africa-login-token')) {
      setloading(true)
      try {
        const response = await fetch(`${host}/api/order/product/requestcancel/${data.id}`, {
          method: "post",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('africa-login-token')
          },
          body: JSON.stringify(data)
        });
        const json = await response.json();
        if (!json.success) {
          alert(json.message);
        } else {
          alert("Successfully Updated!")
          window.location.reload()
        }
      } catch (error) {
        alert("An error occurred while sending this request. Please try again later.");
      } finally {
        setloading(false);
      }
    } else {
      window.location.href = "/buyer/signin"
    }
  };
  const acceptproductcancel = async (data) => {
    if (localStorage.getItem('africa-login-token')) {
      setloading(true)
      try {
        const response = await fetch(`${host}/api/order/product/acceptcancel/${data.id}`, {
          method: "post",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('africa-login-token')
          },
          body: JSON.stringify(data)
        });
        const json = await response.json();
        if (!json.success) {
          alert(json.message);
        } else {
          alert("Successfully Updated!")
          window.location.reload()
        }
      } catch (error) {
        alert("An error occurred while sending this request. Please try again later.");
      } finally {
        setloading(false);
      }
    } else {
      window.location.href = "/buyer/signin"
    }
  };
  const addreview = async (data) => {
    if (localStorage.getItem('africa-login-token')) {
      setbtnloading(true)
      try {
        const response = await fetch(`${host}/api/gig/addreview`, {
          method: "post",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('africa-login-token')
          },
          body: JSON.stringify(data)
        });
        const json = await response.json();
        if (!json.success) {
          alert(json.message);
        } else {
          alert("Successfully Updated!")
          window.location.reload()
        }
      } catch (error) {
        alert("An error occurred while sending this request. Please try again later.");
      } finally {
        setbtnloading(false);
      }
    } else {
      window.location.href = "/buyer/signin"
    }
  };

  // Chat js
  const createchat = async (data) => {
    setanalyticsloading(true)
    const response = await fetch(`${host}/api/chat/accesschat`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        "authorization": localStorage.getItem('africa-login-token')
      },
      body: JSON.stringify(data)
    })
    const json = await response.json();
    if(json.newchat){
    sendmsg({ chatId: json.chat._id, content: "Start Chat", type: "none" });
    }else{
      window.location.href=`/chat/${json.chat._id}`
    }
  };
  const getallchats = async () => {
    const response = await fetch(`${host}/api/chat/allchats`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        "authorization": localStorage.getItem('africa-login-token')
      }
    })
    const json = await response.json();
    if (json.success) {
      setChats(json.chats)
    }
  }
  const getallmessages = async (data) => {
    if(data.limit===0){
      setloading(true)
    }
    const response = await fetch(`${host}/api/message/allmsgs`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        "authorization": localStorage.getItem('africa-login-token')
      },
      body: JSON.stringify(data)
    })
    const json = await response.json();
    if (json.success) {
      const reversedMessages = json.messages;
      setmessages((prevMessages) => [...prevMessages, ...reversedMessages]);
      setthismsgname(json.messages[0]?.receiver?.name);
      setthismsgurl(json.messages[0]?.receiver?.url);
      sethasmore(!json.allmsgs)
    }
      setloading(false)
  }
  const sendmsg = async (data) => {
    const response = await fetch(`${host}/api/message/sendmsg`, {
      method: "post",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        "authorization": localStorage.getItem('africa-login-token')
      },
      body: JSON.stringify(data)
    })
    const json = await response.json();
    setanalyticsloading(false)
    window.location.href=`/chat/${data.chatId}`
  }


  return (
    <context.Provider value={{getpublicprofile,publicprofile,
      Chats, thismsgurl, messages, thismsgname, setmessages, messages, hasmore, msgloading,
      myjobs, getmyjobs, sendmsg, getallmessages, createchat, getallchats,
      acceptproductcancel, requestproductcancel, myfoods, getmyfoods, myposts, getmyposts,
      myproducts, getmyproducts, creatproductorder, getproductorder, sendtrackingid, sendproductdelivery,
      senddelivery, acceptdelivery, requestcancel, acceptcancel, addreview,
      createorder, getorder, sendrequirements, order, orders, getmyorders, loading,
      getdraftgigdata, draftgigdata, getpublicgig, publicgig, user,
      analyticsloading, sellerme, updategigstatus, getresultgigs, resultgigs,
      publishgig, getmygigs, mygigs, deletemygig, pausedgigs, getpausedgigs, draftgigs, getdraftgigs,
      authloading, gigloading, creategigdraft, login, signup, isloggedin, loggedIn, beseller, isseller, seller, setselectedlocation
    }}>
      {props.children}
    </context.Provider>
  )
}

export default State