import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserProfile from 'features/Profile/components/user';
import FeedsAndPlaces from 'features/Profile/components/feedsAndPlaces';
import Navbar from 'common/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from 'app/rootReducer';
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

function UserPage() {
  const { nickname } = useParams();
  const [userExists, setUserExists] = useState(false);
  const navigate = useNavigate();

  const { feeds } = useSelector((state: ReducerType) => state.profileFeed);
  const dispatch = useDispatch();

  const [userProps, setUserProps] = useState(dummyUserProps);

  useEffect(() => {
    // TODO: 해당 유저가 존재하는지 검사 & 유저 정보

    if (nickname) {
      setUserExists(true);
      // const token = localStorage.getItem('Token');
      // axios({
      //   method: 'get',
      //   url: process.env.BACK_EC2 + '/user/' + nickname,
      //   headers: { Authorization: "Bearer " + token },
      // })
      //   .then((res) => {
      //     setUserProps(res.data)
      //     router.push('/user/' + username);
      //   })
      //   .catch((err) => {
      //     Router.push('/404')
      //   })
      dispatch(setFeeds(dummyFeeds));
    } else {
      navigate('/not-found');
    }
  }, [nickname, navigate]);

  return userExists ? (
    <div>
      <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '1024px' }}>
        <UserProfile nickname={nickname} userProps={userProps} />
        <FeedsAndPlaces />
      </div>
    </div>
  ) : null;
}

export default UserPage;
