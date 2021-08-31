import React, { useState } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import uuid from 'react-native-uuid';

import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { Header } from '../../components/Header';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import { Category, CategorySelect } from '../CategorySelect';

import { Container, Fields, Form, TransactionsTypes } from './styles';
import { InputForm } from '../../components/Form/InputForm/indes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TRANSACTIONS_COLLECTION } from '../../config/storage';

import { useNavigation } from '@react-navigation/native';

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number()
    .typeError('Informe um valor númerico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório'),
});

export function Register() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigation = useNavigation<any>();

  const [transactionType, setTransactionType] = useState<'up' | 'down'>();
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [hasErrorCategory, setHasErrorCategory] = useState<boolean>(false);

  const [category, setCategory] = useState<Category>({
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

  function handleSelectCategory(category: Category) {
    setHasErrorCategory(false);
    setCategory(category);
  }

  async function handleRegister(form: FormData) {
    const errorTitle = 'Campo obrigatório não informado';

    if (!transactionType) {
      return Alert.alert(errorTitle, 'Selecione o tipo da transação');
    }

    if (category.key === 'category') {
      setHasErrorCategory(true);
      return Alert.alert(errorTitle, 'Selecione uma categoria');
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      transactionType,
      category,
      date: new Date(),
    };

    try {
      const transactions = await AsyncStorage.getItem(TRANSACTIONS_COLLECTION);
      const currentTransactions = transactions ? JSON.parse(transactions) : [];

      const transactionsFormated = [...currentTransactions, newTransaction];

      await AsyncStorage.setItem(TRANSACTIONS_COLLECTION, JSON.stringify(transactionsFormated));

      setTransactionType(undefined);
      setCategory({
        key: 'category',
        name: 'Categoria',
      });
      reset();

      navigation.navigate('Listagem');
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível salvar');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header title="Cadastro" />

        <Form>
          <Fields>
            <InputForm
              control={control}
              name="name"
              placeholder="Nome"
              autoCorrect={false}
              autoCapitalize="sentences"
              error={errors.name && errors.name.message}
            />

            <InputForm
              control={control}
              name="amount"
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

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

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
              error={hasErrorCategory}
            />
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
            setCategory={handleSelectCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
