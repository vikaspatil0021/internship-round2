import React, { useEffect, useState } from 'react'
import UpdatedPost from '../updatePost/UpdatedPost';

const Main = () => {
    const token01 = localStorage.getItem('Token01');
    const user = localStorage.getItem('user')
    const [posts, setPost] = useState([]);
    const [seed,setSeed] = useState(0);
    const [updatePostData,setUData] = useState({});
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

    const likesUpdate = async(likes,id,index)=>{
        const element = document.getElementById("like-dislike-" + index);
        if (element.classList.contains("bi-heart-fill")) {
            element.classList.replace("bi-heart-fill", "bi-heart");
            if (likes.length != 0) {
                var likes = likes.filter((ele)=> {
                    return ele != user;
                })
            }
        } else {
            element.classList.replace("bi-heart", "bi-heart-fill");
            if (!(likes.includes(user))) {
                likes.push(user);
            }

        }
        console.log(likes);
        await fetch(process.env.REACT_APP_SERVER_URL + '/updateLikes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token01
            },
            body: JSON.stringify({ data: {_id:id,likes:likes}}),
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

                    {posts.map((each,index) => {
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
                                        <div className='ps-2'>
                                            <i role='button' id={'like-dislike-' + index} class={(each.likes.includes(user))?"bi bi-heart-fill text-danger fs-4 pe-1":"bi bi-heart text-danger fs-4 pe-1"} onClick={()=>{
                                                likesUpdate(each.likes,each._id,index);
                                            }}></i>
                                            <span className='fs-4 pe-3 '> {each.likes.length}</span>
                                        </div>
                                        <div role='button' className='pb-1 ps-1'>
                                            <i class="bi bi-chat-dots fs-4 pe-1"></i>
                                            <span className='fs-4 pe-3 '> {each.comment.length}</span>

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
