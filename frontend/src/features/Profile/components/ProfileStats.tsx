import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProfileStatsWrapper, ProfileStat } from 'features/Profile/styles/StyledProfileStats';
import ProfileApi from 'common/api/ProfileApi';

interface UserPropsTypes {
  owner: boolean;
  feedsCnt: number;
  likedCnt: number;
  bookmarkedCnt: number;
  moods: string[];
}

function ProfileStats({ stats }: any) {
  const { nickname } = useParams<string>();
  // const [stats, setStats] = useState<UserPropsTypes>();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (nickname !== undefined) {
  //     const getProfileApi = async () => {
  //       const result = await ProfileApi.getProfile(nickname);

  //       if (result.status === 200) {
  //         setStats(result.data);
  //         // console.log(result.data);
  //       } else {
  //         navigate('/not-found');
  //       }
  //     };
  //     getProfileApi();
  //   }
  // }, []);
  return (
    <ProfileStatsWrapper>
      <ProfileStat>
        {stats !== undefined && <strong>{stats.feedsCnt}</strong>}
        <span>올린 피드</span>
      </ProfileStat>
      <ProfileStat>
        {stats !== undefined && <strong>{stats.likedCnt}</strong>}
        <span>좋아한 피드</span>
      </ProfileStat>
      <ProfileStat>
        {stats !== undefined && <strong>{stats.bookmarkedCnt}</strong>}
        <span>찜한 장소</span>
      </ProfileStat>
    </ProfileStatsWrapper>
  );
}

export default ProfileStats;
