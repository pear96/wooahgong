import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ProfileApi from 'common/api/ProfileApi';
import {
  ProfileFeedsOrPlacesGrid,
  FeedOrPlaceImageWrapper,
} from 'features/Profile/styles/StyledFeedsAndPlaces';
import { useNavigate, useParams } from 'react-router-dom';

function ProfileLikeFeeds() {
  // const { feeds } = useSelector((state: ReducerType) => state.profileFeed);
  const { nickname } = useParams<string>();
  const [feeds, setFeeds] = useState<{ feedSeq: number; imageUrl: string, placeSeq : number }[]>([]);
  const [target, setTarget] = useState<any>(null);
  const [page, setPage] = useState<number>(0);
  const [end, setEnd] = useState<boolean>(false);
  const feedsRef = useRef(feeds);
  feedsRef.current = feeds;
  const endRef = useRef(end);
  endRef.current = end;
  const pageRef = useRef(page);
  pageRef.current = page;

  const navigate = useNavigate();

  const getLikedFeedsApi = async () => {
    if (nickname !== undefined && !endRef.current) {
      const value = {
        nickname,
        page : pageRef.current
      }
      console.log(feedsRef.current);
      const result = await ProfileApi.getLikedFeeds(value);

      if (result.status === 200) {
        console.log("?!?!?!?!?!");
        console.log(result.data);
        if(result.data.length === 0){
          setEnd(true);
        }
        else if(feedsRef.current.length > 0) {
          setFeeds([...feedsRef.current, ...result.data]);
          setPage(pageRef.current+1);
        }
        else{
          setFeeds([...result.data]);
          setPage(pageRef.current+1);
        }
      } else {
        navigate('/not-found');
      }
    }
  };
  const onIntersect = async ([entry] : any, observer : any) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      await getLikedFeedsApi();
      observer.observe(entry.target);
    }
  };
  const handleClickFeed = (value : {feedSeq : number, placeSeq : number}) => {
    navigate(`/place/${value.placeSeq}/feeds/${value.feedSeq}`);
  }

  useEffect(()=>{
    let observer : any;
    if(target){
      observer = new IntersectionObserver(onIntersect, {
        threshold : 0.2,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);
  

  return (
    <ProfileFeedsOrPlacesGrid>
      {feeds !== undefined ? (
        feeds.map((feed, i) => { 
          const idx = i   
          return (
              <FeedOrPlaceImageWrapper key={idx} onClick={() => handleClickFeed({feedSeq : feed.feedSeq, placeSeq : feed.placeSeq})}>
                <img src={feed.imageUrl} alt="" style={{ width: '100%', height: '100%' }} />
              </FeedOrPlaceImageWrapper>
          )})
      ) : (<>loading</>)}
      <div
          ref={setTarget}
          style={{
            height: "15px",
          }}
      />
    </ProfileFeedsOrPlacesGrid>
  );
}

export default ProfileLikeFeeds;
