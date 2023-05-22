import axios from 'axios';
import React, { useEffect, useState } from 'react'
import * as bootstrap from 'bootstrap';

const UpdatedPost = (props) => {
    const token01 = localStorage.getItem('Token01');
    const user = localStorage.getItem('user')

    const data = props.updatePostData;
    const [fileSelected, setFileSelected] = useState('');
    const [content, setContent] = useState('');
    useEffect(() => {
        setContent(data.title)
    }, [data])



    const updatePost = async (e) => {
        e.preventDefault();

        const spinner = document.querySelector('#updatePost-spinner')
        spinner.classList.remove('d-none')
        if (fileSelected != '' || content!=data.title) {

            
            const formData = new FormData();
            formData.append("file", (fileSelected=='')?data.imgURL:fileSelected);
            formData.append("upload_preset", "ne5lxezf")
            await axios.post("https://api.cloudinary.com/v1_1/dt55mivpf/image/upload", formData)
                .then((res) => {
                    console.log(res.data.url);
                    fetch(process.env.REACT_APP_SERVER_URL + '/post/crud/update', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token01
                        },
                        body: JSON.stringify({ username: user, data: { _id:data._id, imgURL: res.data.url, title: content } }),
                    }).then(res => res.json())
                        .then(data01 => {
                            spinner.classList.add('d-none')
                            console.log(data01);
                            props.setSeed(Math.random());
                            var myModal = bootstrap.Modal.getOrCreateInstance('#updatepost')
                            myModal.hide();

                        }).catch(err => {
                            spinner.classList.add('d-none')
                        })
                })
                .catch((error) => {
                    console.log(error);
                    spinner.classList.add('d-none')

                });
        } else {
            const toastLiveExample = document.getElementById('liveToast-update')
                    const toast = new bootstrap.Toast(toastLiveExample)
                    document.querySelector('#liveToast-update .toast-body').innerHTML = 'Please Update something...'
                    toast.show()
                    spinner.classList.add('d-none')


        }
    }
    return (
        <div>
            <div class="modal fade" id="updatepost" tabindex="-1" aria-labelledby="updatePostLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="updatePostLabel">Update Post</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={(e) => updatePost(e)}>
                            <div class="modal-body" style={{ maxHeight: '600px', overflow: 'auto' }}>

                                <div>
                                    <img src={fileSelected == '' ? data.imgURL : URL.createObjectURL(fileSelected)} class="card-img-top rounded-0" alt="..." style={{ maxHeight: '400px' }} />
                                    <div id='img-warn' className='d-none text-danger'>
                                        Please select an image
                                    </div>
                                </div>
                                <div className='position-relative d-flex justify-content-center mt-3'>
                                    <span class="position-absolute btn btn-primary rounded-4 opacity-75">{fileSelected == "" ? "Choose image" : "Change image"}</span>

                                    <input id="choose-photo-compose" type="file" accept="image/jpeg, image/png, image/jpg, image/gif" class="form-control opacity-0" style={{ width: "130px" }} onChange={(e) => {
                                        const f = e.target.files[0];
                                        setFileSelected(f);
                                    }} />
                                </div>
                                <div class="form-floating my-3">
                                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }} onChange={(e) => {
                                        setContent(e.target.value)
                                    }} value={content} required></textarea>

                                    <label for="floatingInput">Write something ...</label>
                                </div>

                            </div>
                            <div class="modal-footer text-start p-3 ps-0">
                                <button type="submit" class="btn btn-primary rounded-4">Update Post
                                    <div id='updatePost-spinner' class="d-none spinner-border spinner-border-sm ms-2"></div>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="toast-container position-fixed bottom-0 p-3">

                <div id="liveToast-update" class="toast align-items-center bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body text-white">
                            Username or password is incorrect
                        </div>
                        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdatedPost
