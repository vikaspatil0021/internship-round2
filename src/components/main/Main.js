import React from 'react'
import logo from "./../../assets/logo.jpg";

const Main = () => {
    return (
        <div className='d-flex justify-content-center '>

        <div className='mt-5' style={{maxWidth:"800px"}}>
            <div className='row border-top border-bottom'>

                <div class="card col-12 " >
                    <img src={logo} class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
                <div class="card col-12">
                    <img src={logo} class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
            </div>

        </div>
    )
}

export default Main
