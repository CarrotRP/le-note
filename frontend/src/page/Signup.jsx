import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './AuthPage.css'

function Signup() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPw, setConfirmPw] = useState('');

    const navigate = useNavigate();

    const handleSignup = () => {
        const user = { username, password, confirmPw };

        //TODO: implement a pop up message
        if (password != confirmPw) {
            console.log('pw not match');
        } else {
            fetch('http://localhost:3000/user/signup', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => navigate(data.redirect));
        }
    }
    return (
        <main className="logup-page">
            <div className="signup container">
                <h1>Le-Note</h1>
                <div className=" input">
                    <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} value={username} />
                    <input type="text" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
                    <input type="text" placeholder="Confirm Password" onChange={e => setConfirmPw(e.target.value)} value={confirmPw} />
                    <NavLink to="/login">Have an account?</NavLink>
                </div>
                <button onClick={handleSignup}>Sign up</button>
            </div>
        </main>
    );
}

export default Signup;