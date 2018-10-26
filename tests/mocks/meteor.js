import SimpleSchema from 'simpl-schema'

const collection = {
  allow: jest.fn(),
  deny: jest.fn(),
  attachSchema: jest.fn(),
  simpleSchema: jest.fn().mockImplementation(
    () =>
      new SimpleSchema({
        _id: {
          type: String,
        },
        status: {
          type: String,
        },
      }),
  ),
  helpers: jest.fn(),
  after: {
    insert: jest.fn(),
    update: jest.fn(),
  },
}

module.exports = {
  Meteor: {
    Collection: jest.fn().mockImplementation(() => collection),
    userId: jest.fn(() => 'wa0'),
    users: collection,
  },
}
