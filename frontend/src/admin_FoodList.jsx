import React from 'react';
// <a> タグの代わりに Link をインポートします
import { Link } from 'react-router-dom'; 
import './admin_FoodList.css'; 

// props として { onLogout } を受け取ります
function AdminFoodList({ onLogout }) {
    
    // Editボタンを <Link> コンポーネントに置き換えるためのスタイル
    // (CSSの .edit-btn が button タグ専用の場合、Link にもスタイルを当てるため)
    const linkStyle = {
        textDecoration: 'none', // 下線を消す
        padding: '5px 10px', // .edit-btn に合わせたパディング（適宜調整してください）
        backgroundColor: '#f0ad4e', // .edit-btn に合わせた背景色（適宜調整してください）
        color: 'white', // .edit-btn に合わせた文字色（適宜調整してください）
        borderRadius: '3px' // .edit-btn に合わせた角丸（適宜調整してください）
    };

    return (
        <div>
            <h1>Food List</h1>

            {/* ログアウトボタンを追加 */}
            <button 
                onClick={onLogout} 
                style={{ 
                    backgroundColor: '#d9534f', // 赤色
                    color: 'white', 
                    padding: '10px 15px', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer', 
                    marginBottom: '20px' 
                }}
            >
                ログアウト
            </button>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Food Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Sushi</td>
                        <td>Japanese</td>
                        <td>¥1200</td>
                        <td className="actions">
                            {/* <button> を <Link> に変更。 id=1 に飛ぶ */}
                            <Link to="/admin_FoodEdit/1" className="edit-btn-link" style={linkStyle}>
                                Edit
                            </Link>
                            <button className="delete-btn">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Pizza</td>
                        <td>Italian</td>
                        <td>¥1500</td>
                        <td className="actions">
                            {/* <button> を <Link> に変更。 id=2 に飛ぶ */}
                            <Link to="/admin_FoodEdit/2" className="edit-btn-link" style={linkStyle}>
                                Edit
                            </Link>
                            <button className="delete-btn">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Burger</td>
                        <td>American</td>
                        <td>¥900</td>
                        <td className="actions">
                            {/* <button> を <Link> に変更。 id=3 に飛ぶ */}
                            <Link to="/admin_FoodEdit/3" className="edit-btn-link" style={linkStyle}>
                                Edit
                            </Link>
                            <button className="delete-btn">Delete</button>
                        </td>
                    </tr>
                    {/* ⬇️ 他の行も同様に <Link to={`/admin_FoodEdit/${id}`}>...</Link> 
                         の形に修正してください。
                    */}
                    <tr>
                        <td>4</td>
                        <td>Ramen</td>
                        <td>Japanese</td>
                        <td>¥850</td>
                        <td className="actions">
                            <Link to="/admin_FoodEdit/4" className="edit-btn-link" style={linkStyle}>Edit</Link>
                            <button className="delete-btn">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Paella</td>
                        <td>Spanish</td>
                        <td>¥1300</td>
                        <td className="actions">
                            <Link to="/admin_FoodEdit/5" className="edit-btn-link" style={linkStyle}>Edit</Link>
                            <button className="delete-btn">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Tacos</td>
                        <td>Mexican</td>
                        <td>¥780</td>
                        <td className="actions">
                            <Link to="/admin_FoodEdit/6" className="edit-btn-link" style={linkStyle}>Edit</Link>
                            <button className="delete-btn">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>Pad Thai</td>
                        <td>Thai</td>
                        <td>¥950</td>
                        <td className="actions">
                            <Link to="/admin_FoodEdit/7" className="edit-btn-link" style={linkStyle}>Edit</Link>
                            <button className="delete-btn">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>Kimchi</td>
                        <td>Korean</td>
                        <td>¥600</td>
                        <td className="actions">
                            <Link to="/admin_FoodEdit/8" className="edit-btn-link" style={linkStyle}>Edit</Link>
                            <button className="delete-btn">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>Curry</td>
                        <td>Indian</td>
                        <td>¥1100</td>
                        <td className="actions">
                            <Link to="/admin_FoodEdit/9" className="edit-btn-link" style={linkStyle}>Edit</Link>
                            <button className="delete-btn">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>Pho</td>
                        <td>Vietnamese</td>
                        <td>¥880</td>
                        <td className="actions">
                            <Link to="/admin_FoodEdit/10" className="edit-btn-link" style={linkStyle}>Edit</Link>
                            <button className="delete-btn">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default AdminFoodList;