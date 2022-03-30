import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserProfile from 'features/Profile/components/user';
import FeedsAndPlaces from 'features/Profile/components/feedsAndPlaces';
import Navbar from 'common/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from 'app/rootReducer';
import ProfileApi from 'common/api/ProfileApi';
import { setFeeds } from './reducers/profileFeedReducer';

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

interface UserPropsTypes {
  owner: boolean | undefined;
  feedsCnt: number | undefined;
  likedCnt: number | undefined;
  bookmarkedCnt: number | undefined;
  moods: string[] | undefined;
}

function UserPage() {
  const { nickname } = useParams<string>();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [userProps, setUserProps] = useState<UserPropsTypes>();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // TODO: 해당 유저가 존재하는지 검사 & 유저 정보
    const getProfileApi = async () => {
      if (nickname !== undefined) {
        const result = await ProfileApi.getProfile(nickname);

        if (result.status === 200) {
          setUserProps(result.data);
        } else {
          navigate('/not-found');
        }
      }
    };

    setLoading(true);
    getProfileApi();

    return () => setLoading(false);
  }, [userProps]);

  useEffect(() => {
    if (nickname !== undefined) {
      const getMyFeedsApi = async () => {
        const result = await ProfileApi.getMyFeeds(nickname);

        if (result.status === 200) {
          dispatch(setFeeds(result.data));
        } else {
          navigate('/not-found');
        }
      };

      getMyFeedsApi();
    }
  }, []);

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '1024px' }}>
      {nickname !== undefined && <UserProfile nickname={nickname} userProps={userProps} />}
      <FeedsAndPlaces />
    </div>
  );
}

export default UserPage;
