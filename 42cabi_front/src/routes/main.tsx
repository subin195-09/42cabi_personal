// ./src/routes/main.tsx

import * as React from 'react';
import axios from 'axios';
import './main.css';

const url = 'http://localhost:4000/auth/login';
const hello_url = 'http://localhost:4000/hello';

const handleClick = () => {
	axios.post(hello_url, {
        data: "42cabi_param"
    }).then((res) => console.log(res.data)).catch((err)=>console.log(err));
}

const Main = () => {
	return (
        <div className="container">
            <div className="row p-5" id='logo'>
                <img src="../img/logo.png" alt="logo" />
            </div>
            <div className="row d-grid gap-2 col-6 mx-auto">
                <a className="btn btn-lg" id="loginBtn" href={url}>L O G I N</a>
                <div className="btn btn-lg" id="loginBtn" onClick={handleClick}>
                    H E L L O
                </div>
            </div>
        </div>
    );
}

export default Main;
