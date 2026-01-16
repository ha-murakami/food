import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './FoodDetail.css';

function FoodDetail() {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/foods/${id}`);
        setFood(res.data);
      } catch (err) {
        console.error("データの取得に失敗しました", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, [id]);

  if (loading) return <div className="loading-msg">読み込み中...</div>;
  if (!food) return <div className="error-msg">商品が見つかりません</div>;

  return (
    <div className="food-detail-root">
      <header className="site-header">
        <div className="header-inner">
            <Link to="/" className="logo-link">
                <h1 className="logo">FOOD</h1>
            </Link>
            <Link to="/login" className="login-btn">管理者ログイン</Link>
        </div>
      </header>

      <main className="detail-main">
        <div className="container">
          <div className="menu-detail-card">
            
            <div className="menu-image-area">
              <img 
                src={food.image ? `http://localhost:3000/uploads/${food.image}` : "https://via.placeholder.com/500"} 
                alt={food.name} 
              />
            </div>

            <div className="menu-info-area">
              <span className="category-label">{food.category || 'Category'}</span>
              
              <h2 className="detail-title">{food.name}</h2>
              
              <div className="detail-price-row">
                <span className="detail-price">¥{Number(food.price).toLocaleString()}</span>
                {/* <span className="tax">
                    (税込 ¥{Math.floor(food.price * 1.1).toLocaleString()})
                </span> */}
              </div>

              <p className="full-description">
                {food.description}
              </p>
              
              <div className="action-area">
                <Link to="/" className="back-btn">
                   メニュー一覧に戻る
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default FoodDetail;