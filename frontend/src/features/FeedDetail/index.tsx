import React, { useEffect, useState } from 'react';
import FeedDetailApi from 'common/api/FeedDetailApi';
import { Spin } from 'antd';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Feedcontent from './components/Feedcontent';
import Feedfooter from './components/Feedfooter';
import Feedimages from './components/Feedimages';
import Feedheader from './components/Feedheader';

const CustomSpin = styled.div`
  margin-left: 45%;
  margin-top: 100%;
`;

function FeedDetail() {
  const [FeedDetails, setFeedDetails] = useState<any>();
  const { getFeedDetail } = FeedDetailApi;

  const { feedSeq } = useParams();

  const [loadingFinsh, setLoadingFinsh] = useState(false);
  async function getAndFeedDetail() {
    if (feedSeq !== undefined) {
      const result = await getFeedDetail(feedSeq);
      console.log(result.data);
      setFeedDetails(result.data);
    } else {
      console.log('error');
      // 여기 토스트 메세지 써줘야 할듯
    }
  }
  // 정리.. 신의 한수,,,

  // 요청 -> 밑에 return 아래 값없으면 에러! => 따라서 로딩으로 일단 막고! => 값 이제 들어오면

  // 인자 값 렌더링 시키기

  useEffect(() => {
    getAndFeedDetail().then(() => {
      setLoadingFinsh(true);
    });
  }, [loadingFinsh]);

  console.log(feedSeq);
  console.log(FeedDetails);
  return (
    // <>hi</>
    <div>
      {loadingFinsh ? (
        <div key={FeedDetails.feedSeq} style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <Feedheader
              nickname={FeedDetails.nickname}
              userImage={FeedDetails.userImage}
              feedSeq={FeedDetails.feedSeq}
              placeName={FeedDetails.placeName}
              address={FeedDetails.address}
              amIOwner={FeedDetails.amIOwner}
            />
          </div>
          <div>
            <Feedimages images={FeedDetails.images} />
          </div>
          <div>
            <Feedcontent
              ratings={FeedDetails.ratings}
              content={FeedDetails.content}
              createDate={FeedDetails.createDate}
              moods={FeedDetails.moods}
              feedSeq={FeedDetails.feedSeq}
            />
          </div>
          <div>
            <Feedfooter
              amILike={FeedDetails.amILike}
              likesCnt={FeedDetails.likesCnt}
              commentsCnt={FeedDetails.commentsCnt}
              feedSeq={FeedDetails.feedSeq}
            />
          </div>
        </div>
      ) : (
        <CustomSpin>
          <Spin size="large" />
        </CustomSpin>
      )}
    </div>
  );
}

export default FeedDetail;
