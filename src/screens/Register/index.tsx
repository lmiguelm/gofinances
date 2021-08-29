import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form';

import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { Header } from '../../components/Header';
import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import { CategorySelect } from '../CategorySelect';

import { Container, Fields, Form, TransactionsTypes } from './styles';
import { InputForm } from '../../components/Form/InputForm/indes';

interface FormData {
  name: string;
  amount: string;
}

export function Register() {
  const { control, handleSubmit } = useForm();

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

  function handleRegister(form: FormData) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category,
    };

    console.log(data);
  }

  return (
    <Container>
      <Header title="Cadastro" />

      <Form>
        <Fields>
          <InputForm control={control} name="name" placeholder="Nome" />
          <InputForm control={control} name="amount" placeholder="Preço" />

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

        <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
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
