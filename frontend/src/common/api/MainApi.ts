import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from './JTW-Token';

const BASE_URL = 'https://j6a505.p.ssafy.io/data/main';


// main For me api
const getFormeplace = async (body: {
  searchRadius: number | undefined;
  lat: number | undefined;
  lng: number | undefined;
}) => {
  // console.log(body);
  const token = getToken();

  const result = await axios
    .post(`${BASE_URL}`, body, { headers: { Authorization: `${token}` } })
    .then((res) => {
      // console.log(res);
      return res;
    })
    .catch((err: any) => {
      console.dir(err);
      return err;
    });

  return result;
};

// main Trend api

const getTrendplace = async (body: {
  searchRadius: number | undefined;
  lat: number | undefined;
  lng: number | undefined;
}) => {
  // console.log(body);
  const token = getToken();
  const result = await axios
    .post(`${BASE_URL}/trend`, body, { headers: { Authorization: `${token}` } })
    .then((res) => {
      // console.log(res);
      return res;
    })
    .catch((err: any) => {
      console.dir(err);
      return err;
    });

  return result;
};

const MainApi = {
  getFormeplace,
  getTrendplace,
};

export default MainApi;
