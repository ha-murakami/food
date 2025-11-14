import React from 'react';
import { Link } from 'react-router-dom'; // <a> タグの代わりに Link を使う
import './admin_FoodEdit.css'; // CSSをインポート

function AdminFoodEdit() {
    
    // Reactではフォームの送信をこのようにハンドルします
    const handleSubmit = (e) => {
        e.preventDefault(); // 伝統的なHTMLフォーム送信（ページリロード）を防ぐ
        // ここにAPI (axios) を使ったデータ更新処理を書く
        console.log("フォームが送信されました");
    };

    return (
        // <html>, <head>, <body> は不要
        <div className="container mt-5">
            <div className="form-container">
                <h2>Edit Food Item</h2>

                {/* action, method, enctype は削除し、
                  Reactの onSubmit イベントハンドラを使う 
                */}
                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-3">
                        {/* 'for' は 'htmlFor' に変更 */}
                        <label htmlFor="name" className="form-label">Food Name</label>
                        <input type="text" className="form-control" id="name" name="name" required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description" rows="3"></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price (₮)</label>
                        <input type="number" step="0.01" className="form-control" id="price" name="price" required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select className="form-select" id="category" name="category">
                            <option>Breakfast</option>
                            <option>Lunch</option>
                            <option>Dinner</option>
                            <option>Snacks</option>
                            <option>Desserts</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Upload Image</label>
                        <input className="form-control" type="file" id="image" name="image" />
                        
                        <div>
                            <label className="mt-2">Current Image:</label><br />
                            {/* src="" は後でReactのstateから動的に設定します */}
                            <img src="{null}" alt="Food Image" className="img-thumbnail" width="200" />
                        </div>
                    </div>

                    <div className="form-check mb-4">
                        <input className="form-check-input" type="checkbox" value="1" id="available" name="available" defaultChecked />
                        {/* 'checked' は 'defaultChecked' に変更 (非制御コンポーネントの場合)
                           もしReactのstateで管理するなら 'checked={...}' を使う
                        */}
                        <label className="form-check-label" htmlFor="available">
                            Available for order
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary">Save</button>
                    
                    {/* <a> タグは <Link> タグに置き換える */}
                    <Link to="/admin/food" className="btn btn-secondary ms-2">Cancel</Link>
                </form>
            </div>
        </div>
    );
}

export default AdminFoodEdit; // 他ファイルで import できるように export