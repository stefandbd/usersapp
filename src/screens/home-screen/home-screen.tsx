import {FlashList} from '@shopify/flash-list';
import React from 'react';

import {ActivityIndicator} from 'react-native';
import useGetUsers from '../../httpclient/queries/useGetUsers';
import UserItem, {UserItemType} from '@components/user-item/user-item';
import {
  BgImage,
  ErrorText,
  HeaderContainer,
  HeaderText,
  MainContainer,
} from './home-screen.style';
import {Images} from '@theming/index';

export type CatType = {
  id: string;
  name: string;
  origin: string;
  image: {
    width: number;
    height: number;
    id: string;
    url: string;
  };
  description: string;
  life_span: string;
  temperament: string;
  adaptability: number;
  child_friendly: number;
  stranger_friendly: number;
  wikipedia_url: string;
};

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderText>My list of users</HeaderText>
    </HeaderContainer>
  );
};

const HomeScreen: React.FC = () => {
  const {isError, data, isFetching} = useGetUsers();
  if (isFetching) {
    return (
      <ActivityIndicator
        size={'large'}
        color={'#4B328D'}
        testID="loading-indicator"
      />
    );
  }
  if (isError) {
    return (
      <MainContainer>
        <ErrorText testID="errorMessage">Something went wrong!</ErrorText>
      </MainContainer>
    );
  }
  return (
    <MainContainer>
      <BgImage source={Images.waveBgg}>
        <FlashList
          data={data}
          renderItem={({item, index}: {item: UserItemType; index: number}) => (
            <UserItem item={item} testID={`user-item-${index}`} />
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          estimatedItemSize={190 * 15}
          refreshing={isFetching}
          ListHeaderComponent={<Header />}
          // onRefresh={loadMoreUsers}
          // onEndReached={loadMoreUsers}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{
            paddingTop: 24,
            padding: 16,
          }}
        />
      </BgImage>
    </MainContainer>
  );
};

export default HomeScreen;
