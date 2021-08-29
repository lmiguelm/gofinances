import React, { useState } from 'react';
import { Modal } from 'react-native';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import { Header } from '../../components/Header';
import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import { CategorySelect } from '../CategorySelect';

import { Container, Fields, Form, TransactionsTypes } from './styles';

export function Register() {
  const [transactionType, setTransactionType] = useState<'up' | 'down'>();
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }
  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  return (
    <Container>
      <Header title="Cadastro" />

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

          <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal} />
        </Fields>

        <Button title="Enviar" />
      </Form>

      <Modal
        visible={categoryModalOpen}
        onRequestClose={handleCloseSelectCategoryModal}
        animationType="slide"
      >
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}
