import {UserI} from '@httpclient/queries/useGetUser';
import {AppRoute} from '@navigation/app-routes';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@types/Routing';
import React from 'react';
import {View} from 'react-native';
import {NameText, PhoneText, UserBox, UsernameText} from './user.item.style';

const UserItem: React.FC<{item: UserI; testID: string}> = ({item, testID}) => {
  const {name, username, phone} = item;
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, AppRoute.HomeScreen>
    >();
  return (
    <View testID={testID}>
      <UserBox
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate(AppRoute.DetailsScreen, {
            id: item.id,
            name: item.name,
          })
        }>
        <NameText>{name}</NameText>
        <UsernameText>{username}</UsernameText>
        <PhoneText>{phone}</PhoneText>
      </UserBox>
    </View>
  );
};

export default UserItem;
