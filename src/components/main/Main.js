import React, { useEffect, useState } from 'react'
import logo from "./../../assets/squarejpg.jpg";

const Main = () => {
    const [posts, setPost] = useState([]);
    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_URL + '/posts')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPost(data.reverse())
            }).catch(err => {
                console.log(err);
            })
    }, [])
    return (
        <div className='d-flex justify-content-center ' style={{ background: '#f5f5f5' }}>

            <div className='mt-5' style={{ maxWidth: "450px" }}>
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
                                            <li><a class="dropdown-item" href="#">View Comments</a></li>
                                            <li><hr class="dropdown-divider m-1" /></li>

                                            <li><a class="dropdown-item" href="#">Update Post</a></li>
                                            <li><hr class="dropdown-divider m-1" /></li>

                                            <li><a class="dropdown-item" href="#">Delete Post</a></li>
                                        </ul>
                                        </div>
                                </div>
                                <img src={each.imgURL} class="card-img-top rounded-0 border-0" alt="..." />
                                <div class="card-body">

                                    <p class="card-text text-start">
                                        {each.title}
                                    </p>
                                    <div className='d-flex align-items-center justify-content-between ps-2'>
                                        <div role='button' className=''>
                                            <i class="bi bi-heart fs-4 pe-3"></i>
                                        </div>
                                        <div role='button' className='pb-1'>
                                            <i class="bi bi-chat-dots fs-4 pe-3"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default Main
