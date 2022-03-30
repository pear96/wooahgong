import React, { useEffect, useState } from 'react';
import FeedDetailApi from 'common/api/FeedDetailApi';
import { Spin } from 'antd';
import styled from 'styled-components';
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

  const [loadingFinsh, setLoadingFinsh] = useState(false);
  async function getAndFeedDetail() {
    const result = await getFeedDetail();
    console.log(result.data);
    setFeedDetails(result.data);
  }

  useEffect(() => {
    getAndFeedDetail().then(() => {
      setLoadingFinsh(true);
    });
  }, [loadingFinsh]);

  console.log('안녕');

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
            />
          </div>
          <div>
            <Feedfooter
              amILike={FeedDetails.amILike}
              likesCnt={FeedDetails.likesCnt}
              commentsCnt={FeedDetails.commentsCnt}
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
