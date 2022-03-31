import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserProfile from 'features/Profile/components/user';
import FeedsAndPlaces from 'features/Profile/components/feedsAndPlaces';
import Navbar from 'common/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from 'app/rootReducer';
import ProfileApi from 'common/api/ProfileApi';
// import { setFeeds } from './reducers/profileFeedReducer';

const dummyUserProps = {
  isOwner: true,
  feedsCnt: 15,
  likedCnt: 175,
  bookmarkedCnt: 286,
  moods: ['감성적', '빈티지'],
};

const dummyFeeds = [
  {
    feedSeq: 1,
    imageUrl: 'https://picsum.photos/640/300',
  },
  {
    feedSeq: 2,
    imageUrl: 'https://picsum.photos/640/340',
  },
  {
    feedSeq: 3,
    imageUrl: 'https://picsum.photos/640/380',
  },
  {
    feedSeq: 4,
    imageUrl: 'https://picsum.photos/640/420',
  },
];


function UserPage() {
  const { nickname } = useParams<string>();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [userProps, setUserProps] = useState<{
    bookmarkedCnt: number ,
    feedsCnt: number ,
    image : string,
    likedCnt: number ,
    mbti : string ,
    moods: string[],
    owner: boolean,
  }>({bookmarkedCnt : -1, feedsCnt : -1, image : "", likedCnt : -1, mbti : "", moods : [""], owner : false });
  // const [feeds, setFeeds] = useState<{ feedSeq: number; imageUrl: string }[]>([]);
  
  
  const [isProfileLoading, setProfileLoading] = useState<boolean>(false);
  const [isFeedsLoading, setFeedsLoading] = useState<boolean>(false);

  // const getMyFeedsApi = async () => {
  //   if (nickname !== undefined) {
  //     const result = await ProfileApi.getMyFeeds(nickname);

  //     if (result.status === 200) {
  //       // setFeeds([...result.data]);
  //       // setFeedsLoading(true);
  //     } else {
  //       navigate('/not-found');
  //     }
  //   }
  // };

  const getProfileApi = async () => {
    if (nickname !== undefined) {
      const result = await ProfileApi.getProfile(nickname);
      console.log(result.data);
      if (result.status === 200) {
        setUserProps(result.data);
        setProfileLoading(true);
      } else {
        navigate('/not-found');
      }
    }
  };
  useEffect(() => {
    // TODO: 해당 유저가 존재하는지 검사 & 유저 정보
    getProfileApi();
    // getMyFeedsApi();
  }, [UserPage]);

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '1024px' }}>
      {nickname !== undefined && isProfileLoading ? (
        <>
          <UserProfile nickname={nickname} userProps={userProps} />
          <FeedsAndPlaces />
        </>
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
}

export default UserPage;
