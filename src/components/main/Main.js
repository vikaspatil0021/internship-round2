import React, { useEffect, useState } from 'react'
import UpdatedPost from '../updatePost/UpdatedPost';

const Main = () => {
    const token01 = localStorage.getItem('Token01');
    const user = localStorage.getItem('user')
    const [posts, setPost] = useState([]);
    const [seed,setSeed] = useState(0);
    const [updatePostData,setUData] = useState({})
    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_URL + '/posts')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPost(data.reverse())
            }).catch(err => {
                console.log(err);
            })
    }, [seed]);
    

    const deletePost = async(postData)=>{
       
        await fetch(process.env.REACT_APP_SERVER_URL + '/post/crud/delete', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token01
            },
            body: JSON.stringify({ data: postData}),
        }).then(res => res.json())
            .then(data01 => {
                console.log(data01);
                setSeed(Math.random())
            }).catch(err => {
                console.log(err);

            })
    }
    return (
        <div className='d-flex justify-content-center ' style={{ background: '#f5f5f5' }}>

            <div className='my-5' style={{ maxWidth: "450px" }}>
                <div className='d-flex flex-wrap'>

                    {posts.map((each) => {
                        return (
                            <div class="card border rounded-0 col-12 p-0 mb-3" >
                                <div class="card-header border-bottom d-flex justify-content-between bg-white">
                                    <div className='fw-semibold d-flex align-items-center'>
                                        {each.username}
                                    </div>
                                    <div class="dropdown">

                                    <div role='button' className='' data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="bi bi-three-dots fs-4"></i>
                                    </div>
                                        <ul class="dropdown-menu">
                                            <button class="dropdown-item" >View Comments</button>
                                            {(each.username===user)?<>

                                            <hr class="dropdown-divider m-1" />
                                            <button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#updatepost" onClick={()=>setUData(each)}>Update Post</button>
                                            <hr class="dropdown-divider m-1" />

                                            <button class="dropdown-item" onClick={()=>deletePost(each)}>Delete Post</button>
                                            </>:null}
                                        </ul>
                                        </div>
                                </div>
                                <img src={each.imgURL} class="card-img-top rounded-0 border-0" alt="..." />
                                <div class="card-body py-2">

                                    <p class="card-text text-start mb-1 ps-2">
                                        {each.title}
                                    </p>
                                    <div className='d-flex align-items-center '>
                                        <div role='button' className='ps-2'>
                                            <i class="bi bi-heart fs-4 pe-3"></i>
                                        </div>
                                        <div role='button' className='pb-1 ps-1'>
                                            <i class="bi bi-chat-dots fs-4 pe-3"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
                    <UpdatedPost updatePostData={updatePostData} setSeed={setSeed} />
        </div>
    )
}

export default Main
