"use client"
import React, { useEffect, useState, useContext, useRef, forwardRef } from "react";
import context from "@/context/context";
import "@/styles/Signin.css";
// import "@/styles/creategig.css"
import Link from "next/link";

const Places = React.lazy(() => import("../../../components/Places"));

const Home = () => {
    // Google map
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const fileInputRef = useRef(null);
    const fileInputRef2 = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImage2, setselectedImage2] = useState(null)
    const handleUploadButtonClick = () => {
        fileInputRef.current.click();
    };
    const handleUploadButtonClick2 = () => {
        fileInputRef2.current.click();
    };
    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const ImageUploadButton = forwardRef((props, ref) => (
        <button ref={ref} {...props} className="btn btn-primary" style={{ display: 'none' }}>
            Upload Image
        </button>
    ));
    const handleImageSelect2 = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setselectedImage2(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&libraries=places`;
        script.async = true;
        script.onload = () => {
            setIsScriptLoaded(true);
        };
        document.body.appendChild(script);

        // return () => {
        //     document?.body?.removeChild(script);
        // };
    }, []);
    //
    const [state, setState] = useState();

    const onchangeHandler = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const a = useContext(context);
    const beseller = a.beseller;
    const seller = a.seller
    const loggedIn = a.loggedIn
    const authloading=a.authloading

    const onsubmitHandler = async (e) => {
        e.preventDefault();
        beseller({...state,selectedImage,selectedImage2});
    };

    useEffect(() => {
        if (seller === "yes") {
            window.location.href = "/"
        }

    })
    useEffect(() => {
        if (loggedIn === "no") {
            window.location.href = "/buyer/signin"
        }
    })
    //  Code of google places
    useEffect(() => {
            const handleOutsideClick = (event) => {
                if (!event.target.closest('.create-profile-images')) {
                    fileInputRef.current.value = '';
                    fileInputRef2.current.value = '';

                }
            };

            document.addEventListener('click', handleOutsideClick);
        
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);


    return (
        <div >
            <div className="signin container-fluid">
                <div className="row">
                    <div className="signin-right seller  col-md-6">
                        <form onSubmit={onsubmitHandler} className="sign-form">
                            <h2 className="login-head text-center my-4">Join as a seller</h2>
                            <div className="text-muted mb-2">Let’s get some Clients</div>
                            <div className="d-flex create-profile-images create-gig-images">
                            {/* First image profile */}
                            <div className='image-container mx-1'>
                            <div className="profileimg">

                                {selectedImage ? (
                                    <>
                                        <img src={selectedImage} style={{ overflow: 'hidden', width: "auto", height: "auto", maxWidth: "150px", maxHeight: "150px" }} alt="Selected Image" />
                                        <button className="cross-button" onClick={() => setSelectedImage(null)}>
                                            <span>&times;</span>
                                        </button></>
                                ) : (
                                    <img className='cursor-pointer' onClick={handleUploadButtonClick} src="../img.svg" alt="Default Image" />
                                )}

                                {selectedImage ? '' : <span className="text-center mt-2 cursor-pointer" onClick={handleUploadButtonClick}> Select Profile </span>}
                                </div>

                            </div>
                            <div style={{ display: 'none' }} className="mt-3">
                                <label htmlFor="imageUpload" className="btn btn-primary">
                                    Upload Image
                                </label>
                                <input
                                    type="file"
                                    id="imageUpload"
                                    ref={fileInputRef}
                                    onChange={handleImageSelect}
                                    accept="image/jpeg, image/png"
                                />
                            </div>
                            <ImageUploadButton onClick={handleUploadButtonClick} />
                            {/*  */}
                            {/* Second image profile */}
                            <div className='image-container mx-1'>
                                <div className="profileimg">
                                   
                                {selectedImage2 ? (
                                    <>
                                        <img src={selectedImage2} style={{ overflow: 'hidden', width: "auto", height: "auto", maxWidth: "150px", maxHeight: "150px" }} alt="Selected Image" />
                                        <button className="cross-button" onClick={() => setselectedImage2(null)}>
                                            <span>&times;</span>
                                        </button></>
                                ) : (
                                    <img className='cursor-pointer' onClick={handleUploadButtonClick2} src="../img.svg" alt="Default Image" />
                                )}

                                {selectedImage2 ? '' : <span className="text-center mt-2 cursor-pointer" onClick={handleUploadButtonClick2}> Select Profile </span>}
 
                                </div>
                            </div>
                            <div style={{ display: 'none' }} className="mt-3">
                                <label htmlFor="imageUpload" className="btn btn-primary">
                                    Upload Image
                                </label>
                                <input
                                    type="file"
                                    id="imageUpload"
                                    ref={fileInputRef2}
                                    onChange={handleImageSelect2}
                                    accept="image/jpeg, image/png"
                                />
                            </div>
                            <ImageUploadButton onClick={handleUploadButtonClick2} />
                            {/*  */}
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="email">Business Name <span className="red">*</span></label>
                                <input
                                    onChange={onchangeHandler}
                                    name="name"
                                    className="form-control"
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="email">Bio</label>
                                <input
                                    onChange={onchangeHandler}
                                    name="slogan"
                                    className="form-control"
                                    type="text"
                                />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="email">Description</label>
                                <textarea
                                    onChange={onchangeHandler}
                                    name="description"
                                    className="form-control"
                                    type="text"
                                />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="email">Bio</label>
                                <input
                                    onChange={onchangeHandler}
                                    name="slogan"
                                    className="form-control"
                                    type="text"
                                />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="email">Bio</label>
                                <input
                                    onChange={onchangeHandler}
                                    name="slogan"
                                    className="form-control"
                                    type="text"
                                />
                            </div>
                            <div className="form-group my-2 location">
                                <label htmlFor="email">Location <span className="red">*</span></label>
                                {isScriptLoaded ? (
                                    <React.Suspense fallback={<div>Loading...</div>}>
                                        <Places />
                                    </React.Suspense>
                                ) : (
                                    <div>Loading Google Locations...</div>
                                )}
                            </div>


                            <button disabled={authloading}  type="submit" className="login-btn button btn mt-3">
                                {authloading?"Loading...":"Create"}
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;