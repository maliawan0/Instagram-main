import React, { useState, useContext } from "react";
import { GiButterfly } from "react-icons/gi";
import M from 'materialize-css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

const Login = () => {

    const { state, dispatch } = useContext(UserContext)
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const PostData = () => {
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    M.toast({ html: data.error, classes: "rounded N/A transparent" });
                }
                else if (data.user && data.user.username) {
                    // Ensure the user object and name property exist
                    localStorage.setItem("jwt", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    dispatch({ type: "USER", payload: data.user });
                    M.toast({ html: "Signed in", classes: "rounded N/A transparent" });
                    navigate('/');
                } else {
                    console.error("Invalid user data received from server:", data);
                    M.toast({ html: "Invalid user data", classes: "rounded N/A transparent" });
                }
            })
            .catch(err => {
                console.error("Error during login:", err);
                M.toast({ html: "Error during login", classes: "rounded N/A transparent" });
            });
    };



    return (
        <div className="signup-card">
            <div className="card2">
                <div className="authcard">
                    <h2 style={{ fontFamily: "Grand Hotel, cursive", color: "midnightblue", display: 'inline' }}>Instagram </h2>
                    <div style={{ color: 'midnightblue', display: 'inline-block' }}>
                        <GiButterfly size="40px" />
                    </div>

                    <div className="inputfields" style={{ marginTop: "30px" }}>
                        <input type="text" placeholder="username"
                            value={username} onChange={e => setUsername(e.target.value)} style={{ color: 'midnightblue',fontWeight: '600' }}
                        />

                        <input type="password" placeholder="password" value={password}
                            onChange={e => setPassword(e.target.value)} style={{ color: 'midnightblue',fontWeight: '600' }} />

                    </div>

                    <button className="btn" style={{ backgroundColor: "midnightblue", color: "white", marginTop: "35px" }}
                        type="submit" name="action" onClick={() => PostData()}>Login</button>
                </div>

            </div>
        </div>
    )
}

export default Login;
