import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './admin_FoodEdit.css';

function AdminFoodEdit({ onLogout }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    // フォームの状態管理
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    // 初期値を日本語の「メイン」に変更
    const [category, setCategory] = useState('メイン'); 
    
    const [imageFile, setImageFile] = useState(null);

    // 編集モードの場合、既存データを取得
    useEffect(() => {
        if (isEditMode) {
            axios.get(`http://localhost:3000/api/v1/foods/${id}`)
                .then(res => {
                    const data = res.data;
                    
                    setName(data.name || '');
                    setDescription(data.description || '');
                    setPrice(data.price || '');
                    // データがない場合のデフォルトも「メイン」に変更
                    setCategory(data.category || 'メイン');
                })
                .catch(err => console.error("データ取得エラー", err));
        }
    }, [id, isEditMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('food[name]', name);
        formData.append('food[description]', description);
        formData.append('food[price]', price);
        formData.append('food[category]', category);

        if (imageFile) {
            formData.append('food[image]', imageFile);
        }

        const token = localStorage.getItem('token');
        const config = {
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        };

        try {
            if (isEditMode) {
                await axios.put(`http://localhost:3000/api/v1/foods/${id}`, formData, config);
            } else {
                await axios.post('http://localhost:3000/api/v1/foods', formData, config);
            }
            alert('保存しました');
            navigate('/admin_FoodList');
        } catch (err) {
            console.error(err);
            alert('保存に失敗しました');
        }
    };

    return (
        <div className="admin-edit-root">
            {/* 共通ヘッダー */}
            <header className="site-header">
                <div className="header-inner">
                    <Link to="/" className="logo-link">
                        <h1 className="logo">FOOD <span className="admin-badge">Admin</span></h1>
                    </Link>
                    {onLogout && (
                        <button onClick={onLogout} className="logout-header-btn">
                            ログアウト
                        </button>
                    )}
                </div>
            </header>

            <main className="edit-main">
                <div className="container">
                    <div className="edit-card">
                        <div className="card-header">
                            <h2 className="edit-title">{isEditMode ? 'メニュー編集' : '新規メニュー登録'}</h2>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="edit-form">
                            <div className="form-group">
                                <label className="form-label">商品名</label>
                                <input 
                                    type="text" 
                                    className="edit-input" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    required 
                                    placeholder="例: ハンバーガー"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">説明文</label>
                                <textarea 
                                    className="edit-textarea" 
                                    rows="4" 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="商品の説明を入力してください"
                                ></textarea>
                            </div>

                            <div className="form-row">
                                <div className="form-group half">
                                    <label className="form-label">価格 (¥)</label>
                                    <input 
                                        type="number" 
                                        className="edit-input" 
                                        value={price} 
                                        onChange={(e) => setPrice(e.target.value)} 
                                        required 
                                        placeholder="1000"
                                    />
                                </div>

                                <div className="form-group half">
                                    <label className="form-label">カテゴリ</label>
                                    <select 
                                        className="edit-select" 
                                        value={category} 
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="セット">セット</option>
                                        <option value="メイン">メイン</option>
                                        <option value="サイドメニュー">サイドメニュー</option>
                                        <option value="ドリンク">ドリンク</option>
                                        <option value="デザート">デザート</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">商品画像</label>
                                <input 
                                    className="edit-file-input" 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files[0])} 
                                />
                                {isEditMode && !imageFile && (
                                    <p className="current-image-note">※変更しない場合は現在の画像が維持されます</p>
                                )}
                            </div>

                            <div className="button-group">
                                <Link to="/admin_FoodList" className="cancel-btn">キャンセル</Link>
                                <button type="submit" className="save-btn">保存する</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminFoodEdit;