import React, { useState } from "react";
import { GiButterfly } from "react-icons/gi";
import M from 'materialize-css'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const PostData = () => {
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                email
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "rounded N/A transparent" })
                }
                else {
                    M.toast({ html: data.message, classes: "rounded N/A transparent" })
                    navigate('/login');
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    return (
        <div className="signup-card">
            <div className="card2">
                <div className="authcard">

                    <h2 style={{ fontFamily: "Grand Hotel, cursive", color: "midnightblue", display: 'inline' }}>Instagram </h2>
                    <div style={{ color: 'midnightblue', display: 'inline-block' }}>
                        <GiButterfly size="40px" />
                    </div>

                    <div className="inputfields" style={{ marginTop: "30px" }}>
    <input type="text" placeholder="email"
        value={email} onChange={e => setEmail(e.target.value)} style={{ color: 'midnightblue', fontWeight: '600' }} />

    <input type="text" placeholder="username"
        value={username} onChange={e => setUsername(e.target.value)} style={{ color: 'midnightblue', fontWeight: '600' }}
    />

    <input type="password" placeholder="password"
        value={password} onChange={e => setPassword(e.target.value)} style={{ color: 'midnightblue', fontWeight: '600' }} />
</div>

                    <button className="btn" style={{ backgroundColor: "midnightblue", color: "white", marginTop: "35px" }}
                        type="submit" name="action" onClick={() => PostData()}>Sign up</button>
                </div>
            </div>
        </div>
    )
}

export default Signup;
