import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

interface CategoryContainerProps {
  hasError: boolean;
}

export const Container = styled(RectButton).attrs({
  activeOpacity: 0.7,
})<CategoryContainerProps>`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 18px 16px;

  ${({ hasError }) =>
    hasError &&
    css`
      border: 0.5px solid ${({ theme }) => theme.colors.attention};
    `}
`;

export const Category = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;
