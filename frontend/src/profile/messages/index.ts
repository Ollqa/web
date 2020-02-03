import { defineMessages } from 'react-intl';

const namespace: string = '@aunited/profile';

export default defineMessages({
  title: {
    id: `${namespace}.title`,
    defaultMessage: 'Редактировать профиль'
  },
  lastName: {
    id: `${namespace}.lastName`,
    defaultMessage: 'Фамилия'
  },
  firstName: {
    id: `${namespace}.firstName`,
    defaultMessage: 'Имя'
  },
  enterLastName: {
    id: `${namespace}.enterLastName`,
    defaultMessage: 'Введите фамилию'
  },
  enterFirstName: {
    id: `${namespace}.enterFirstName`,
    defaultMessage: 'Введите имя'
  },
  save: {
    id: `${namespace}.save`,
    defaultMessage: 'Сохранить'
  },
  back: {
    id: `${namespace}.back`,
    defaultMessage: 'Назад'
  }
});
