import React, { useState } from 'react';
import { Button } from '../../components/Form/Button/indes';
import { CategorySelect } from '../../components/Form/CategorySelect/indes';

import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import { Container, Fields, Form, Header, Title, TransactionsTypes } from './styles';

export function Register() {
  const [transactionType, setTransactionType] = useState<'up' | 'down'>();

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <TransactionsTypes>
            <TransactionTypeButton
              type="up"
              title="Entrada"
              isActive={transactionType === 'up'}
              onPress={() => handleTransactionTypeSelect('up')}
            />
            <TransactionTypeButton
              type="down"
              title="Saída"
              isActive={transactionType == 'down'}
              onPress={() => handleTransactionTypeSelect('down')}
            />
          </TransactionsTypes>

          <CategorySelect title="Categoria" />
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
