import React from 'react';
import { ProfileStatsWrapper, ProfileStat } from 'features/Profile/styles/StyledProfileStats';

function ProfileStats({ stats }: any) {
  return (
    <ProfileStatsWrapper>
      <ProfileStat>
        <strong>{stats.feedsCnt}</strong>
        <span>올린 피드</span>
      </ProfileStat>
      <ProfileStat>
        <strong>{stats.likedCnt}</strong>
        <span>좋아한 피드</span>
      </ProfileStat>
      <ProfileStat>
        <strong>{stats.bookmarkedCnt}</strong>
        <span>찜한 장소</span>
      </ProfileStat>
    </ProfileStatsWrapper>
  );
}

export default ProfileStats;
