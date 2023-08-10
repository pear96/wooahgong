import React, { useEffect, useRef, useState,  } from 'react';
import ProfileApi from 'common/api/ProfileApi';
import { ProfileFeedsOrPlacesGrid, FeedOrPlaceImageWrapper } from 'features/Profile/styles/StyledFeedsAndPlaces';
import { useNavigate, useParams } from 'react-router-dom';

type MyProps = {
  nickname : string
}

function ProfileFeeds({nickname} : MyProps) {
  // const { feeds } = useSelector((state: ReducerType) => state.profileFeed);
  const [feeds, setFeeds] = useState<{ feedSeq: number; imageUrl: string; placeSeq: number }[]>([]);
  const [curNick, setCurNick] = useState<string>('');
  const [target, setTarget] = useState<any>(null);
  const [page, setPage] = useState<number>(0);
  const [end, setEnd] = useState<boolean>(false);
  const feedsRef = useRef(feeds);
  feedsRef.current = feeds;
  const endRef = useRef(end);
  endRef.current = end;
  const pageRef = useRef(page);
  pageRef.current = page;
  const nickRef = useRef(curNick);
  nickRef.current = curNick;

  const navigate = useNavigate();

  const getMyFeedsApi = async () => {
    if (curNick !== '' && !endRef.current) {
      const value = {
        nickname : nickRef.current,
        page: pageRef.current,
      };
      
      const result = await ProfileApi.getMyFeeds(value);

      if (result.status === 200) {
        
        
        if (result.data.length === 0) {
          setEnd(true);
        } else if (feedsRef.current.length > 0) {
          setFeeds([...feedsRef.current, ...result.data]);
          setPage(pageRef.current + 1);
        } else {
          setFeeds([...result.data]);
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
      await getMyFeedsApi();
      observer.observe(entry.target);
    }
  };

  const handleClickFeed = (value: { feedSeq: number; placeSeq: number }) => {
    navigate(`/place/${value.placeSeq}/feeds/${value.feedSeq}`);
  };

  useEffect(() => {
    let observer: any;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.2,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);
  useEffect(()=>{
    
    setCurNick(nickname);
    setFeeds([]);
    setPage(0);
    setEnd(false);
  }, [nickname]);
  useEffect(()=>{
    // setTarget(null);
  }, [feeds]);

  return (

    <ProfileFeedsOrPlacesGrid>
      {feeds !== undefined ? (
        feeds.map((feed, i) => {
          const idx = i;
          return (
            <FeedOrPlaceImageWrapper
              key={idx}
              onClick={() => handleClickFeed({ feedSeq: feed.feedSeq, placeSeq: feed.placeSeq })}
            >
              <img style={{objectFit : "cover", width : "100%", height : "100%"}} src={feed.imageUrl} alt="" />
            </FeedOrPlaceImageWrapper>
          );
        })
      ) : (
        <>loading</>
      )}
      <div
        ref={setTarget}
        style={{
          height: '15px',
        }}
      />
    </ProfileFeedsOrPlacesGrid>
  );
}

export default ProfileFeeds;
