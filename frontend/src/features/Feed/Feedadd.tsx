import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import FeedImage from './FeedImage';
import SearchPlace from './SearchPlace';
import { feed, setImage, setType } from './feedReducer';
import { ReducerType } from '../../app/rootReducer';

const Container = styled.div`
    position: relative;
    width: 360px;
    height: 720px;
    background: none;
    margin: 0 auto;
`;

function Feedsadd() {

    const dispatch = useDispatch();

    return (
        <Container>
            <Routes>
                <Route path="/" element={<FeedImage/>} />
                <Route path="/searchplace" element={<SearchPlace/>}/>
            </Routes>
        </Container>
    );
}

export default Feedsadd;
