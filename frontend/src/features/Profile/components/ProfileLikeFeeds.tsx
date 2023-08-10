import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ProfileApi from 'common/api/ProfileApi';
import {
  ProfileFeedsOrPlacesGrid,
  FeedOrPlaceImageWrapper,
} from 'features/Profile/styles/StyledFeedsAndPlaces';
import { Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

type MyProps = {
  nickname : string
}


function ProfileLikeFeeds({nickname} : MyProps) {
  // const { feeds } = useSelector((state: ReducerType) => state.profileFeed);
  const [feeds, setFeeds] = useState<{ feedSeq: number; imageUrl: string, placeSeq : number }[]>([]);
  const [target, setTarget] = useState<any>(null);
  const [page, setPage] = useState<number>(0);
  const [end, setEnd] = useState<boolean>(false);
  const [curNick, setCurNick] = useState<string>('');
  const feedsRef = useRef(feeds);
  feedsRef.current = feeds;
  const endRef = useRef(end);
  endRef.current = end;
  const pageRef = useRef(page);
  pageRef.current = page;
  const nickRef = useRef(curNick);
  nickRef.current = curNick;

  const navigate = useNavigate();

  const getLikedFeedsApi = async () => {
    if (nickname !== undefined && !endRef.current) {
      const value = {
        nickname : nickRef.current,
        page : pageRef.current
      }
      
      const result = await ProfileApi.getLikedFeeds(value);

      if (result.status === 200) {
        
        
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
  useEffect(()=>{
    
    setCurNick(nickname);
    setFeeds([]);
    setPage(0);
    setEnd(false);
  }, [nickname]);

  return (
    <div>
      {feeds !== undefined ? (
        <ProfileFeedsOrPlacesGrid>
          {feeds.map((feed, i) => { 
              const idx = i   
              return (
                  <FeedOrPlaceImageWrapper key={idx} onClick={() => handleClickFeed({feedSeq : feed.feedSeq, placeSeq : feed.placeSeq})}>
                    <img src={feed.imageUrl} alt="" style={{ width: '100%', height: '100%' }} />
                  </FeedOrPlaceImageWrapper>
              )})
          }
          <div
              ref={setTarget}
              style={{
                height: "15px",
          }}
          />
        </ProfileFeedsOrPlacesGrid>
      ): (
        <div style={{
          height : 380,
          display : "flex",
          alignItems : "center",
          justifyContent : "center"
        }}>
          <Spin size='large'/>
        </div>
      )}
      
    </div>
  );
}

export default ProfileLikeFeeds;
