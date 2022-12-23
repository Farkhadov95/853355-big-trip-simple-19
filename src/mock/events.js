import { getRandomArrayElement } from '../utils.js';
import { POINTS_TYPE } from '../const.js';

const mockPoints = [
  {
    'basePrice': 120,
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
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
    'basePrice': 80,
    'dateFrom': '2011-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
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
    'basePrice': 30,
    'dateFrom': '2013-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
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
    'basePrice': 200,
    'dateFrom': '2016-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
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
    'basePrice': 455,
    'dateFrom': '2022-07-10T22:55:56.845Z',
    'dateTo': '2031-07-11T11:22:13.375Z',
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
      }],
    'type': getRandomArrayElement(POINTS_TYPE),
  }
];

const points = [
  {
    'type': 'taxi',
    'offers': [1]
  },
  {
    'type': 'flight',
    'offers': [1]
  },
  {
    'type': 'hotel',
    'offers': [1]
  },
];

const offers = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': 1,
        'title': 'Upgrade to a business class',
        'price': 50
      },
      {
        'id': 2,
        'title': 'Upgrade to a Van',
        'price': 80
      },
      {
        'id': 3,
        'title': 'Upgrade to a comfort class',
        'price': 30
      }
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': 1,
        'title': 'Upgrade to a business class',
        'price': 50
      },
      {
        'id': 2,
        'title': 'Switch to comfort',
        'price': 80
      },
      {
        'id': 3,
        'title': 'Add luggage',
        'price': 25
      }
    ]
  },
  {
    'type': 'hotel',
    'offers': [
      {
        'id': 1,
        'title': 'Upgrade to a business class',
        'price': 50
      },
      {
        'id': 2,
        'title': 'King size bed',
        'price': 80
      },
      {
        'id': 3,
        'title': 'Add separate bed',
        'price': 25
      }
    ]
  },
];

const mockDestinations = [
  {
    'id': 1,
    'description': 'Leipzig, is a beautiful city, a true asian pearl.',
    'name': 'Leipzig',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.0762563005163317',
        'description': 'Chamonix parliament building'
      }
    ]
  },
  {
    'id': 2,
    'description': 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    'name': 'Chamonix',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.0762563005163317',
        'description': 'Chamonix parliament building'
      }
    ]
  },
  {
    'id': 3,
    'description': 'Johannesburg, is a beautiful city with crowded streets.',
    'name': 'Johannesburg',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.0762563005163317',
        'description': 'Chamonix parliament building'
      }
    ]
  }
];

const getRandomPoint = () => getRandomArrayElement(mockPoints);

export {getRandomPoint};
