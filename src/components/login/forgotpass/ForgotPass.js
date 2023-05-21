import React, { useState } from 'react'
import * as bootstrap from 'bootstrap';

const ForgotPass = () => {
    const [status, setStatus] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [enteredOtp, setEnteredOtp] = useState('');
    const [password, setPassword] = useState('');


    const sendMailRquest = async (e) => {

        e.preventDefault();
        // e.stopPropagation();

        const spinner = document.querySelector("#forgotPass-spinner")

        if (email !== '') {
            spinner.classList.remove('d-none')
            const otpgen = Math.ceil(Math.random() * 100000 + 1)
            await fetch(process.env.REACT_APP_SERVER_URL + '/sendMail', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp: otpgen }),
            }).then(res => res.json())
                .then(data => {

                    const toastLiveExample = document.getElementById('liveToast-forgotPass')
                    const toast02 = new bootstrap.Toast(toastLiveExample)

                    if (data.EmailSent) {
                        toastLiveExample.classList.remove('bg-danger')
                        document.querySelector('#liveToast-forgotPass .toast-body').classList.remove('text-white')

                        document.querySelector('#liveToast-forgotPass .toast-body').innerHTML = "Check your email for OTP."
                        toast02.show()
                        setStatus("otpSent");
                        setOtp(otpgen)
                    } else {
                        document.querySelector('#liveToast-forgotPass .toast-body').innerHTML = data.error
                        toast02.show()
                    }
                    spinner.classList.add('d-none')

                })
                .catch(err => {
                    const toastLiveExample = document.getElementById('liveToast-forgotPass')
                    const toast = new bootstrap.Toast(toastLiveExample)
                    document.querySelector('.toast-body').innerHTML = err
                    toast.show()
                    spinner.classList.add('d-none')

                })
        }
    }

    const confirmOtp = async (e) => {
        e.preventDefault();

        const spinner = document.querySelector("#otp-spinner");
        spinner.classList.remove('d-none')

        if (parseInt(enteredOtp) === otp) {
            setTimeout(() => {

                setStatus('OTPconfirm')
                spinner.classList.add('d-none')

            }, 1000)
        } else {

            const toastLiveExample = document.getElementById('liveToast-forgotPass')
            const toast = new bootstrap.Toast(toastLiveExample);
            toastLiveExample.classList.add('bg-danger')
            document.querySelector('#liveToast-forgotPass .toast-body').classList.add('text-white')

            document.querySelector('.toast-body').innerHTML = "Invalid OTP";
            toast.show();
            spinner.classList.add('d-none')

        }
    }
    const setNewPassword = async (e) => {
        e.preventDefault();

        const spinner = document.querySelector("#fPassword-spinner");
        spinner.classList.remove('d-none')

        await fetch(process.env.REACT_APP_SERVER_URL + '/resetPassword', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        }).then(res => res.json())
            .then(data => {
                const toastLiveExample = document.getElementById('liveToast-forgotPass')
                const toast = new bootstrap.Toast(toastLiveExample);
                if (data == 'good') {
                    document.querySelector('.modal').classList.remove('show')


                    toastLiveExample.classList.remove('bg-danger')
                    document.querySelector('#liveToast-forgotPass .toast-body').classList.remove('text-white')
        
                    document.querySelector('.toast-body').innerHTML = "Password set successfully"
                    toast.show()
                    setTimeout(()=>{
                        window.location.reload()
                    }, 200)
                }else{
                    document.querySelector('.toast-body').innerHTML = data;
                    toast.show()
                }


                spinner.classList.add('d-none')

            })
            .catch(err => {
                const toastLiveExample = document.getElementById('liveToast-forgotPass')
                const toast = new bootstrap.Toast(toastLiveExample)
                document.querySelector('.toast-body').innerHTML = err
                toast.show()
                spinner.classList.add('d-none')

            })

    }

    return (
        <div class="modal fade" id="forgotPass" tabindex="-1" aria-labelledby="forgotPassLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="forgotPassLabel">Forgot Password</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{
                            setStatus(false);
                        }}></button>
                    </div>
                    <div class="modal-body">
                        {(status == false) ? <>
                            <form onSubmit={(e) => sendMailRquest(e)}>

                                <div class="form-floating mt-3">
                                    <input type="email" class="form-control" id="ForgotpassEmail" placeholder="email@gmail.com" onChange={(e) => {
                                        setEmail(e.target.value)
                                    }} value={email} required />
                                    <label for="floatingInput">Email</label>
                                </div>
                                <div className='text-start'>

                                    <button type="submit" class="btn btn-primary fw-semibold my-4">Send OTP
                                        <div id='forgotPass-spinner' class="d-none spinner-border spinner-border-sm ms-2"></div>
                                    </button>
                                </div>
                            </form>

                        </> : (status == "otpSent") ? <>
                            <form onSubmit={(e) => confirmOtp(e)}>

                                <div class="form-floating mt-3">
                                    <input type="number" class="form-control" id="otpInput" placeholder='otp' onChange={(e) => {
                                        setEnteredOtp(e.target.value)
                                    }} value={enteredOtp} required />
                                    <label for="floatingInput">OTP</label>
                                </div>
                                <div className='text-start'>

                                    <button type="submit" class="btn btn-primary fw-semibold my-4">Confirm OTP
                                        <div id='otp-spinner' class="d-none spinner-border spinner-border-sm ms-2"></div>
                                    </button>
                                </div>
                            </form>

                        </> : (status == "OTPconfirm") ? <>
                            <form onSubmit={(e) => setNewPassword(e)}>

                                <div class="form-floating mt-3">
                                    <input type="password" class="form-control" id="passprtInput" placeholder='password' onChange={(e) => {
                                        setPassword(e.target.value)
                                    }} value={password} required />
                                    <label for="floatingInput">New Password</label>
                                </div>

                                <div className='text-start'>

                                    <button type="submit" class="btn btn-primary fw-semibold my-4">Set Password
                                        <div id='fPassword-spinner' class="d-none spinner-border spinner-border-sm ms-2"></div>
                                    </button>
                                </div>
                            </form>

                        </> : null}
                    </div>

                </div>
            </div>
            <div class="toast-container position-fixed bottom-0 p-3">

                <div id="liveToast-forgotPass" class="toast align-items-center bg-dnger" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body text-white fw-semibold">
                            Username or password is incorrect
                        </div>
                        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" ></button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ForgotPass
