import { faker } from '@faker-js/faker';

const STATUS_ON_DECK = { id: 1, name: 'On Deck' };
const STATUS_IN_PROGRESS = {
  id: 2,
  name: 'In Progress',
};
const STATUS_TESTING = { id: 3, name: 'Testing' };
const STATUS_DEPLOYED = { id: 4, name: 'Deployed' };

export const STATUSES = [
  STATUS_ON_DECK,
  STATUS_IN_PROGRESS,
  STATUS_TESTING,
  STATUS_DEPLOYED,
];

const existingNotes = [
  'This is a note',
  'Use Jest',
  'Remove old data',
  'Add JS Docs to all endpoints',
  'Upgrade React & Chakra UI',
];

// const DATA = [
//   {
//     task: 'Add a New Feature',

//     due: new Date('2023/10/15'),
//     notes: 'This is a note',
//   },
//   {
//     task: 'Write Integration Tests',

//     due: new Date('2023/09/12'),
//     notes: 'Use Jest',
//   },
//   {
//     task: 'Add Instagram Integration',

//     due: new Date('2023/09/12'),
//     notes: '',
//   },
//   {
//     task: 'Cleanup Database',

//     due: new Date('2023/02/15'),
//     notes: 'Remove old data',
//   },
//   {
//     task: 'Refactor API Endpoints',

//     due: new Date('2023/09/12'),
//     notes: '',
//   },
//   {
//     task: 'Add Documentation to API',

//     due: new Date('2023/09/12'),
//     notes: 'Add JS Docs to all endpoints',
//   },
//   {
//     task: 'Update NPM Packages',

//     due: new Date('2023/09/12'),
//     notes: 'Upgrade React & Chakra UI',
//   },
// ];

const generateRandomData = () => {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      task: faker.hacker.verb() + ' ' + faker.hacker.noun(),
      status: faker.helpers.arrayElement(STATUSES),
      due: faker.datatype.boolean() ? faker.date.soon(90) : null,
      notes: existingNotes[i % existingNotes.length],
    });
  }
  return data;
};

const DATA = generateRandomData();

export default DATA;
