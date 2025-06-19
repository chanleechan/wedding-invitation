import React, { useEffect } from 'react';

const KakaoMap = () => {
  useEffect(() => {
    // window.kakao가 로드됐는지 확인
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(37.517643, 126.900084),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);

      // 마커 추가
      const markerPosition = new window.kakao.maps.LatLng(37.517643, 126.900084);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);

      // 인포윈도우 추가
      const iwContent = '<div style="padding:5px;">JK아트컨벤션<br><a href="https://map.kakao.com/link/map/JK아트컨벤션,37.517643,126.900084" target="_blank">큰지도보기</a></div>';
      const infowindow = new window.kakao.maps.InfoWindow({
        content: iwContent,
      });
      infowindow.open(map, marker);
    }
  }, []);

  return (
    <div
      id="map"
      style={{
        width: '100%',
        height: '350px',
        borderRadius: '8px',
        margin: '20px 0',
      }}
    />
  );
};

export default KakaoMap;
