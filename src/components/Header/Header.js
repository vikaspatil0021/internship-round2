import React from 'react'
import logo from "./../../assets/logo.jpg"

const Header = () => {
    const token01 = localStorage.getItem('Token01')

    return (
        <div className=''>
            <div class="px-1 px-md-3 py-2 border-bottom fixed-top bg-white">
                <div class="container">
                    <div class="d-flex flex-wrap align-items-center justify-content-centr justify-content-between">
                        <a href="/" class="d-flex text-primary  fw-bold align-items-center my-2  my-lg-0 me-lg-auto text-decoration-none">
                            <img src={logo} alt="" width="72" height="57" />
                            BLUE BIRD
                        </a>

                        <ul class="nav col-auto fw-semibold my-2 justify-content-center my-md-0 text-small">
                            {(!token01)?<><li>
                                <a href="/login" class="nav-link text-dark px-2">
                                    Login
                                </a>
                            </li>

                            <li>
                                <a href="/register" class="nav-link text-dark px-2">
                                    Register
                                </a>
                            </li></>:
                            <>
                            <li>
                                <a href="#" class="btn btn-primary fw-semibold px-2 me-3">
                                <i class="bi bi-plus-circle px-2"></i>
                                 Post
                                </a>
                            </li>

                            <li>
                                <a href="#" class="btn  text-dark px-2" onClick={()=>{
                                    localStorage.removeItem('Token01');
                                    window.location.pathname = '/login'
                                }}>
                                    Logout
                                </a>
                            </li>
                            </>}

                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header
