import React, { useState, useEffect } from 'react';
import './FoodList.css'; 
import { Link } from 'react-router-dom';
import axios from 'axios';

function FoodList() {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/v1/foods');
                setFoods(res.data);
            } catch (err) {
                console.error("エラーが発生しました", err);
            } finally {
                setLoading(false);
            }
        };
        fetchFoods();
    }, []);

    return (
        <div className="food-app-root">
            <header className="site-header">
                <div className="header-inner">
                    <h1 className="logo">FOOD</h1>
                    <Link to="/login" className="login-btn">管理者ログイン</Link>
                </div>
            </header>

            <main>
                <section className="search-area">
                    <div className="container">
                        <h2>メニューを探す</h2>
                        
                        <form action="" className="search-form">
                            <input type="text" className="search-input" placeholder="メニュー名を入力 (例: ハンバーガー)" />
                            <button type="submit" className="search-btn">検索</button>
                        </form>

                        <div className="category-nav">
                            <span className="cat-label">カテゴリ：</span>
                            <div className="cat-buttons">
                                <button type="button" className="cat-btn active">すべて</button>
                                <button type="button" className="cat-btn">セット</button>
                                <button type="button" className="cat-btn">メイン</button>
                                <button type="button" className="cat-btn">サイドメニュー</button>
                                <button type="button" className="cat-btn">ドリンク</button>
                                <button type="button" className="cat-btn">デザート</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="menu-area">
                    <div className="container">
                        <h2>メニュー一覧</h2>
                        
                        {loading ? (
                            <p className="loading-text">読み込み中...</p>
                        ) : (
                            <div className="menu-list">
                                {foods.map((food) => (
                                    <article className="menu-item" key={food.id}>
                                        <Link to={`/food/${food.id}`} className="menu-item-link">
                                            <div className="menu-img-frame">
                                                <img 
                                                    src={food.image ? `http://localhost:3000/uploads/${food.image}` : "img/placeholder.png"} 
                                                    alt={food.name} 
                                                />
                                            </div>
                                            <div className="menu-info">
                                                <h3>{food.name}</h3>
                                                <p className="desc">{food.description}</p>
                                                <div className="price-row">
                                                    <span className="price">¥{Number(food.price).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default FoodList;