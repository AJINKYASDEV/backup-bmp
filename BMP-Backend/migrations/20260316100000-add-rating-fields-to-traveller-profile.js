export const up = async (queryInterface, Sequelize) => {
  // Skip if traveller_profiles table doesn't exist yet (created by model sync)
  const tables = await queryInterface.showAllTables();
  if (!tables.includes('traveller_profiles')) {
    console.log('ℹ️  traveller_profiles table not found — skipping (will be created by model sync)');
    return;
  }

  const tableDesc = await queryInterface.describeTable('traveller_profiles');

  if (!tableDesc.rating) {
    await queryInterface.addColumn('traveller_profiles', 'rating', {
      type: Sequelize.DECIMAL(2, 1),
      defaultValue: 4.8,
      allowNull: false,
    });
  }

  if (!tableDesc.total_deliveries) {
    await queryInterface.addColumn('traveller_profiles', 'total_deliveries', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    });
  }

  if (!tableDesc.profile_photo) {
    await queryInterface.addColumn('traveller_profiles', 'profile_photo', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.removeColumn('traveller_profiles', 'rating');
  await queryInterface.removeColumn('traveller_profiles', 'total_deliveries');
  await queryInterface.removeColumn('traveller_profiles', 'profile_photo');
};