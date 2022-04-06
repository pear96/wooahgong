import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import MapApi from 'common/api/MapApi';
import My from '../../assets/MyPosition.png';
import Marker from '../../assets/Marker.png';
import Eximage from '../../assets/eximage.jpg';
import Myhome from '../../assets/myhome.jpg';
import SummarySpot from './SummarySpot';
import Distance from './modal/Distance';

interface Location {
  placeSeq: number;
  address: string;
  avgRatings: number;
  feeds: {
    feedSeq: number;
    thumbnail: string;
  };
  isWished: boolean;
  latitude: number;
  longitude: number;
  name: string;
  placeImageUrl: string;
}

function Map() {
  const [myPosition, setMyPosition] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [map, setMap] = useState<any>(null);
  const [spot, setSpot] = useState<{
    seq: number;
    img: string;
    name: string;
    avgRating: number;
    lat: number;
    lng: number;
  }>({ seq: -1, img: '', name: '', avgRating: 0, lat: 0, lng: 0 });
  const [point, setPoint] = useState<
    { seq: number; img: string; name: string; avgRating: number; lat: number; lng: number }[]
  >([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [total, setTotal] = useState<{ tDistance: number; tTime: number }>({
    tDistance: 0,
    tTime: 0,
  });
  const [resultdrawArr, setResultDrawArr] = useState<any>(null);
  const [resultdrawCarArr, setResultDrawCarArr] = useState<any[]>([]);
  const [open, setisOpen] = useState<boolean>(false);
  const [markerlist, setMarkerList] = useState<any[]>([]);
  const [routelist, setRouteList] = useState<any[]>([]);
  const [chktraffic, setChktraffic] = useState<any[]>([]);
  const [distance, setDistance] = useState<number>(1500);
  const [curCircle, setCurCircle] = useState<any>(null);
  const [openDist, setOpenDist] = useState<boolean>(false);

  const { getResultPlaceDistance } = MapApi;

  const location = useLocation();
  const state = location.state as Location;
  // 경로탐색후 초기화 하는 함수
  const handleClearRoute = () => {
    // 경로가 존재하면
    if (resultdrawArr !== null) {
      // 경로 시작, 도착 마커를 지도에서 내려줌
      routelist.map((v) => v.setMap(null));

      // 기존 마커들을 다시 지도에 올림
      markerlist.map((v) => v.setMap(map));

      // 경로선을 지도에서 내림
      resultdrawArr.setMap(null);

      // 경로 state를 null로 초기화
      setResultDrawArr(null);

      // search flag 값을 false로 초기화
      setIsSearch(false);

      // 경로 마커 배열을 아예 다 지워버림
      setRouteList(routelist.splice(0, routelist.length));
    }
    if (resultdrawCarArr.length > 0) {
      routelist.map((v) => v.setMap(null));
      resultdrawCarArr.map((v) => (v.getMap() === null ? v : v.setMap(null)));
      markerlist.map((v) => v.setMap(map));
      setIsSearch(false);
      setRouteList(routelist.splice(0, routelist.length));
    }
  };
  // 경로찾기 api 요청 함수
  const SearchWay = (type: boolean, end: { name: string; lat: number; lng: number }) => {
    console.log(type, end);

    // 일단 있는 마커들을 지도에서 때어줌, 마커리스트 초기화x, 지도에서 내리는거임
    markerlist.map((v) => v.setMap(null));

    // 전달 받는 type에 따라서 도보(true) 인지 차량(false)인지 판단
    const body = type
      ? {
        startX: `${myPosition.lng}`,
        startY: `${myPosition.lat}`,
        endX: `${end.lng}`,
        endY: `${end.lat}`,
        reqCoordType: 'WGS84GEO',
        resCoordType: 'EPSG3857',
        startName: '출발지',
        endName: '도착지',
      }
      : {
        startX: `${myPosition.lng}`,
        startY: `${myPosition.lat}`,
        endX: `${end.lng}`,
        endY: `${end.lat}`,
        reqCoordType: 'WGS84GEO',
        resCoordType: 'EPSG3857',
        searchOption: 0,
        trafficInfo: 'Y',
      };
    // axios 요청, type 값을 보고 요청 주소 바꿔줌
    axios
      .post(
        `https://apis.openapi.sk.com/tmap/routes${type ? '/pedestrian' : ''}?version=1&format=json&callback=result`,
        body,
        {
          headers: {
            appKey: 'l7xx76446024905c421fa3c63af0f5bb9175',
          },
        },
      )
      .then(({ data }) => {
        const trafficInfochk = type ? null : 'Y';
        const searchOption = type ? null : 0;
        const resultData = data.features;

        // 총 이동 거리
        const totalDistance = +(resultData[0].properties.totalDistance / 1000).toFixed(1);

        // 총 걸리는 시간
        const totalTime = +(resultData[0].properties.totalTime / 60).toFixed(0);

        // 생성되는 경로를 모두 보여지게 지도 범위를 조절하기 위해 bounds 경계를 담는 tmap bounds 객체 생성
        const bounds = new window.Tmapv2.LatLngBounds();

        // 이미 지도 상에 경로가 있으면 지워 버림
        if (resultdrawArr !== null) {
          console.log('여기니?', resultdrawArr);
          resultdrawArr.setMap(null);
          setResultDrawArr(null);
        }

        const drawInfoArr = [];
        const traffic = [];
        const polyline = [];
        console.log('여긴 아닌거같아');

        if (trafficInfochk !== null) {
          console.log('들어오셨나요?');
          for (let i = 0; i < resultData.length; i += 1) {
            const { geometry } = resultData[i];
            if (geometry.type === 'LineString') {
              traffic.push(geometry.traffic);
              const trafficArr = geometry.traffic;
              const sectionInfo = [];
              for (let j = 0; j < geometry.coordinates.length; j += 1) {
                const latlng = new window.Tmapv2.Point(geometry.coordinates[j][0], geometry.coordinates[j][1]);
                const convertPoint = new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
                const convertChnage = new window.Tmapv2.LatLng(convertPoint.lat(), convertPoint.lng());

                bounds.extend(convertChnage);
                sectionInfo.push(convertChnage);
              }
              setChktraffic(traffic);
              const line = drawCarRoute(sectionInfo, trafficArr, traffic);
              polyline.push(...line);
            }
          }
          console.log(polyline);
          setResultDrawCarArr([...polyline]);
        } else {
          for (let i = 0; i < resultData.length; i += 1) {
            const { geometry } = resultData[i];
            // const properties = resultData[i].properties;
            // let ployline;

            if (geometry.type === 'LineString') {
              for (let j = 0; j < geometry.coordinates.length; j += 1) {
                // 좌표 변환 함
                const latlng = new window.Tmapv2.Point(geometry.coordinates[j][0], geometry.coordinates[j][1]);
                const convertPoint = new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
                const convertChnage = new window.Tmapv2.LatLng(convertPoint.lat(), convertPoint.lng());

                // 변환 된 좌표를 bounds 객체에 extend 시켜서 담아준다
                bounds.extend(convertChnage);
                drawInfoArr.push(convertChnage);
              }
            }
          }
          drawRoute(drawInfoArr);
        }

        // 존재하던 마커를 다 내렸기 때문에 새로운 마커 생성해줌
        // 먼저 내 위치 시작지점 마커 생성
        const markerS = new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(myPosition.lat, myPosition.lng),
          icon: My,
          iconSize: new window.Tmapv2.Size(35, 35),
          map,
        });

        // 도착지점 마커 생성
        const markerE = new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(end.lat, end.lng),
          icon: Marker,
          iconSize: new window.Tmapv2.Size(35, 35),
          map,
        });

        // 기존 마커리스트랑 겹치면 안되니까 새로운 state 배열에 담아둔다
        setRouteList([markerS, markerE]);

        // 모든 경로에 대한 좌표값이 bounds 객체에 extend 되어 있는 상태
        // map 의 bounds 를 bounds 객체로 맞춰준다 => 지도 범위 재조정 되면서 경로가 모두 보이도록 조정됨
        map.fitBounds(bounds);

        // 경로 그리는 함수 호출

        // 거리, 시간 값 담아줌
        setTotal({ tDistance: totalDistance, tTime: totalTime });

        // 경로탐색 중인지 확인하는 flag 값임, true 이면 summary 컴포넌트가 지도를 클릭해도 안내려가고, 안에 내용이 바뀜 (SummarySpot.tsx 확인)
        setIsSearch(true);
      });
  };

  const drawCarRoute = (arrPoint: any[], traffic: any, chkt: any) => {
    const line = [];
    if (chkt.length !== 0) {
      console.log(traffic, resultdrawCarArr);
      if (traffic !== '0') {
        if (traffic.length === 0) {
          const polyline = new window.Tmapv2.Polyline({
            path: arrPoint,
            strokeColor: '#06050D',
            strokeWeight: 6,
            map,
          });
          line.push(polyline);
        } else {
          let trafficObject: { startIndex: number; endIndex: number; trafficIndex: number };
          const tInfo: { startIndex: number; endIndex: number; trafficIndex: number }[] = [];

          for (let i = 0; i < traffic.length; i += 1) {
            trafficObject = {
              startIndex: traffic[i][0],
              endIndex: traffic[i][1],
              trafficIndex: traffic[i][2],
            };
            tInfo.push(trafficObject);
          }
          // const line = [];
          for (let i = 0; i < tInfo.length; i += 1) {
            const section = [];
            let lineColor;
            for (let j = tInfo[i].startIndex; j <= tInfo[i].endIndex; j += 1) {
              section.push(arrPoint[j]);
            }
            if (tInfo[i].trafficIndex === 0) {
              lineColor = '#06050D';
            } else if (tInfo[i].trafficIndex === 1) {
              lineColor = '#61AB25';
            } else if (tInfo[i].trafficIndex === 2) {
              lineColor = '#FFFF00';
            } else if (tInfo[i].trafficIndex === 3) {
              lineColor = '#E87506';
            } else if (tInfo[i].trafficIndex === 4) {
              lineColor = '#D61125';
            }
            const polyline = new window.Tmapv2.Polyline({
              path: arrPoint,
              strokeColor: lineColor,
              strokeWeight: 6,
              map,
            });
            line.push(polyline);
          }
        }
      }
    }
    return line;
  };
  const drawRoute = (arrPoint: any[]) => {
    const polyline = new window.Tmapv2.Polyline({
      path: arrPoint,
      strokeColor: '#9088F3',
      strokeWeight: 6,
      map,
    });
    // map.fitBounds(bounds);
    setResultDrawArr(polyline);
  };
  // map 생성
  const CreateMap = () => {
    let lat;
    let lng;
    if (resultdrawArr !== null) {
      resultdrawArr.setMap(null);
      setResultDrawArr(null);
    }
    // if (state.placeInfo.)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        lat = 37.557620;
        lng = 126.923110;
        // lat = position.coords.latitude;
        // lng = position.coords.longitude;
        if (state !== null) {
          setMap(
            new window.Tmapv2.Map('TMapContainer', {
              center: new window.Tmapv2.LatLng(state.latitude, state.longitude),
              width: '100%',
              height: '100vh',
              zoom: 17,
              draggable: true,
              httpsMode: true,
            }),
          );

          console.log('???실행');
          setMyPosition({ lat, lng });
        } else {
          const data = {
            radius: distance,
            lat,
            lng,
          };
          console.log('???');
          const result = await getResultPlaceDistance(data);
          const value: { seq: number; img: string; name: string; avgRating: number; lat: number; lng: number }[] = [];
          if (result.status === 200) {
            result.data.map(
              (
                v: {
                  placeSeq: number;
                  address: string;
                  name: string;
                  imageUrl: string;
                  lat: number;
                  lng: number;
                  ratings: number;
                },
                i: number,
              ) => {
                return value.push({
                  seq: v.placeSeq,
                  img: v.imageUrl,
                  name: v.name,
                  avgRating: v.ratings,
                  lat: v.lat,
                  lng: v.lng,
                });
              },
            );
            setMap(
              new window.Tmapv2.Map('TMapContainer', {
                center: new window.Tmapv2.LatLng(lat, lng),
                width: '100%',
                height: '100vh',
                zoom: 17,
                draggable: true,
                httpsMode: true,
              }),
            );
            console.log('???실행');
            setPoint([...value]);
            setMyPosition({ lat, lng });
          }
        }
      });
    }
  };

  const findSpotByDistance = async () => {
    const data = {
      radius: distance,
      lat: myPosition.lat,
      lng: myPosition.lng,
    };
    const result = await getResultPlaceDistance(data);
    const value: { seq: number; img: string; name: string; avgRating: number; lat: number; lng: number }[] = [];
    if (result.status === 200) {
      console.log(result);
      if (markerlist.length > 0) {
        console.log('???????');
        markerlist.map((v) => v.setMap(null));
        setMarkerList(markerlist.splice(0, markerlist.length));
      }
      if (curCircle !== null) {
        curCircle.setMap(null);
        setCurCircle(null);
      }

      result.data.map(
        (
          v: {
            placeSeq: number;
            address: string;
            name: string;
            imageUrl: string;
            lat: number;
            lng: number;
            ratings: number;
          },
          i: number,
        ) => {
          return value.push({
            seq: v.placeSeq,
            img: v.imageUrl,
            name: v.name,
            avgRating: v.ratings,
            lat: v.lat,
            lng: v.lng,
          });
        },
      );
      console.log('???실행');
      const bounds = new window.Tmapv2.LatLngBounds();
      const markertemp = [];
      for (let i = 0; i < value.length; i += 1) {
        const marker = new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(value[i].lat, value[i].lng),
          icon: Marker,
          iconSize: new window.Tmapv2.Size(35, 35),
          map,
        });
        bounds.extend(new window.Tmapv2.LatLng(value[i].lat, value[i].lng));
        marker.addListener('click', () => {
          setSpot(value[i]);
          setisOpen(true);
          console.log('안녕');
        });
        marker.addListener('touchstart', () => {
          setSpot(point[i]);
          setisOpen(true);
          console.log('안녕');
        });
        markertemp.push(marker);
      }
      // 내 위치에 마커 생성
      const marker = new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(myPosition.lat, myPosition.lng),
        icon: My,
        iconSize: new window.Tmapv2.Size(35, 35),
        map,
      });
      bounds.extend(new window.Tmapv2.LatLng(myPosition.lat, myPosition.lng));
      markertemp.push(marker);
      const circle = new window.Tmapv2.Circle({
        center: new window.Tmapv2.LatLng(myPosition.lat, myPosition.lng),
        radius: distance,
        fillColor: 'black',
        strokeColor: 'none',
        fillOpacity: 0.1,
        strokeOpacity: 0,
        map,
      });
      // 마커들을 state에 저장해줌
      map.fitBounds(bounds);
      setCurCircle(circle);
      setMarkerList([...markertemp]);
    }
  };
  const handleSetDist = (value: number) => {
    setDistance(value);
  };
  // 상세 모달 닫기
  const closeModal = () => {
    setisOpen(false);
  };
  const handleOpenDist = () => {
    setOpenDist(true);
  };
  const handleCloseDist = () => {
    setOpenDist(false);
  };

  // 처음 실행시 map이 null이면 map 생성, 반대 경우 return
  useEffect(() => {
    console.log(state);
    if (map !== null) return;
    CreateMap();
  }, []);
  // 나의 위치가 설정 되었을 때
  useEffect(() => {
    // map이 null인 경우 일단 return
    if (map === null) return;
    map.addListener('click', closeModal); // map 아무 공간이나 클릭 시 상세정보 모달 닫기
    map.addListener('touchstart', closeModal);
    // 마커가 존재하는 경우 다 지워 버림
    if (markerlist.length > 0) {
      console.log('???????');
      markerlist.map((v) => v.setMap(null));
      setMarkerList(markerlist.splice(0, markerlist.length));
    }
    if (curCircle !== null) {
      curCircle.setMap(null);
      setCurCircle(null);
    }

    // point state 가 가지고 있는 값을 가지고 마커 생성

    const markertemp = [];
    if (state !== null) {
      const marker = new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(state.latitude, state.longitude),
        icon: Marker,
        iconSize: new window.Tmapv2.Size(35, 35),
        map,
      });
      const data = {
        seq: state.placeSeq,
        img: state.placeImageUrl,
        name: state.name,
        avgRating: state.avgRatings,
        lat: state.latitude,
        lng: state.longitude,
      };
      marker.addListener('click', () => {
        setSpot(data);
        setisOpen(true);
        console.log('안녕');
      });
      marker.addListener('touchstart', () => {
        setSpot(data);
        setisOpen(true);
        console.log('안녕');
      });
      markertemp.push(marker);
      const marker2 = new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(myPosition.lat, myPosition.lng),
        icon: My,
        iconSize: new window.Tmapv2.Size(35, 35),
        map,
      });
      markertemp.push(marker2);
      setMarkerList([...markerlist, ...markertemp]);
      setSpot(data);
      setisOpen(true);
    } else {
      // 거리로 찾는거 추가하면 작성 이어서 해야함
      const bounds = new window.Tmapv2.LatLngBounds();
      for (let i = 0; i < point.length; i += 1) {
        const marker = new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(point[i].lat, point[i].lng),
          icon: Marker,
          iconSize: new window.Tmapv2.Size(35, 35),
          map,
        });
        bounds.extend(new window.Tmapv2.LatLng(point[i].lat, point[i].lng));
        marker.addListener('click', () => {
          setSpot(point[i]);
          setisOpen(true);
          console.log('안녕');
        });
        marker.addListener('touchstart', () => {
          setSpot(point[i]);
          setisOpen(true);
          console.log('안녕');
        });
        markertemp.push(marker);
      }
      // 내 위치에 마커 생성
      const marker = new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(myPosition.lat, myPosition.lng),
        icon: My,
        iconSize: new window.Tmapv2.Size(35, 35),
        map,
      });
      bounds.extend(new window.Tmapv2.LatLng(myPosition.lat, myPosition.lng));
      markertemp.push(marker);
      const circle = new window.Tmapv2.Circle({
        center: new window.Tmapv2.LatLng(myPosition.lat, myPosition.lng),
        radius: distance,
        fillColor: 'black',
        strokeColor: 'none',
        fillOpacity: 0.1,
        strokeOpacity: 0,
        map,
      });
      // 마커들을 state에 저장해줌
      map.fitBounds(bounds);
      setCurCircle(circle);
      setMarkerList([...markerlist, ...markertemp]);
    }
  }, [myPosition]);
  useEffect(() => {
    if (map === null) return;
    findSpotByDistance();
  }, [distance]);

  return (
    <div id="TMapContainer">
      {open || isSearch ? (
        <SummarySpot
          spot={spot}
          isSearch={isSearch}
          total={total}
          searchWay={SearchWay}
          clearRoute={handleClearRoute}
        />
      ) : null}
      {openDist && state === null ? (
        <Distance open={openDist} dist={distance} onClose={handleCloseDist} setDist={handleSetDist} />
      ) : null}
      {state === null ? (
        <button
          style={{
            zIndex: 2,
            width: "fit-content",
            height: "fit-content",
            position: 'absolute',
            top: 100,
            left: 10,
            fontFamily: 'NotoSansKR',
            fontWeight: 700,
            border: 'none',
            borderRadius: 5,
            fontSize: 14,
            color: 'white',
            background: 'tomato',
            cursor: 'pointer',
          }}
          type="button"
          onClick={handleOpenDist}
        >
          범위 : {distance / 1000}km
        </button>
      ) : null}
    </div>
  );
}

export default Map;
