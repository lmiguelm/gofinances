import React from 'react';
import { TextInputProps } from 'react-native';

import { Container } from './styles';

interface Props extends TextInputProps {
  hasError?: boolean;
}

export function Input({ hasError = false, ...props }: Props) {
  return <Container hasError={hasError} {...props} />;
}
