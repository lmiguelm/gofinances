import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Icon, Title } from './styles';

interface Props extends RectButtonProps {
  type: 'up' | 'down';
  title: string;
  isActive: boolean;
}

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
};

export function TransactionTypeButton({ title, type, isActive, ...rest }: Props) {
  return (
    <Container type={type} isActive={isActive} {...rest}>
      <Icon type={type} name={icons[type]} />
      <Title>{title}</Title>
    </Container>
  );
}
