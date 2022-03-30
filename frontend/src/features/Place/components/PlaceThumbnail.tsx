import React from 'react';
import styled from 'styled-components';
import { PlaceThumbnailWrapper, ThumbnailImage } from 'features/Place/styles/StyledPlaceThumbnail';

function PlaceThumbnail({ thumbnail }: any) {
  console.log(thumbnail);
  return (
    <PlaceThumbnailWrapper>
      <ThumbnailImage src={thumbnail} alt="Place Thumbnail" />
    </PlaceThumbnailWrapper>
  );
}

export default PlaceThumbnail;
