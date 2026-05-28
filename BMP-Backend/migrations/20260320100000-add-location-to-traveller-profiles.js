export const up = async (queryInterface, Sequelize) => {
  const tables = await queryInterface.showAllTables();
  if (!tables.includes('traveller_profiles')) return;
  const tableDesc = await queryInterface.describeTable('traveller_profiles');

  if (!tableDesc.last_known_location) {
    await queryInterface.addColumn('traveller_profiles', 'last_known_location', {
      type: Sequelize.GEOMETRY('POINT'),
      allowNull: true,
    });
  }
};

export const down = async (queryInterface) => {
  await queryInterface.removeColumn('traveller_profiles', 'last_known_location');
};
