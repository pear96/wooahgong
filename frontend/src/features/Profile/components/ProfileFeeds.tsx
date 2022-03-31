import { ReducerType } from 'app/rootReducer';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ProfileApi from 'common/api/ProfileApi';
import {
  ProfileFeedsOrPlacesGrid,
  FeedOrPlaceWrapper,
  FeedOrPlaceTwoModes,
  FeedOrPlaceImageWrapper,
  HoveredFeedOrPlaceWrapper,
} from 'features/Profile/styles/StyledFeedsAndPlaces';
import { useNavigate, useParams } from 'react-router-dom';

function ProfileFeeds() {
  // const { feeds } = useSelector((state: ReducerType) => state.profileFeed);
  const { nickname } = useParams<string>();
  const [feeds, setFeeds] = useState<{ feedSeq: number; imageUrl: string }[]>([]);
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

  const getMyFeedsApi = async () => {
    if (nickname !== undefined && !endRef.current) {
      const value = {
        nickname,
        page : pageRef.current
      }
      console.log(feedsRef.current);
      const result = await ProfileApi.getMyFeeds(value);

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
      await getMyFeedsApi();
      observer.observe(entry.target);
    }
  };

  useEffect(()=>{
    // getMyFeedsApi();
  },[])
  useEffect(()=>{
    let observer;
    if(target){
      observer = new IntersectionObserver(onIntersect, {
        threshold : 0.2,
      });
      observer.observe(target);
    }
  }, [target]);

  return (
    <ProfileFeedsOrPlacesGrid>
      {feeds !== undefined ? (
        feeds.map((feed) => (

              <FeedOrPlaceImageWrapper>
                <img src={feed.imageUrl} alt="" style={{ width: '100%', height: '100%' }} />
              </FeedOrPlaceImageWrapper>

        ))
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

export default ProfileFeeds;
