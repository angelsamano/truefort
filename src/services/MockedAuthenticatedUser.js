const MockedAuthenticatedUser = {
  app: 'truefort.grid',

  username: 'angelsamano',
  email: 'angelsamano@truefort.com',
  status: 'REGISTERED',
  createdOn: new Date(),
  admin: true,
  active: true,
  permissions: [1],
  name: {
    first: 'Angel',
    last: 'Samano'
  }
};

export default Object.freeze(MockedAuthenticatedUser);
export const defaultGrid = [
  { userId: 'admin', firstName: 'Admin', lastName: 'User', email: 'support@cixsoft.com', status: 'REGISTERED', createdOn: 'Thu Apr 14 2022 01:23:04 GMT-0400 (Eastern Daylight Time)' },
  { userId: 'megray', firstName: 'Meg', lastName: 'Ray', email: 'meg@fas.com', status: 'INITIATED', createdOn: 'Tue May 24 2022 14:03:45 GMT-0400 (Eastern Daylight Time)' },
  { userId: 'tomh', firstName: 'Tom', lastName: 'H', email: 'tom@test.com', status: 'INITIATED', createdOn: 'Tue May 24 2022 14:02:45 GMT-0400 (Eastern Daylight Time)' },
];