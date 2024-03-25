import {Colors} from '@theming/Colors';
import Sizes from '@theming/Sizes';
import styled from 'styled-components/native';

export const UserBox = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 170px;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: ${Colors.white};
  height: 160px;
`;

export const NameText = styled.Text`
  color: ${Colors.primary};
  font-size: ${Sizes.gutterSize * 2}px;
  font-weight: 700;
`;

export const UsernameText = styled.Text`
  color: ${Colors.primary};
  font-size: 14px;
  font-weight: 500;
`;

export const PhoneText = styled.Text`
  color: ${Colors.primary};
  font-size: 12px;
  font-weight: 500;
`;
