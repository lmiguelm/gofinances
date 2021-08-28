import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { HighlightCard } from '../../components/HighlightCard';

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
  HighlightCards,
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

      <HighlightCards>
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
      </HighlightCards>
    </Container>
  );
}
