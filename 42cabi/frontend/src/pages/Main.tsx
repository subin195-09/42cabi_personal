import './main.css'

export default function Main(){
    const dep_url = '/auth/login';
    
    return (
        <div className="container">
            <div className="row p-5" id='logo'>
                <img src="../img/logo.png" alt="logo" />
            </div>
            <div className="row d-grid gap-2 col-6 mx-auto">
	        <a className="btn btn-lg" id="loginBtn" href={dep_url}>L O G I N</a>
	    </div>
        </div>
    );
}
