// import Endpoints from '../endpoints';
import axios from '../index';
import {useQuery} from '@tanstack/react-query';
import {UserI} from './useGetUser';
import Config from 'react-native-config';

type UsersAPIResponse = {
  data: UserI[];
};
export async function fetchUsers() {
  try {
    const {data} = await axios.get<UsersAPIResponse>(
      `${Config.BASE_URL}/users`,
      {
        validateStatus: (status: number) =>
          (status >= 200 && status < 300) || status === 403,
      },
    );

    return data;
  } catch (error) {
    // Handle the error here
    console.error('Error fetching users:', error);
    throw error;
  }
}

export const cacheKey = 'get-users';

export default function useGetUsers() {
  return useQuery({
    queryKey: [cacheKey],
    queryFn: () => {
      return fetchUsers();
    },
  });
}
