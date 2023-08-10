import React from 'react';
import styled from 'styled-components';
import { PlaceThumbnailWrapper, ThumbnailImage } from 'features/Place/styles/StyledPlaceThumbnail';

function PlaceThumbnail({ thumbnail }: any) {
  
  return (
    <PlaceThumbnailWrapper>
      <ThumbnailImage src={thumbnail} alt="Place Thumbnail" style={{objectFit : "cover"}} />
    </PlaceThumbnailWrapper>
  );
}

export default PlaceThumbnail;
