import React, { useEffect, useState } from 'react'
import logo from "./../../assets/logo.jpg"
import * as bootstrap from 'bootstrap';

const Register = () => {
    const token01 = localStorage.getItem('Token01')

    const [data, setData] = useState({
        email: '',
        username: '',
        password: ''
    });

    const registerUser = (e) => {
        e.preventDefault();

        const spinner = document.querySelector("#register-spinner")

        if (data.email !== '' && data.username != '' && data.password != '') {
            spinner.classList.remove('d-none')

            fetch(process.env.REACT_APP_SERVER_URL + '/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then(res => res.json())
                .then(data => {


                    if (data.token) {
                        localStorage.setItem('Token01', data.token);
                        window.location.pathname = '/'

                    } else {
                        const toastLiveExample = document.getElementById('liveToast-register')
                        const toast = new bootstrap.Toast(toastLiveExample)
                        document.querySelector('.toast-body').innerHTML = data.error
                        toast.show()
                    }
                    spinner.classList.add('d-none')

                })
                .catch(err => {
                    const toastLiveExample = document.getElementById('liveToast-register')
                    const toast = new bootstrap.Toast(toastLiveExample)
                    document.querySelector('.toast-body').innerHTML = err
                    toast.show()
                    spinner.classList.add('d-none')

                })

        }
    }
    if(token01){
        window.location.pathname = '/'

    }else{
    return (
        <div className='d-flex justify-content-center align-items-center h-100 my-5'>
            <div className='form-signin w-100 m-auto'>

                <form onSubmit={(e) => registerUser(e)}>
                    <img class="mb-4" src={logo} alt="" width="72" height="57" />
                    <h1 class="h3 mb-3 fw-normal">Please register</h1>
                    <div class="form-floating mt-3">
                        <input type="email" class="form-control" id="registerEmail" placeholder="email@gmail.com" onChange={(e) => {
                            setData({
                                email: e.target.value,
                                username: data.username,
                                password: data.password
                            })
                        }} value={data.email} required />
                        <label for="floatingInput">Email</label>
                    </div>
        
                    <div class="form-floating mt-3">
                        <input type="text" class="form-control" id="registerUsername" placeholder="abc0021" onChange={(e) => {
                            setData({
                                email: data.email,
                                username: e.target.value,
                                password: data.password
                            })
                        }} value={data.username} required />
                        <label for="floatingInput">Username</label>
                    </div>
        
                    <div class="form-floating mt-3">
                        <input type="password" class="form-control" id="registerPassword" placeholder="Password" onChange={(e) => {
                            setData({
                                email: data.email,
                                username: data.username,
                                password: e.target.value
                            })
                        }} value={data.password} required />
                        <label for="floatingPassword">Password</label>
                    </div>
                  

                    <button class="w-100 btn btn-lg btn-primary mt-3" type="submit">Register
                        <div id='register-spinner' class="d-none spinner-border spinner-border-sm ms-2"></div>
                    </button>

                </form>
            </div>

            <div class="toast-container position-fixed bottom-0 p-3">

                <div id="liveToast-register" class="toast align-items-center bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
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
}

export default Register
