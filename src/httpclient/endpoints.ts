import Config from 'react-native-config';

const Endpoints = {
  baseUrl: Config.BASE_URL,
  users: `${Config.BASE_URL}/users`,
};

export default Endpoints;
