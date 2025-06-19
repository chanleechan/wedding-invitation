import React from 'react';
import '../css/CoverPage.css';
import coverImage from '../images/cover_page.png';


const CoverPage = ({ onEnter }) => (
  <div className="cover-page" onClick={onEnter}>
    <img src={coverImage} alt="커버 이미지" className="cover-photo-full" />
  </div>
);

export default CoverPage;
