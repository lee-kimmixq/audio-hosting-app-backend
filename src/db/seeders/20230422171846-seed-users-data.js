const getHash = require('../../utils')

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        id: '57c22e14-c378-48bf-aafe-4628ccc7ce9f',
        username: 'Dummy Boy',
        password: getHash('dummyboy'),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null)
  },
}
