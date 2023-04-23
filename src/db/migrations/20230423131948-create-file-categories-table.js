module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('file_categories', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      file_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'files',
          key: 'id',
        },
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('file_categories')
  },
}
