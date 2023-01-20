import { getRandomArrayElement } from '../utils.js';
import { POINTS_TYPE } from '../const.js';
import { nanoid } from 'nanoid';

const mockPoints = [
  {
    'basePrice': 120,
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': 'Amsterdam',
    'id': 1,
    'offers': [1, 2],
    'type': getRandomArrayElement(POINTS_TYPE),
  },

  {
    'basePrice': 80,
    'dateFrom': '2011-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': 'Chamonix',
    'id': 2,
    'offers': [1, 2],
    'type': getRandomArrayElement(POINTS_TYPE),
  },
  {
    'basePrice': 30,
    'dateFrom': '2013-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': 'Geneva',
    'id': 3,
    'offers': [1],
    'type': getRandomArrayElement(POINTS_TYPE),
  },
  {
    'basePrice': 200,
    'dateFrom': '2016-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': 'Geneva',
    'id': 4,
    'offers': [1, 2, 3],
    'type': getRandomArrayElement(POINTS_TYPE),
  },
  {
    'basePrice': 455,
    'dateFrom': '2022-07-10T22:55:56.845Z',
    'dateTo': '2031-07-11T11:22:13.375Z',
    'destination': 'Amsterdam',
    'id': 5,
    'offers': [1],
    'type': getRandomArrayElement(POINTS_TYPE),
  }
];

const mockOffers = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': 1,
        'title': 'taxi - offer 1',
        'price': 50
      },
      {
        'id': 2,
        'title': 'taxi - offer 2',
        'price': 80
      },
      {
        'id': 3,
        'title': 'taxi - offer 3',
        'price': 30
      }
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': 1,
        'title': 'flight - offer 1',
        'price': 50
      },
      {
        'id': 2,
        'title': 'flight - offer 2',
        'price': 80
      },
      {
        'id': 3,
        'title': 'flight - offer 3',
        'price': 25
      }
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': 1,
        'title': 'train - offer 1',
        'price': 50
      },
      {
        'id': 2,
        'title': 'train - offer 2',
        'price': 80
      },
      {
        'id': 3,
        'title': 'train - offer 3',
        'price': 25
      }
    ]
  },

  {
    'type': 'ship',
    'offers': [
      {
        'id': 1,
        'title': 'ship - offer 1',
        'price': 50
      },
      {
        'id': 2,
        'title': 'ship - offer 2',
        'price': 80
      },
      {
        'id': 3,
        'title': 'ship - offer 3',
        'price': 25
      }
    ]
  },

  {
    'type': 'check-in',
    'offers': [
      {
        'id': 1,
        'title': 'check-in - offer 1',
        'price': 50
      },
      {
        'id': 2,
        'title': 'check-in - offer 2',
        'price': 80
      },
      {
        'id': 3,
        'title': 'check-in - offer 3',
        'price': 25
      }
    ]
  },

  {
    'type': 'bus',
    'offers': [
      {
        'id': 1,
        'title': 'bus - offer 1',
        'price': 50
      },
      {
        'id': 2,
        'title': 'bus - offer 2',
        'price': 80
      },
      {
        'id': 3,
        'title': 'bus - offer 3',
        'price': 25
      }
    ]
  },

  {
    'type': 'drive',
    'offers': [
      {
        'id': 1,
        'title': 'drive - offer 1',
        'price': 50
      },
      {
        'id': 2,
        'title': 'drive - offer 2',
        'price': 80
      },
      {
        'id': 3,
        'title': 'drive - offer 3',
        'price': 25
      }
    ]
  },

  {
    'type': 'sightseeing',
    'offers': [
      {
        'id': 1,
        'title': 'sightseeing - offer 1',
        'price': 50
      },
      {
        'id': 2,
        'title': 'sightseeing - offer 2',
        'price': 80
      },
      {
        'id': 3,
        'title': 'sightseeing - offer 3',
        'price': 25
      }
    ]
  },

  {
    'type': 'restaurant',
    'offers': [
      {
        'id': 1,
        'title': 'restaurant - offer 1',
        'price': 50
      },
      {
        'id': 2,
        'title': 'restaurant - offer 2',
        'price': 80
      },
      {
        'id': 3,
        'title': 'restaurant - offer 3',
        'price': 25
      }
    ]
  }
];

const mockDestinations = [
  {
    'id': 1,
    'description': 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    'name': 'Geneva',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.0762563005163317',
        'description': 'Geneva is a gorgeous city, one that’s filled with mountains of chocolate.'
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
    'description': 'Amsterdam is known for its artistic heritage, elaborate canal system and narrow houses with gabled facades, legacies of the city’s 17th-century Golden Age.',
    'name': 'Amsterdam',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.0762563005163317',
        'description': 'View of the city centre looking southwest from the Oosterdokskade'
      }
    ]
  }
];

function getRandomPoint() {
  return {
    ...getRandomArrayElement(mockPoints),
    id: nanoid(),
  };
}

export {getRandomPoint, mockOffers, mockDestinations};
