import React from 'react';
import {
  render,
  waitFor,
  renderHook,
  screen,
} from '@testing-library/react-native';
import HomeScreen from '@screens/home-screen/home-screen';
import useGetUsers from '@httpclient/queries/useGetUsers';
import {createReactQueryWrapper} from '@httpclient/testing';
import {GET_ALL_USERS} from '__mocks__/msw/mock-data';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

describe('HomeScreen', () => {
  it('should display loading indicator initially', async () => {
    render(<HomeScreen />, {wrapper: createReactQueryWrapper});
    expect(screen.queryByTestId('loading-indicator')).toBeTruthy();

    const {result} = renderHook(() => useGetUsers(), {
      wrapper: createReactQueryWrapper,
    });
    await waitFor(() => result.current.isSuccess);

    expect(screen.queryByTestId('loading-indicator')).not.toBeTruthy();
  });
});

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

describe('HomeScreen test', () => {
  it('should load all users', async () => {
    const {result} = renderHook(() => useGetUsers(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(GET_ALL_USERS);
  });
});
