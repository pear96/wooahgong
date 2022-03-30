import React from 'react';
import { HeartOutlined, HeartTwoTone, CommentOutlined } from '@ant-design/icons';
import { CustomText } from '../styles/styledFeedfooter';

function Feedfooter({ amILike, likesCnt, commentsCnt }: any) {
  console.log(amILike);
  return (
    <div style={{ display: 'flex', marginLeft: '20px' }}>
      {amILike ? (
        <div>
          <HeartTwoTone twoToneColor="#9088F3" style={{ fontSize: '32px' }} />
        </div>
      ) : (
        <div>
          <HeartOutlined style={{ fontSize: '32px' }} />
        </div>
      )}
      <CustomText>{likesCnt}</CustomText>
      <div>
        <CommentOutlined style={{ fontSize: '32px', marginLeft: '20px' }} />
      </div>
      <CustomText>{commentsCnt}</CustomText>
    </div>
  );
}

export default Feedfooter;
