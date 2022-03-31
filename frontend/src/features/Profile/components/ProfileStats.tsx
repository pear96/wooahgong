import React from 'react';
import { ProfileStatsWrapper, ProfileStat } from 'features/Profile/styles/StyledProfileStats';

type MyProps = {
  stats : {
    bookmarkedCnt: number ,
    feedsCnt: number ,
    image : string,
    likedCnt: number ,
    mbti : string ,
    moods: string[],
    owner: boolean,
  }
}

function ProfileStats({ stats }: MyProps) {

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
