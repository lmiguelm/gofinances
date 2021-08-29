import React from 'react';
import { FlatList } from 'react-native';

import { Header } from '../../components/Header';
import { Button } from '../../components/Form/Button';
import { categories } from '../../utils/categories';

import { Container, Category, Icon, Name, Separator, Footer } from './styles';

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({ category, closeSelectCategory, setCategory }: Props) {
  function handleCategorySelect(item: Category) {
    setCategory(item);
  }

  return (
    <Container>
      <Header title="Categoria" />

      <FlatList
        data={categories}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category onPress={() => handleCategorySelect(item)} isActive={category.key === item.key}>
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
        style={{ flex: 1, width: '100%' }}
      />

      <Footer>
        <Button onPress={closeSelectCategory} title="Selecionar" />
      </Footer>
    </Container>
  );
}
