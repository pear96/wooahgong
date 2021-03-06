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
  // ??????????????? ????????? ?????? ??????
  const handleClearRoute = () => {
    // ????????? ????????????
    if (resultdrawArr !== null) {
      // ?????? ??????, ?????? ????????? ???????????? ?????????
      routelist.map((v) => v.setMap(null));

      // ?????? ???????????? ?????? ????????? ??????
      markerlist.map((v) => v.setMap(map));

      // ???????????? ???????????? ??????
      resultdrawArr.setMap(null);

      // ?????? state??? null??? ?????????
      setResultDrawArr(null);

      // search flag ?????? false??? ?????????
      setIsSearch(false);

      // ?????? ?????? ????????? ?????? ??? ????????????
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
  // ???????????? api ?????? ??????
  const SearchWay = (type: boolean, end: { name: string; lat: number; lng: number }) => {
    console.log(type, end);

    // ?????? ?????? ???????????? ???????????? ?????????, ??????????????? ?????????x, ???????????? ???????????????
    markerlist.map((v) => v.setMap(null));

    // ?????? ?????? type??? ????????? ??????(true) ?????? ??????(false)?????? ??????
    const body = type
      ? {
        startX: `${myPosition.lng}`,
        startY: `${myPosition.lat}`,
        endX: `${end.lng}`,
        endY: `${end.lat}`,
        reqCoordType: 'WGS84GEO',
        resCoordType: 'EPSG3857',
        startName: '?????????',
        endName: '?????????',
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
    // axios ??????, type ?????? ?????? ?????? ?????? ?????????
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

        // ??? ?????? ??????
        const totalDistance = +(resultData[0].properties.totalDistance / 1000).toFixed(1);

        // ??? ????????? ??????
        const totalTime = +(resultData[0].properties.totalTime / 60).toFixed(0);

        // ???????????? ????????? ?????? ???????????? ?????? ????????? ???????????? ?????? bounds ????????? ?????? tmap bounds ?????? ??????
        const bounds = new window.Tmapv2.LatLngBounds();

        // ?????? ?????? ?????? ????????? ????????? ?????? ??????
        if (resultdrawArr !== null) {
          console.log('??????????', resultdrawArr);
          resultdrawArr.setMap(null);
          setResultDrawArr(null);
        }

        const drawInfoArr = [];
        const traffic = [];
        const polyline = [];
        console.log('?????? ???????????????');

        if (trafficInfochk !== null) {
          console.log('???????????????????');
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
                // ?????? ?????? ???
                const latlng = new window.Tmapv2.Point(geometry.coordinates[j][0], geometry.coordinates[j][1]);
                const convertPoint = new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
                const convertChnage = new window.Tmapv2.LatLng(convertPoint.lat(), convertPoint.lng());

                // ?????? ??? ????????? bounds ????????? extend ????????? ????????????
                bounds.extend(convertChnage);
                drawInfoArr.push(convertChnage);
              }
            }
          }
          drawRoute(drawInfoArr);
        }

        // ???????????? ????????? ??? ????????? ????????? ????????? ?????? ????????????
        // ?????? ??? ?????? ???????????? ?????? ??????
        const markerS = new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(myPosition.lat, myPosition.lng),
          icon: My,
          iconSize: new window.Tmapv2.Size(35, 35),
          map,
        });

        // ???????????? ?????? ??????
        const markerE = new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(end.lat, end.lng),
          icon: Marker,
          iconSize: new window.Tmapv2.Size(35, 35),
          map,
        });

        // ?????? ?????????????????? ????????? ???????????? ????????? state ????????? ????????????
        setRouteList([markerS, markerE]);

        // ?????? ????????? ?????? ???????????? bounds ????????? extend ?????? ?????? ??????
        // map ??? bounds ??? bounds ????????? ???????????? => ?????? ?????? ????????? ????????? ????????? ?????? ???????????? ?????????
        map.fitBounds(bounds);

        // ?????? ????????? ?????? ??????

        // ??????, ?????? ??? ?????????
        setTotal({ tDistance: totalDistance, tTime: totalTime });

        // ???????????? ????????? ???????????? flag ??????, true ?????? summary ??????????????? ????????? ???????????? ???????????????, ?????? ????????? ?????? (SummarySpot.tsx ??????)
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
  // map ??????
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
        // lat = 37.557620;
        // lng = 126.923110;
        lat = position.coords.latitude;
        lng = position.coords.longitude;
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

          console.log('?????????');
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
            console.log('?????????');
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
      console.log('?????????');
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
          console.log('??????');
        });
        marker.addListener('touchend', () => {
          setSpot(point[i]);
          setisOpen(true);
          console.log('??????');
        });
        markertemp.push(marker);
      }
      // ??? ????????? ?????? ??????
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
      // ???????????? state??? ????????????
      map.fitBounds(bounds);
      setCurCircle(circle);
      setMarkerList([...markertemp]);
    }
  };
  const handleSetDist = (value: number) => {
    setDistance(value);
  };
  // ?????? ?????? ??????
  const closeModal = () => {
    setisOpen(false);
  };
  const handleOpenDist = () => {
    setOpenDist(true);
  };
  const handleCloseDist = () => {
    setOpenDist(false);
  };

  // ?????? ????????? map??? null?????? map ??????, ?????? ?????? return
  useEffect(() => {
    console.log(state);
    if (map !== null) return;
    CreateMap();
  }, []);
  // ?????? ????????? ?????? ????????? ???
  useEffect(() => {
    // map??? null??? ?????? ?????? return
    if (map === null) return;
    map.addListener('click', closeModal); // map ?????? ???????????? ?????? ??? ???????????? ?????? ??????
    map.addListener('touchstart', closeModal);
    // ????????? ???????????? ?????? ??? ?????? ??????
    if (markerlist.length > 0) {
      console.log('???????');
      markerlist.map((v) => v.setMap(null));
      setMarkerList(markerlist.splice(0, markerlist.length));
    }
    if (curCircle !== null) {
      curCircle.setMap(null);
      setCurCircle(null);
    }

    // point state ??? ????????? ?????? ?????? ????????? ?????? ??????

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
        console.log('??????');
      });
      marker.addListener('touchend', () => {
        setSpot(data);
        setisOpen(true);
        console.log('??????');
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
      // ????????? ????????? ???????????? ?????? ????????? ?????????
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
          console.log('??????');
        });
        marker.addListener('touchend', () => {
          setSpot(point[i]);
          setisOpen(true);
          console.log('??????');
        });
        markertemp.push(marker);
      }
      // ??? ????????? ?????? ??????
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
      // ???????????? state??? ????????????
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
          ?????? : {distance / 1000}km
        </button>
      ) : null}
    </div>
  );
}

export default Map;
