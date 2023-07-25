"use client"
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import {increment, decrement, incrementByAmount} from '@/store/slices/counterSlice'
import { createAccount } from '@/store/slices/auth/authSlice';
import axios from 'axios'

const stringifiedParams = queryString.stringify({
  client_id: process.env.CLIENT_ID,
  redirect_uri: 'http://localhost:5000/authenticate/google',
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ].join(' '), // space seperated string
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
});



const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

export default function page() {
  const count = useSelector(state=>state.counter.value)
  const dispatch = useDispatch()


  const handler = async () => {
    // console.log(googleLoginUrl);
    // open(googleLoginUrl, "_blank", "width=400, height=500")
    // console.log(f.name);
    dispatch(createAccount())

  }
  return (
    <div>
      <button onClick={handler}>Login</button>
      <a href={googleLoginUrl}>mashdjhsgad</a>

      <h1>{count}</h1>
      <button onClick={()=>dispatch(increment())}>+</button>
      <button onClick={()=>dispatch(incrementByAmount(50))}>-</button>
    </div>
  )
}
