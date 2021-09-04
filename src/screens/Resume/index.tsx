import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TRANSACTIONS_COLLECTION } from '../../config/storage';

import { Header } from '../../components/Header';
import { HistoryCard } from '../../components/HistoryCard';

import { Container, Content } from './styles';
import { categories } from '../../utils/categories';

interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const response = await AsyncStorage.getItem(TRANSACTIONS_COLLECTION);
    const responseFormated = response ? JSON.parse(response) : [];

    const expensives = responseFormated.filter(
      (expensive: TransactionData) => expensive.type === 'negative'
    );

    const totalByCategorie: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        totalByCategorie.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
        });
      }
    });

    setTotalByCategories(totalByCategorie);
  }

  return (
    <Container>
      <Header title="Resumo por categoria" />

      <Content>
        {totalByCategories.map((category) => (
          <HistoryCard
            key={category.key}
            title={category.name}
            amount={category.total}
            color={category.color}
          />
        ))}
      </Content>
    </Container>
  );
}
