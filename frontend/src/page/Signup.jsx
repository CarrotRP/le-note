import { NavLink } from 'react-router-dom';
import './AuthPage.css'

function Signup(){
    return(
        <main className="logup-page">
            <div className="signup container">
                <h1>Le-Note</h1>
                <div className=" input">
                    <input type="text" placeholder="Username" />
                    <input type="text" placeholder="Password" />
                    <input type="text" placeholder="Confirm Password" />
                    <NavLink to="/login">Have an account?</NavLink>
                </div>
                <button>Sign up</button>
            </div>
        </main>
    );
}

export default Signup;