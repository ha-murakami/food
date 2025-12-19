import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Admin_FoodList from "./admin_FoodList";
import Admin_FoodEdit from "./admin_FoodEdit";
import Login from "./Login";
import FoodList from "./FoodList";
// ⬇️ 新規作成する詳細画面をインポート
import FoodDetail from "./FoodDetail";

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
        {/* --- 公開ルート --- */}
        <Route path="/" element={<FoodList />} />
        
        {/* ⬇️ 詳細画面のルートを追加 (idパラメータを受け取る) */}
        <Route path="/food/:id" element={<FoodDetail />} />
        
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
        {/* 新規作成と編集で同じコンポーネントを使う想定 (idがない場合は新規) */}
        <Route 
          path="/admin_FoodEdit" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Admin_FoodEdit />
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

        {/* --- フォールバック --- */}
        <Route 
          path="*" 
          element={
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