import React from 'react';
import './FoodList.css'; 
import { Link } from 'react-router-dom'; // 1. Link をインポート

// (画像のインポートは変更なし)
import phoImg from './components/img/bi-quyet-nau-phi-bo-ngon-tuyet-dinh.webp';
import bunChaImg from './components/img/cach-lam-nuoc-mam-bun-cha-02.webp';
import banhMiImg from './components/img/images (4).jpg';
import goiCuonImg from './components/img/cach-lam-goi-tai-heo.webp';
import banhXeoImg from './components/img/images (5).jpg';
import caoLauImg from './components/img/1594-post-cach-uop-thit-chien-ngon-mem-tham-vi-tai-nha-2.webp';

function FoodList() {
    return (
        // 2. <> (フラグメント) で全体を囲みます
        <>
            {/* 3. ログインボタン用のヘッダーを追加 */}
            <header className="bg-white shadow-md p-4 sticky top-0 z-50">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <h1 className="text-xl font-bold brand-color">ベトナム料理店</h1>
                    {/* /login ページへのリンクボタン */}
                    <Link to="/login">
                        <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                            管理者ログイン
                        </button>
                    </Link>
                </div>
            </header>

            {/* 4. 既存の <main> タグはそのまま残します */}
            <main>
                <section id="menu" className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">メニュー</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            
                            {/* Dish Card 1: Phở */}
                            <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                                <img src={phoImg} alt="牛肉のフォー" className="w-full h-56 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold brand-color mb-2">牛肉のフォー</h3>
                                    <p className="text-gray-600">ベトナム料理の魂。骨から煮込んだ濃厚なスープ、柔らかい米麺、そして新鮮な牛肉が特徴です。</p>
                                    <p className="mt-4 text-xl font-bold text-gray-900">1100円</p>
                                </div>
                            </div>
                            
                            {/* Dish Card 2: Bún Chả */}
                            <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                                <img src={bunChaImg} alt="ブンチャー" className="w-full h-56 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold brand-color mb-2">ブンチャー</h3>
                                    <p className="text-gray-600">ハノイの名物。香ばしい炭火焼きの豚肉を、ビーフン、新鮮なハーブ、甘酸っぱいタレと一緒にお召し上がりください。</p>
                                    <p className="mt-4 text-xl font-bold text-gray-900">890円</p>
                                </div>
                            </div>
                            
                            {/* Dish Card 3: Bánh Mì */}
                            <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                                <img src={banhMiImg} alt="バインミー" className="w-full h-56 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold brand-color mb-2">バインミー</h3>
                                    <p className="text-gray-600">フランスとベトナムの食文化が完璧に融合した一品。サクサクのパンに、風味豊かな具材がたっぷり入っています。</p>
                                    <p className="mt-4 text-xl font-bold text-gray-900">750円</p>
                                </div>
                            </div>
                            
                            {/* Dish Card 4: Gỏi Cuốn */}
                            <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                                <img src={goiCuonImg} alt="ゴイクン" className="w-full h-56 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold brand-color mb-2">ゴイクン（生春巻き）</h3>
                                    <p className="text-gray-600">エビ、豚肉、ビーフン、新鮮なハーブをライスペーパーで巻いた爽やかな前菜。濃厚なタレにつけてどうぞ。</p>
                                    <p className="mt-4 text-xl font-bold text-gray-900">600円</p>
                                </div>
                            </div>
                            
                            {/* Dish Card 5: Bánh Xèo */}
                            <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                                <img src={banhXeoImg} alt="バインセオ" className="w-full h-56 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold brand-color mb-2">バインセオ</h3>
                                    <p className="text-gray-600">エビ、豚肉、もやしを詰めたサクサクのベトナム風クレープ。新鮮な野菜と特製の甘酸っぱいヌックマムソースで。</p>
                                    <p className="mt-4 text-xl font-bold text-gray-900">1200円</p>
                                </div>
                            </div>
                            
                            {/* Dish Card 6: Cao Lầu */}
                            <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                                <img src={caoLauImg} alt="カオラウ" className="w-full h-56 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold brand-color mb-2">カオラウ</h3>
                                    <p className="text-gray-600">ホイアンの誇り。独特の黄色い麺を、チャーシュー、揚げた豚皮、香草と一緒にいただきます。</p>
                                    <p className="mt-4 text-xl font-bold text-gray-900">1800円</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default FoodList;