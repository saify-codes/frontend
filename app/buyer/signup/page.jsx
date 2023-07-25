"use client"
import "@/styles/Signin.css"; // <======================= 🤨 why it has wrong import name?
import Link from "next/link";
import styled from "@emotion/styled";
import axios from 'axios'
import { useRouter } from "next/navigation"
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { isValidEmail } from "@/regex/validations";
import { TailSpin } from "react-loader-spinner";
import { setIsLoading, setError } from '@/store/slices/auth/authSlice'

const page = () => {


  // states
  const router = useRouter()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, show] = useState(false)
  const isAuthenticating = useSelector(state => state.auth.inProcess)
  const authError = useSelector(state => state.auth.error)



  // styled components
  const Error = styled.small`color:var(--bs-danger);`

  // handlers
  const createAccount = async (postData) => {
    dispatch(setIsLoading(true))
    const endpoint = `${process.env.BACKEND}/api/auth/signup`;
    const data = await axios.post(endpoint, postData, { withCredentials: true })
      .catch(res => {
        dispatch(setIsLoading(false))
        dispatch(setError(res.response.data.message))
      })
    dispatch(setIsLoading(false))
    if (data?.status == 200) {
      router.push("/buyer/signin")
    }
    console.log(data);
  }


  return (
    <div className="signin container-fluid">
      <div className="row">
        <div className="signup-left   col-md-6">
          {/* <h2 className="text">Bridging the gap in the black community</h2> */}
        </div>
        <div className="signin-right  col-md-6">
          <form onSubmit={handleSubmit(createAccount)} className="sign-form">
            <h2 className="login-head text-center my-4">Create Account</h2>
            <div className="text-muted mb-2">Let's get started for free</div>

            {authError && <div class="alert alert-danger" role="alert">{authError}</div>}


            <div className="form-group my-2 has-validation ">
              <label htmlFor="email">Name <span className="red">*</span></label>
              <input
                className="form-control"
                {...register("name", { required: true })}
              />
              <Error>{errors.name && "Name is required"}</Error>
            </div>
            <div className="form-group my-2">
              <label htmlFor="email">Email <span className="red">*</span></label>
              <input
                className="form-control"
                {...register("email", { required: true, pattern: isValidEmail })}
              />
              <Error>{errors.email?.type == 'required' && "Email is required"}</Error>
              <Error>{errors.email?.type == 'pattern' && "Email is invalid"}</Error>
            </div>
            <div className="form-group my-2">
              <label htmlFor="password">Password <span className="red">*</span></label>
              <div className="input-group pass-group">
                <input
                  className="form-control"
                  style={{ border: "none" }}
                  type={showPassword ? 'text' : 'password'}
                  {...register("password", { required: true, minLength: 8 })}
                />

                <div className="cursor-pointer icon-pass" onClick={() => show(show => !show)}>{showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}</div>
              </div>
              <Error>{errors.password?.type == 'required' && "Password is required"}</Error>
              <Error>{errors.password?.type == 'minLength' && "Must be at least 8 characters"}</Error>
            </div>

            <button type="submit" className="login-btn button btn mt-3 d-flex gap-2">Sign up <TailSpin height="20" width="20" color="#AAA" radius="1" visible={isAuthenticating} /></button>
            <div className="google-logo-parent mx-auto">
              <img className="google-logo-icon" alt="" src="../google-logo@2x.png" />
              <div className="login-google mx-2">Sign up with Google</div>
            </div>
            <div className="forget-your-password-parent">
              <Link href={"/seller/signup"} className="forget-your-password">
                Join as a seller?
              </Link>
              <Link href={"/buyer/signin"} className="signup-for-new">Sign in to your account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default page;
