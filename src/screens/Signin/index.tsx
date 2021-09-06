import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { ActivityIndicator, Alert, Platform } from 'react-native';

import {
  Container,
  Header,
  Footer,
  TitleWrapper,
  Title,
  SigninTitle,
  FooterWrapper,
} from './styles';

import AplleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import { SigninSocialButton } from '../../components/SigninSocialButton';

import { useAuth } from '../../hooks/useAuth';
import { useTheme } from 'styled-components';

export function Signin() {
  const { signInWithGoogle, signInWithApple } = useAuth();
  const { colors } = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Apple');
      setIsLoading(false);
    }
  }

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google');
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas {'\n'} finanças de forma {'\n'} muito simples
          </Title>
        </TitleWrapper>

        <SigninTitle>Faça seu login com {'\n'} uma das contas abaixo</SigninTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SigninSocialButton
            title="Entrar com o Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />

          {Platform.OS === 'ios' && (
            <SigninSocialButton
              title="Entrar com a Apple"
              svg={AplleSvg}
              onPress={handleSignInWithApple}
            />
          )}
        </FooterWrapper>

        {isLoading && (
          <ActivityIndicator color={colors.primary} size="large" style={{ marginTop: 18 }} />
        )}
      </Footer>
    </Container>
  );
}
