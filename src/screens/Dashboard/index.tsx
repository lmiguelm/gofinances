import React from 'react';

import {
  Container,
  Header,
  Photo,
  Icon,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
} from './styles';

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/lmiguelm.png' }} />

            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Miguel</UserName>
            </User>
          </UserInfo>

          <Icon name="power" />
        </UserWrapper>
      </Header>
    </Container>
  );
}
