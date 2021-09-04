import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';

import { TRANSACTIONS_COLLECTION } from '../../config/storage';

import { Header } from '../../components/Header';
import { HistoryCard } from '../../components/HistoryCard';

import { ChartContainer, Container, Content } from './styles';
import { categories } from '../../utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

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
  total: number;
  totalFormated: string;
  color: string;
  percent: string;
}

export function Resume() {
  const { colors } = useTheme();

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

    const expensiveTotal = expensives.reduce((acumullator: number, expensive: TransactionData) => {
      return acumullator + Number(expensive.amount);
    }, 0);

    const totalByCategorie: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const percent = `${((categorySum / expensiveTotal) * 100).toFixed(0)}%`;

        totalByCategorie.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          percent,
          totalFormated: categorySum.toLocaleString('pt-BR', {
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
        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            x="percent"
            y="total"
            colorScale={totalByCategories.map((category) => category.color)}
            labelRadius={50}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: colors.shape,
              },
            }}
          />
        </ChartContainer>

        {totalByCategories.map((category) => (
          <HistoryCard
            key={category.key}
            title={category.name}
            amount={category.totalFormated}
            color={category.color}
          />
        ))}
      </Content>
    </Container>
  );
}
