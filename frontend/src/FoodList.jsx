import React, { useState, useEffect } from 'react';
import './FoodList.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function FoodList() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');   // ★検索ボックスは1つ
  const [category, setCategory] = useState('');

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3000/api/v1/foods', {
        // ★qで name/description をまとめて検索、categoryは絞り込み
        params: { q: keyword, category: category }
      });
      setFoods(res.data);
    } catch (err) {
      console.error("エラーが発生しました", err);
    } finally {
      setLoading(false);
    }
  };

  // 初回読み込み
  useEffect(() => {
    fetchFoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ★カテゴリが変わったら自動で検索（クリック即反映）
  useEffect(() => {
    fetchFoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // 検索ボタン押下
  const handleSearch = (e) => {
    e.preventDefault();
    fetchFoods();
  };

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

            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                className="search-input"
                placeholder="検索キーワードを入力(例: ハンバーガー / チーズ)"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button type="submit" className="search-btn">検索</button>
            </form>

            <div className="category-nav">
              <span className="cat-label">カテゴリ：</span>
              <div className="cat-buttons">
                <button
                  type="button"
                  className={`cat-btn ${category === '' ? 'active' : ''}`}
                  onClick={() => setCategory('')}
                >
                  すべて
                </button>

                {['セット', 'メイン', 'サイドメニュー', 'ドリンク', 'デザート'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`cat-btn ${category === c ? 'active' : ''}`}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))}
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
                {foods.length > 0 ? (
                  foods.map((food) => (
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
                  ))
                ) : (
                  <p>該当するメニューが見つかりませんでした。</p>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default FoodList;
