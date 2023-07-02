"use client"
import React, { useState, useEffect, useRef, forwardRef, useContext } from 'react'
import "@/styles/creategig.css"
import { useSearchParams } from 'next/navigation'
import { Form, Button } from 'react-bootstrap';
import {categories} from '@/Category.js';
import context from '@/context/context';
import Loading from '@/components/Loading';
const page = () => {
    const searchParams = useSearchParams();
    const a = useContext(context);
    const creategigdraft = a.creategigdraft
    const publishgig = a.publishgig
    const gigloading = a.gigloading
    const getdraftgigdata = a.getdraftgigdata;
    const draftgigdata = a.draftgigdata
    useEffect(() => {
        var gig_id = searchParams.get("id");
        if (gig_id) {
            getdraftgigdata(gig_id)
        }
    }, []);
    const [tab, settab] = useState(searchParams.get('tab'))
    const categoryNames = categories.map((category) => category.name);
    const [subcategory, setsubcategory] = useState("");
    const [allsubcategories, setallsubcategories] = useState([])
    const [category, setcategory] = useState("");
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [price, setprice] = useState("")
    const [title, settitle] = useState("")
    const [deliverytime, setdeliverytime] = useState("")
    const [description, setdescription] = useState("")
    const fileInputRef = useRef(null);
    const fileInputRef2 = useRef(null);
    const fileInputRef3 = useRef(null);
    const fileInputRef4 = useRef(null);
    const deliverydays = [
        1, 2, 3, 4, 5, 6, 7, 10, 14, 21, 30, 45, 60, 75, 90
    ]
    const handleCategoryChange = (event) => {
        setcategory(event.target.value);
    };
    const getSubcategories = () => {
        const selectedCategory = categories.find((c) => c.name === category);
        if (selectedCategory) {
            setallsubcategories(selectedCategory.services);
        }
        return [];
    };
    useEffect(() => {
        getSubcategories();
    }, [category]);
    useEffect(() => {
        var gig_id = searchParams.get("id");
        if (gig_id) {
            getdraftgigdata(gig_id)
        }
        console.log(draftgigdata)

    }, []);
    useEffect(() => {
        if (tab === "1") {
            setprice(draftgigdata?.price);
            settitle(draftgigdata?.title);
            setTags(draftgigdata?.positive_tags);
            setcategory(draftgigdata?.category);
            setsubcategory(draftgigdata?.subcategory);
            setdeliverytime(draftgigdata?.deliverytime)
        }
        if (tab === "2") {
            setdescription(draftgigdata?.description)
        }
        if(tab==="3")
        {
           if(draftgigdata?.images[0]){
            setSelectedImage(draftgigdata.images[0].url)
           }
           if(draftgigdata?.images[1]){
            setselectedImage2(draftgigdata.images[1].url)
           }
           if(draftgigdata?.images[2]){
            setselectedImage3(draftgigdata.images[2].url)
           }
           if(draftgigdata?.video){
            setselectedvideo(draftgigdata.video.url)
           }
        }
    }, [draftgigdata]);


    // tags

    const handleTagInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            addTag(tagInput);
            setTagInput('');
        }
    };


    const handleTagRemove = (tag) => {
        const updatedTags = tags.filter((t) => t !== tag);
        setTags(updatedTags);
    };

    const addTag = (tag) => {
        if (tag && tags.length < 5 && !tags.includes(tag)) {
            setTags([...tags, tag]);
        }
    };
    //   Tab 1 submit
    const handletab1submit = (e) => {
        e.preventDefault()
        const gig_id = searchParams.get("id");
        if (gig_id) {
            creategigdraft({type:"gig", id: gig_id,deliverytime, title, positive_tags: tags, price, category, subcategory }, `/seller/creategig?tab=${2}`)
        } else {
            creategigdraft({type:"gig",deliverytime, title, positive_tags: tags, price, category, subcategory }, `/seller/creategig?tab=${2}`)
        }
    }
    // Tab 3 
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImage2, setselectedImage2] = useState(null)
    const [selectedImage3, setselectedImage3] = useState(null)
    const [selectedvideo, setselectedvideo] = useState(null)

    const handleUploadButtonClick = () => {
        fileInputRef.current.click();
    };
    const handleUploadButtonClick2 = () => {
        fileInputRef2.current.click();
    };
    const handleUploadButtonClick3 = () => {
        fileInputRef3.current.click();
    };
    const handleUploadButtonClick4 = () => {
        fileInputRef4.current.click();
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
    const handleImageSelect3 = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setselectedImage3(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handlevideoSelect = (event) => {
        const file = event.target.files[0];
        if (file) {

            // Validate file size
            const maxSize = 5 * 1024 * 1024; // 10MB in bytes
            if (file.size > maxSize) {
                alert('Please select a video file smaller than 10MB.');
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                setselectedvideo(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const ImageUploadButton = forwardRef((props, ref) => (
        <button ref={ref} {...props} className="btn btn-primary" style={{ display: 'none' }}>
            Upload Image
        </button>
    ));

    // useEffect(() => {
    //     if (tab === "3") {
    //         const handleOutsideClick = (event) => {
    //             if (!event.target.closest('.create-gig-images')) {
    //                 if (fileInputRef?.current?.value) {
    //                     fileInputRef.current.value = '';
    //                 }
    //                 if (fileInputRef2?.current?.value) {
    //                     fileInputRef2.current.value = '';
    //                 }
    //                 if (fileInputRef3?.current?.value) {
    //                     fileInputRef3.current.value = '';
    //                 }
    //                 if (fileInputRef4?.current?.value) {
    //                     fileInputRef4.current.value = '';
    //                 }
    //             }

    //         };

    //         document&&document.addEventListener('click', handleOutsideClick);
    //     }
    //     return () => {
    //        document&&document.removeEventListener('click', handleOutsideClick);
    //     };
    // }, []);

    //   Tab 2 submit
    const handletab2submit = (e) => {
        e.preventDefault()
        const gig_id = searchParams.get("id");
        if (gig_id) {
            creategigdraft({ id: gig_id, description }, `/seller/creategig?tab=${3}`)
        } else {
            alert("Kindly complete all steps properly")
            window.location = "/seller/creategig?tab=1"
        }

    }
    //   Tab 3 submit
    const handletab3submit = (e) => {
        e.preventDefault()
        const gig_id = searchParams.get("id");
        if (gig_id) {
            publishgig(gig_id, selectedImage, selectedImage2, selectedImage3, selectedvideo)
        } else {
            alert("Kindly complete all steps properly!")
            window.location = "/seller/creategig?tab=1"
        }

    }
    return (
        <div>
            <h2 className='text-center my-4'>Create a Gig</h2>
            <div className="gig-progress container">
                <div className={tab === '1' || tab === null ? "active" : "active"}>
                    <span>1</span>
                </div>
                <img src="../next.svg" alt="" />
                <div className={tab === "2" || tab === "3" ? "active" : ""}>
                    <span>2</span>
                </div>
                <img src="../next.svg" alt="" />

                <div className={tab === "3" ? "active" : ""}>
                    <span>3</span>
                </div>
            </div>

            {
                tab === '1' || tab === null ?

                    <div className="container create-gig-1">
                        {
                            gigloading ? <Loading /> :
                                <Form onSubmit={handletab1submit} className='create-gig-1-form'>
                                    <Form.Group controlId="gigTitle">
                                        <Form.Label>Gig Title</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Enter gig title"
                                            maxLength={80}
                                            style={{ resize: 'none', padding: "8px" }}
                                            className="input-field"
                                            value={title}
                                            onChange={(e) => settitle(e.target.value)}
                                            required
                                        />
                                        <Form.Text className="text-muted">
                                            80 character max
                                        </Form.Text>

                                    </Form.Group>

                                    <div className="row create-gig-cat">
                                        <div className="col-md-6 ">
                                            <Form.Group controlId="category">
                                                <Form.Label>Category</Form.Label>
                                                <Form.Control as="select" value={category} onChange={handleCategoryChange} required>

                                                    <option value="">Select a category</option>
                                                    {categoryNames.map((cat) => (
                                                        <option key={cat} value={cat}>
                                                            {cat}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-6 ">
                                            <Form.Group controlId="subcategory">
                                                <Form.Label>Subcategory</Form.Label>
                                                <Form.Control as="select" value={subcategory} onChange={(e) => setsubcategory(e.target.value)} required>
                                                    <option value="">Select a Subcategory</option>
                                                    {allsubcategories.map((cat) => (
                                                        <option key={cat} value={cat}>
                                                            {cat}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </div>
                                    </div>

                                    <Form.Group controlId="positiveTags">
                                        <Form.Label>Positive Tags</Form.Label>
                                        <div className="tags-container">
                                            {tags && tags.map((tag, index) => (
                                                <div key={index} className="tag">
                                                    {tag}
                                                    <button type='button' className="remove-tag" onClick={(e) => {
                                                        e.preventDefault();
                                                        handleTagRemove(tag)
                                                    }}>
                                                        &times;
                                                    </button>
                                                </div>
                                            ))}
                                            <input
                                                type="text"
                                                placeholder="Enter Positive tags"
                                                maxLength={20}
                                                style={{ border: "none", outline: "none" }}
                                                className="input-field"
                                                value={tagInput}
                                                onChange={(e) => setTagInput(e.target.value)}
                                                onKeyDown={handleTagInputKeyDown}
                                            />
                                        </div>
                                        <Form.Text className="text-muted">
                                            Enter search terms you feel your buyers will use when looking for your service.
                                            <br />5 tags are max
                                        </Form.Text>
                                    </Form.Group>

                                    <div className="row create-gig-cat">
                                        <div className="col-md-6 ">
                                            <Form.Group controlId="category">
                                                <Form.Label>Days</Form.Label>
                                                <Form.Control style={{maxHeight:"4rem",overflow:"auto"}}  as="select" value={deliverytime} onChange={(e) => setdeliverytime(e.target.value)} required>

                                                    <option value="">Select Delivery time</option>
                                                    {deliverydays.map((cat) => (
                                                        <option key={cat} value={cat}>
                                                            {cat}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-6 ">
                                            <Form.Group controlId="price">
                                                <Form.Label>Price $</Form.Label>
                                                <Form.Control value={price} onChange={(e) => setprice(e.target.value)}
                                                    type="Number" placeholder="Enter price in CAD" required />
                                            </Form.Group>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <button className='button1 my-4' style={{ color: "white", float: "right" }} type="submit">Next</button>
                                    </div>
                                </Form>

                        }
                    </div>
                    : ""
            }
            {
                tab === '2' ? <div className='container create-gig-1'>
                    {
                        gigloading ? <Loading /> :
                            <Form onSubmit={handletab2submit} className='create-gig-1-form'>
                                <Form.Group controlId="gigdesc">
                                    <Form.Label>Gig Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Enter gig title"
                                        maxLength={1200}
                                        style={{ resize: 'none', padding: "8px" }}
                                        className="input-field gigdesc"
                                        value={description}
                                        onChange={(e) => setdescription(e.target.value)}
                                        required

                                    />
                                    <Form.Text className="text-muted">
                                        1200 character max
                                    </Form.Text>

                                </Form.Group>
                                <div className="text-center my-3">
                                    <div className='button1 mx-3' onClick={() => {
                                        const newTab = parseInt(tab) - 1;
                                        const url = new URL(window.location.href);
                                        const searchParams = new URLSearchParams(url.search);
                                        searchParams.set("tab", newTab);
                                        url.search = searchParams.toString();

                                        window.location.href = url.toString();
                                    }} style={{ color: "black", display: "inline", background: "white", border: "1px solid black" }} type="button">Back</div>
                                    <button className='button1' style={{ color: "white", display: "inline" }} type="submit">Next</button>
                                </div>
                            </Form>}
                </div> : ""
            }
            {
                tab === '3' ?
                    <div className="container create-gig-3 my-3">
                        {
                            gigloading ? <Loading /> : <>
                                <h2>Images</h2>
                                <div className="create-gig-images">
                                    <div className='image-container'>
                                        {selectedImage ? (
                                            <>
                                                <img src={selectedImage} style={{ overflow: 'hidden', width: "auto", height: "auto", maxWidth: "300px", maxHeight: "180px" }} alt="Selected Image" />
                                                <button className="cross-button" onClick={() => setSelectedImage(null)}>
                                                    <span>&times;</span>
                                                </button></>
                                        ) : (
                                            <img className='cursor-pointer' onClick={handleUploadButtonClick} src="../img.svg" alt="Default Image" />
                                        )}

                                        {selectedImage ? '' : <span className="text-center mt-2 cursor-pointer" onClick={handleUploadButtonClick}> Select an Image </span>}

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

                                    <div className='image-container'>
                                        {selectedImage2 ? (
                                            <>   <img src={selectedImage2} style={{ overflow: 'hidden', width: "auto", height: "auto", maxWidth: "300px", maxHeight: "180px" }} alt="Selected Image" /><button className="cross-button" onClick={() => setselectedImage2(null)}>
                                                <span>&times;</span>
                                            </button></>
                                        ) : (
                                            <img className='cursor-pointer' onClick={handleUploadButtonClick2} src="../img.svg" alt="Default Image" />
                                        )}

                                        {selectedImage2 ? '' : <span className="text-center mt-2 cursor-pointer" onClick={handleUploadButtonClick2}> Select an Image </span>}

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

                                    <div className='image-container'>
                                        {selectedImage3 ? (
                                            <>
                                                <img src={selectedImage3} style={{ overflow: 'hidden', width: "auto", height: "auto", maxWidth: "300px", maxHeight: "180px" }} alt="Selected Image" />
                                                <button className="cross-button" onClick={() => setselectedImage3(null)}>
                                                    <span>&times;</span>
                                                </button></>
                                        ) : (
                                            <img className='cursor-pointer' onClick={handleUploadButtonClick3} src="../img.svg" alt="Default Image" />
                                        )}

                                        {selectedImage3 ? '' : <span className="text-center mt-2 cursor-pointer" onClick={handleUploadButtonClick3}> Select an Image </span>}

                                    </div>
                                    <div style={{ display: 'none' }} className="mt-3">
                                        <label htmlFor="imageUpload" className="btn btn-primary">
                                            Upload Image
                                        </label>
                                        <input
                                            type="file"
                                            id="imageUpload"
                                            ref={fileInputRef3}
                                            onChange={handleImageSelect3}
                                            accept="image/jpeg, image/png"
                                        />
                                    </div>
                                    <ImageUploadButton onClick={handleUploadButtonClick3} />
                                </div>
                                <h2 className='my-5'>Video</h2>
                                <div className='create-gig-images mt-3'>

                                    <div className='image-container'>
                                        {selectedvideo ? (
                                            <>
                                                <video src={selectedvideo} style={{ overflow: 'hidden', width: "auto", height: "auto", maxWidth: "300px", maxHeight: "180px" }} alt="Selected Image" controls />
                                                <button className="cross-button" onClick={() => setselectedvideo(null)}>
                                                    <span>&times;</span>
                                                </button></>
                                        ) : (
                                            <img className='cursor-pointer' onClick={handleUploadButtonClick4} src="../img.svg" alt="Default Image" />
                                        )}

                                        {selectedvideo ? '' : <span className="text-center mt-2 cursor-pointer" onClick={handleUploadButtonClick4}> Select a Video max size 5px </span>}

                                    </div>
                                    <div style={{ display: 'none' }} className="mt-3">
                                        <label htmlFor="imageUpload" className="btn btn-primary">
                                            Upload Image
                                        </label>
                                        <input
                                            type="file"
                                            id="imageUpload"
                                            ref={fileInputRef4}
                                            onChange={handlevideoSelect}
                                            accept="video/*"
                                        />
                                    </div>
                                    <ImageUploadButton onClick={handleUploadButtonClick4} />
                                </div>
                                <div className="text-center my-3">
                                    <div className='button1 mx-3' onClick={() => {
                                        const newTab = parseInt(tab) - 1;
                                        const url = new URL(window.location.href);
                                        const searchParams = new URLSearchParams(url.search);
                                        searchParams.set("tab", newTab);
                                        url.search = searchParams.toString();

                                        window.location.href = url.toString();

                                    }} style={{ color: "black", display: "inline", background: "white", border: "1px solid black" }} type="button">Back</div>
                                    <div className='button1' onClick={handletab3submit} style={{ color: "white", display: "inline" }} type="button">Publish Gig</div>
                                </div>

                            </>}
                    </div>
                    : ""
            }
        </div >
    )
}

export default page