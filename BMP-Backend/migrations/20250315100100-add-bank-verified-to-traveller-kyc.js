export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('traveller_kyc', 'bank_verified', {
    type: Sequelize.BOOLEAN,
    allowNull: true,   // ✅ allows NULL (blank)
    defaultValue: null // optional but keeps it clean
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('traveller_kyc', 'bank_verified');
}