import Config from 'react-native-config';
import axios from '../index';
import {useQuery} from '@tanstack/react-query';

export type UserI = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export async function fetchUser(id: number) {
  try {
    const {data} = await axios.get<UserI>(`${Config.BASE_URL}/users/${id}`, {
      validateStatus: (status: number) =>
        (status >= 200 && status < 300) || status === 403,
    });
    return data;
  } catch (error) {
    // Handle the error here
    console.error('Error fetching users:', error);
    throw error;
  }
}

export const cacheKey = 'get-user-id';

export default function useGetUser(id: number) {
  return useQuery({
    enabled: !!id,
    queryKey: [cacheKey, id],
    queryFn: () => {
      return fetchUser(id);
    },
  });
}
