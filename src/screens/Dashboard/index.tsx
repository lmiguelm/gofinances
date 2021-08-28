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
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />

        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última entrada dia 03 de abril"
        />

        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.241,00"
          lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>
    </Container>
  );
}
