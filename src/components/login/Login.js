import React, { useState } from 'react'
import './login.css';
import logo from "./../../assets/logo.jpg";
import * as bootstrap from 'bootstrap';
import ForgotPass from './forgotpass/ForgotPass';

const Login = () => {
    const token01 = localStorage.getItem('Token01')
    const [data, setData] = useState({
        username: '',
        password: ''
    });

    const loginUser = (e)=>{
        e.preventDefault();
        const spinner = document.querySelector("#login-spinner")

        if ( data.username != '' && data.password != '') {
            spinner.classList.remove('d-none')

            fetch(process.env.REACT_APP_SERVER_URL + '/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then(res => res.json())
                .then(data01 => {


                    if (data01.token) {
                        localStorage.setItem('Token01', data01.token);
                        localStorage.setItem('user', data.username);

                        window.location.pathname = '/'

                    } else {
                        const toastLiveExample = document.getElementById('liveToast-login')
                        const toast = new bootstrap.Toast(toastLiveExample)
                        document.querySelector('#liveToast-login .toast-body').innerHTML = data.error
                        toast.show()
                    }
                    spinner.classList.add('d-none')

                })
                .catch(err => {
                    const toastLiveExample = document.getElementById('liveToast-login')
                    const toast = new bootstrap.Toast(toastLiveExample)
                    document.querySelector('#liveToast-login .toast-body').innerHTML = err
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

                <form onSubmit={(e) => loginUser(e)}>
                    <img class="mb-4" src={logo} alt="" width="72" height="57" />
                    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput" placeholder="abc0021" onChange={(e) => {
                            setData({
                                username:e.target.value,
                                password: data.password
                            })
                        }} value={data.username} required />
                        <label for="floatingInput">Username</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => {
                            setData({
                                username: data.username,
                                password: e.target.value
                            })
                        }} value={data.password} required />
                        <label for="floatingPassword">Password</label>
                    </div>


                    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in
                        <div id='login-spinner' class="d-none spinner-border spinner-border-sm ms-2"></div>
                    </button>
                    <div role='button' className='text-center mt-3 text-decoration-underline' data-bs-toggle="modal" data-bs-target="#forgotPass">
                        Forgot Password
                    </div>

                </form>
            </div>
                    <ForgotPass />
            <div class="toast-container position-fixed bottom-0 p-3">

                <div id="liveToast-login" class="toast align-items-center bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
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

export default Login;
