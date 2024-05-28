/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';


function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg ">
            <a class="navbar-brand" href="#">STUDENT COLLABORATIVE APP</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="/registeruser">Register<span class="sr-only"></span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/loginuser">Login</a>
                    </li>
                     
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;