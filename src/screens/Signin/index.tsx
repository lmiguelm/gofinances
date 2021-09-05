import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

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

export function Signin() {
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
          <SigninSocialButton title="Entrar com o Google" svg={GoogleSvg} />
          <SigninSocialButton title="Entrar com a Apple" svg={AplleSvg} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
