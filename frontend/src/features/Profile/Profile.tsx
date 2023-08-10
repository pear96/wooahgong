import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import UserProfile from 'features/Profile/components/user';
import FeedsAndPlaces from 'features/Profile/components/feedsAndPlaces';
import { useDispatch, useSelector } from 'react-redux';
import ProfileApi from 'common/api/ProfileApi';
// import { setFeeds } from './reducers/profileFeedReducer';

function Profile() {
    const { nickname } = useParams<string>();

    const navigate = useNavigate();

    const [userProps, setUserProps] = useState<{
        bookmarkedCnt: number ,
        feedsCnt: number ,
        image : string,
        likedCnt: number ,
        mbti : string ,
        moods: string[],
        owner: boolean,
    }>({bookmarkedCnt : -1, feedsCnt : -1, image : "", likedCnt : -1, mbti : "", moods : [""], owner : false });

    const [isProfileLoading, setProfileLoading] = useState<boolean>(false);

    const getProfileApi = async () => {
        if (nickname !== undefined) {
        const result = await ProfileApi.getProfile(nickname);
        
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
    }, []);
    useEffect(() => {
        
        getProfileApi();
    }, [nickname])

    return (
        <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '1024px' }}>
        {nickname !== undefined && isProfileLoading ? (
            <>
            <UserProfile nickname={nickname} userProps={userProps} />
            <FeedsAndPlaces nickname={nickname} />
            </>
        ) : (
            <div style={{
            height : 720,
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

export default Profile;
