import useGetUser from '@httpclient/queries/useGetUser';
import {AppRoute} from '@navigation/app-routes';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@types/Routing';
import React from 'react';

import {ActivityIndicator} from 'react-native';
import {
  ErrorText,
  InnerContainer,
  MainContainer,
  NextButton,
  NextText,
  UsernameText,
} from './details-screen.style';

type DetailsScreenProps = {
  id: number;
  name: string;
};

const DetailsScreen: React.FC<DetailsScreenProps> = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, AppRoute.DetailsScreen>>();
  const {isError, data, isFetching} = useGetUser(route?.params?.id ?? '');
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, AppRoute.HomeScreen>
    >();

  const goToNextUser = () => {
    if (data && data.id) {
      navigation.push(AppRoute.DetailsScreen, {
        id: data?.id + 1,
        name: data?.name,
      });
    }
  };

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
        <ErrorText>Something went wrong!</ErrorText>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <UsernameText>Username: {data?.username}</UsernameText>
      <InnerContainer>
        <NextButton onPress={goToNextUser}>
          <NextText testID="next-button">Next user</NextText>
        </NextButton>
      </InnerContainer>
    </MainContainer>
  );
};

export default DetailsScreen;
