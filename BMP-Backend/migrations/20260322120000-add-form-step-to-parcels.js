export const up = async (queryInterface, Sequelize) => {
  const tables = await queryInterface.showAllTables();
  if (!tables.includes('parcel')) return;
  const tableDesc = await queryInterface.describeTable('parcel');

  if (!tableDesc.form_step) {
    await queryInterface.addColumn('parcel', 'form_step', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });
  }
  if (!tableDesc.selected_acceptance_id) {
    await queryInterface.addColumn('parcel', 'selected_acceptance_id', {
      type: Sequelize.UUID,
      allowNull: true,
    });
  }
};

export const down = async (queryInterface) => {
  await queryInterface.removeColumn('parcel', 'selected_acceptance_id');
  await queryInterface.removeColumn('parcel', 'form_step');
};
