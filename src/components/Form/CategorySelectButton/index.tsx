import React from 'react';

import { Container, Category, Icon } from './styles';

interface Props {
  title: string;
  onPress: () => void;
  error: boolean;
}

export function CategorySelectButton({ error, title, onPress }: Props) {
  return (
    <Container hasError={error} onPress={onPress}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
}
