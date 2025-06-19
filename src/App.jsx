import React, { useState } from 'react';
import './App.css';
import './css/thema.css'
import CoverPage from './components/CoverPage';
import PhotoGallery from './components/PhotoGallery';
import Main from '../src/images/main4.jpg';
import KakaoMap from './components/KakaoMap';

function App() {
  const [showCover, setShowCover] = useState(true);

  return (
    <>
      {showCover && <CoverPage onEnter={() => setShowCover(false)} />}
      {!showCover && (
        <div className="container">
          {/* 기존 청첩장 내용 */}
          <header className="hero">
            <img src={Main} alt="커플사진" className="couple-photo" />
            <h1>홍길동 & 이순신</h1>
            <p className="date">2025년 10월 5일 (일) 오후 1시</p>
            <p className="venue">서울 강남구 웨딩홀 3층</p>
          </header>
          <section className="greeting">
            <p>저희 두 사람이 새로운 시작을 하려 합니다.<br />축복해주시면 감사하겠습니다.</p>
          </section>
          <PhotoGallery />
          <section className="info">
            <h2>오시는 길</h2>
            <KakaoMap />
            <h2>연락처</h2>
            <p>신랑: 010-1234-5678<br />신부: 010-9876-5432</p>
            <h2>계좌번호</h2>
            <p>신랑: 국민 123456-78-91011<br />신부: 신한 987654-32-10987</p>
          </section>
        </div>
      )}
    </>
  );
}

export default App;
