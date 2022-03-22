/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Link, Routes, Route } from 'react-router-dom';

import SearchBar from './searchBar';
import SearchHistory from './searchHistory';
import SearchResultPlaces from './searchResultPlaces';
import SearchResultNicknames from './searchResultNicknames';

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props: any) {
  console.log(props);
  return (
    <Tab
      component={Link}
      //   onClick={(event) => {
      //     event.preventDefault();
      //   }}
      to={props.pathname}
      {...props}
    />
  );
}

const search = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
    // navigate(newValue);
  };

  return (
    <>
      <SearchBar />
      {isFocus && <SearchHistory />}
      <AppBar position="static">
        <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="nav tabs example">
          <LinkTab label="사용자" pathname="/search/nicknames" {...a11yProps(0)} />
          <LinkTab label="장소" pathname="/search/places" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <Routes>
        <Route path="/places" element={<SearchResultPlaces />} />
        <Route path="/nicknames" element={<SearchResultNicknames />} />
      </Routes>
    </>
  );
};

export default search;
