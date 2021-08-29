import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface InputProps {
  hasError: boolean;
}

export const Container = styled(TextInput)<InputProps>`
  width: 100%;

  padding: 16px 18px;

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme }) => theme.colors.text_dark};
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;

  ${({ hasError }) =>
    hasError &&
    css`
      border-width: 0.5px;
      border-color: ${({ theme }) => theme.colors.attention};
    `}

  margin-bottom: 8px;
`;
