import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import './login.css';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    if (token) return <Navigate to="/admin_FoodList" />;

    const login = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/v1/login', {
                email,
                password,
            });
            const token = res.data.token;
            localStorage.setItem('token', token);
            onLogin(token);
            navigate('/admin_FoodList');
        } catch (err) {
            alert('ログインに失敗しました。メールアドレスまたはパスワードを確認してください。');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
    };

    return (
        <div className="pageAll">
            <h1>ログイン</h1>
            
            <form onSubmit={handleSubmit}>
                <h2>e-Mailアドレス：</h2>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="メール"
                    type="text"
                />

                <h2>パスワード：</h2>
                <input 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="パスワード" 
                    type="password" 
                />

                <div className="buttons">
                    <button type="submit">ログイン</button>
                </div>
            </form>
        </div>
    );
}

export default Login;