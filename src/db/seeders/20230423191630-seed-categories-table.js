module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('categories', [
      {
        id: '8d946314-b560-4a3e-be65-6d6f1b3ca46e',
        name: 'Music',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'df0c67dd-37d8-4dda-80cd-1d2b08cd20fb',
        name: 'Random',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '3c001b74-9776-4be7-a010-8cec0c5c1be1',
        name: 'Noise',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('categories', null)
  },
}
