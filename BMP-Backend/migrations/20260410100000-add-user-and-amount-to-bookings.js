export const up = async (queryInterface, Sequelize) => {
  const tables = await queryInterface.showAllTables();
  if (!tables.includes('booking')) return;
  const tableDesc = await queryInterface.describeTable('booking');

  if (!tableDesc.user_id) {
    await queryInterface.addColumn("booking", "user_id", { type: Sequelize.UUID, allowNull: true });
  }
  if (!tableDesc.amount) {
    await queryInterface.addColumn("booking", "amount", { type: Sequelize.DECIMAL(10, 2), allowNull: true });
  }
};

export const down = async (queryInterface) => {
  try {
    await queryInterface.removeConstraint("booking", "booking_user_id_fk");
  } catch (err) {
    console.log("Constraint might not exist:", err.message);
  }

  await queryInterface.removeColumn("booking", "user_id");
  await queryInterface.removeColumn("booking", "amount");
};
