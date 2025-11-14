import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Admin_FoodList from "./admin_FoodList";
import Admin_FoodEdit from "./admin_FoodEdit";
import Login from "./Login";

// ⬇️ 1. FoodListのインポートを有効にします
import FoodList from "./FoodList";
// import FoodDetail from "./FoodDetail";

// (ProtectedRoute コンポーネント ... 変更なし)
function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <Router>
      <Routes>
        {/* --- 公開ルート (誰でも見られる) --- */}
        
        {/* ⬇️ 2. ホームページ('/')にFoodListコンポーネントを割り当てます */}
        <Route path="/" element={<FoodList />} />
        
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* --- 認証が必要なルート (Admin) --- */}
        <Route 
          path="/admin_FoodList" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Admin_FoodList onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin_FoodEdit/:id" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Admin_FoodEdit />
            </ProtectedRoute>
          } 
        />

        {/* --- フォールバック（どのルートにも一致しない場合）--- */}
        <Route 
          path="*" 
          element={
            // ⬇️ 3. 未認証の場合はホームページ('/')にリダイレクトするよう変更
            isAuthenticated 
              ? <Navigate to="/admin_FoodList" /> 
              : <Navigate to="/" />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;