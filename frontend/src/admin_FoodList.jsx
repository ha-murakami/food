import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import './admin_FoodList.css'; 

function AdminFoodList({ onLogout }) {
    const [foods, setFoods] = useState([]);

    // 削除処理
    const handleDelete = async (id) => {
        if(!window.confirm("本当に削除しますか？")) return;
        
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/api/v1/foods/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFoods(foods.filter(food => food.id !== id));
        } catch (err) {
            alert("削除に失敗しました");
            console.error(err);
        }
    };

    // 一覧取得
    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/v1/foods');
                setFoods(res.data);
            } catch (err) {
                console.error("データ取得エラー", err);
            }
        };
        fetchFoods();
    }, []);

    return (
        <div className="admin-list-root">
            {/* 共通ヘッダー */}
            <header className="site-header">
                <div className="header-inner">
                    <Link to="/" className="logo-link">
                        <h1 className="logo">FOOD <span className="admin-badge">Admin</span></h1>
                    </Link>
                    {/* ヘッダー右側にログアウトボタンを配置 */}
                    <button onClick={onLogout} className="logout-header-btn">
                        ログアウト
                    </button>
                </div>
            </header>

            <main className="admin-main">
                <div className="container">
                    <div className="admin-controls">
                        <h2 className="page-title">メニュー管理一覧</h2>
                        <Link to="/admin_FoodEdit" className="add-btn">
                            + 新規メニュー作成
                        </Link>
                    </div>

                    <div className="table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th className="th-id">ID</th>
                                    <th className="th-img">画像</th>
                                    <th className="th-name">メニュー名</th>
                                    <th className="th-cat">カテゴリ</th>
                                    <th className="th-price">価格</th>
                                    <th className="th-action">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foods.map((food) => (
                                    <tr key={food.id}>
                                        <td className="td-id">{food.id}</td>
                                        <td className="td-img">
                                            {food.image && (
                                                <img 
                                                    src={`http://localhost:3000/uploads/${food.image}`} 
                                                    alt={food.name} 
                                                    className="thumb-img"
                                                />
                                            )}
                                        </td>
                                        <td className="td-name">{food.name}</td>
                                        <td className="td-cat">
                                            <span className="cat-badge">{food.category}</span>
                                        </td>
                                        <td className="td-price">¥{Number(food.price).toLocaleString()}</td>
                                        <td className="td-action">
                                            <div className="action-buttons">
                                                <Link to={`/admin_FoodEdit/${food.id}`} className="btn-edit">
                                                    編集
                                                </Link>
                                                <button 
                                                    className="btn-delete" 
                                                    onClick={() => handleDelete(food.id)}
                                                >
                                                    削除
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminFoodList;