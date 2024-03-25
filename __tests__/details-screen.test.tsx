import React from 'react';
import {waitFor, renderHook} from '@testing-library/react-native';
import {GET_USER_BY_ID} from '../__mocks__/msw/mock-data';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import useGetUser from '@httpclient/queries/useGetUser';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({children}) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
jest.mock('@react-native-community/netinfo', () =>
  require('@react-native-community/netinfo/jest/netinfo-mock'),
);

describe('DetailsScreen test', () => {
  it('should render user by id', async () => {
    const {result} = renderHook(() => useGetUser(2), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(GET_USER_BY_ID);
  });
});
