export const up = async (queryInterface, Sequelize) => {
  const tables = await queryInterface.showAllTables();
  if (!tables.includes('feedbacks')) return;
  const tableDesc = await queryInterface.describeTable('feedbacks');
  if (tableDesc.tags) return;

  await queryInterface.addColumn("feedbacks", "tags", {
    type: Sequelize.JSONB, allowNull: true, defaultValue: [],
  });
};

export const down = async (queryInterface) => {
  await queryInterface.removeColumn("feedbacks", "tags");
};
