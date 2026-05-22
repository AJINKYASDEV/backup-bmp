export const up = async (queryInterface, Sequelize) => {
  const tables = await queryInterface.showAllTables();
  if (!tables.includes('booking')) return;
  const tableDesc = await queryInterface.describeTable('booking');

  if (!tableDesc.pickup_otp) {
    await queryInterface.addColumn('booking', 'pickup_otp', { type: Sequelize.STRING(4), allowNull: true });
  }
  if (!tableDesc.delivery_otp) {
    await queryInterface.addColumn('booking', 'delivery_otp', { type: Sequelize.STRING(4), allowNull: true });
  }
};

export const down = async (queryInterface) => {
  await queryInterface.removeColumn('booking', 'pickup_otp');
  await queryInterface.removeColumn('booking', 'delivery_otp');
};
