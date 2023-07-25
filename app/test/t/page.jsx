"use client"
import axios from 'axios';
import { useEffect } from 'react';
async function getAccessTokenFromCode() {
    let code = new URL(location.href).searchParams.get('code')
    const { data } = await axios({
        url: `https://oauth2.googleapis.com/token`,
        method: 'post',
        data: {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: 'http://localhost:3000/test/t2',
            grant_type: 'authorization_code',
            code,
        },
    });
    console.log({data}); // { access_token, expires_in, token_type, refresh_token }
    return data.access_token;
};


export default function page() {

  useEffect(()=>{
    getAccessTokenFromCode()
  })
  return (
    <div>{location.search}</div>
  )
}
