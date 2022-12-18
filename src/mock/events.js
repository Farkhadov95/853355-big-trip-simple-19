import { getRandomArrayElement } from '../utils.js';
import { POINTS_TYPE } from '../const.js';

const mockPoints = [
  {
    'base_price': 120,
    'date_from': '2019-07-10T22:55:56.845Z',
    'date_to': '2019-07-11T11:22:13.375Z',
    'destination': 'Amsterdam',
    'id': '0',
    'offers': [
      {
        title: 'Add breakfast ',
        price: '50'
      },
      {
        title: 'Rent a car',
        price: '200'
      }
    ],
    'type': getRandomArrayElement(POINTS_TYPE),
  },

  {
    'base_price': 80,
    'date_from': '2011-07-10T22:55:56.845Z',
    'date_to': '2019-07-11T11:22:13.375Z',
    'destination': 'Chamonix',
    'id': '0',
    'offers': [
      {
        title: 'Rent a car',
        price: '200'
      }
    ],
    'type': getRandomArrayElement(POINTS_TYPE),
  },
  {
    'base_price': 30,
    'date_from': '2013-07-10T22:55:56.845Z',
    'date_to': '2019-07-11T11:22:13.375Z',
    'destination': 'Geneva',
    'id': '0',
    'offers': [
      {
        title: 'Switch to comfort',
        price: '80'
      },
      {
        title: 'Rent a car',
        price: '200'
      }
    ],
    'type': getRandomArrayElement(POINTS_TYPE),
  },
  {
    'base_price': 200,
    'date_from': '2016-07-10T22:55:56.845Z',
    'date_to': '2019-07-11T11:22:13.375Z',
    'destination': 'Geneva',
    'id': '0',
    'offers': [
      {
        title: 'Add luggage',
        price: '50'
      }
    ],
    'type': getRandomArrayElement(POINTS_TYPE),
  },
  {
    'base_price': 455,
    'date_from': '2022-07-10T22:55:56.845Z',
    'date_to': '2031-07-11T11:22:13.375Z',
    'destination': 'Amsterdam',
    'id': '0',
    'offers': [
      {
        title: 'Order Uber',
        price: '20'
      }
    ],
    'type': getRandomArrayElement(POINTS_TYPE),
  }
];

const getRandomPoint = () => getRandomArrayElement(mockPoints);

export {getRandomPoint};
