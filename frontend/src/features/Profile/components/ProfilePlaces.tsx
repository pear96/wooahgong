import React, { useEffect, useState, useRef } from 'react';
import ProfileApi from 'common/api/ProfileApi';
import { ProfileFeedsOrPlacesGrid, FeedOrPlaceImageWrapper } from 'features/Profile/styles/StyledFeedsAndPlaces';
import { Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';


type MyProps = {
  nickname : string
}
function ProfilePlaces({nickname} : MyProps) {
  // const { places } = useSelector((state: ReducerType) => state.profilePlace);
  console.log('??????????');

  const [places, setPlaces] = useState<{ placeSeq: number; thumbnail: string }[]>([]);
  const [target, setTarget] = useState<any>(null);
  const [page, setPage] = useState<number>(0);
  const [end, setEnd] = useState<boolean>(false);
  const [curNick, setCurNick] = useState<string>('');
  const placesRef = useRef(places);
  placesRef.current = places;
  const endRef = useRef(end);
  endRef.current = end;
  const pageRef = useRef(page);
  pageRef.current = page;
  const nickRef = useRef(curNick);
  nickRef.current = curNick;

  const navigate = useNavigate();

  const getWishedFeedsApi = async () => {
    if (nickname !== undefined && !endRef.current) {
      const value = {
        nickname : nickRef.current,
        page: pageRef.current,
      };
      const result = await ProfileApi.getWishedFeeds(value);

      if (result.status === 200) {
        if (result.data.length === 0) {
          setEnd(true);
        } else if (placesRef.current.length > 0) {
          setPlaces([...placesRef.current, ...result.data]);
          setPage(pageRef.current + 1);
        } else {
          setPlaces([...result.data]);
          setPage(pageRef.current + 1);
        }
      } else {
        navigate('/not-found');
      }
    }
  };
  const onIntersect = async ([entry]: any, observer: any) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      await getWishedFeedsApi();
      observer.observe(entry.target);
    }
  };
  const handleClickPlace = (placeSeq: number) => {
    navigate(`/place/${placeSeq}`);
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.2,
      });
      observer.observe(target);
    }
  }, [target]);
  useEffect(()=>{
    console.log(nickname);
    setCurNick(nickname);
    setPlaces([]);
    setPage(0);
    setEnd(false);
  }, [nickname]);

  return (
    <div>
      {places !== undefined ? (
        <ProfileFeedsOrPlacesGrid>
          {places.map((place, i) => {
            const idx = i;
            return (
              <FeedOrPlaceImageWrapper key={idx} onClick={() => handleClickPlace(place.placeSeq)}>
                <img src={place.thumbnail} alt="" style={{ width: '100%', height: '100%' }} />
              </FeedOrPlaceImageWrapper>
            );
          })}
          <div
            ref={setTarget}
            style={{
              height: '15px',
            }}
          />
        </ProfileFeedsOrPlacesGrid>
      ) : (
        <div
          style={{
            height: 380,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spin size="large" />
        </div>
      )}
    </div>
  );
}

export default ProfilePlaces;
