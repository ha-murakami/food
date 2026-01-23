import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, Link } from "react-router-dom";
import './login.css';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // ログイン済み
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
        <div className="login-root">
            {/* 共通ヘッダー */}
            <header className="site-header">
                <div className="header-inner">
                    <Link to="/" className="logo-link">
                        <h1 className="logo">FOOD</h1>
                    </Link>
                </div>
            </header>

            <main className="login-main">
                <div className="container">
                    <div className="login-card">
                        <h2 className="login-title">管理者ログイン</h2>
                        
                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <label>e-Mailアドレス</label>
                                <input 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder="admin@example.com"
                                    type="text"
                                    className="login-input"
                                />
                            </div>

                            <div className="form-group">
                                <label>パスワード</label>
                                <input 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    placeholder="パスワードを入力" 
                                    type="password" 
                                    className="login-input"
                                />
                            </div>

                            <button type="submit" className="login-submit-btn">
                                ログイン
                            </button>
                        </form>

                        <div className="login-footer">
                            <Link to="/" className="back-home-link">
                                サイトトップへ戻る
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Login;