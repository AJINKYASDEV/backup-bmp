export const up = async (queryInterface, Sequelize) => {
  const tables = await queryInterface.showAllTables();
  if (!tables.includes('booking')) return;
  const tableDesc = await queryInterface.describeTable('booking');

  const cols = {
    pickup_otp_generated_at:   { type: Sequelize.DATE, allowNull: true },
    pickup_otp_attempts:       { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
    pickup_verified_at:        { type: Sequelize.DATE, allowNull: true },
    delivery_otp_generated_at: { type: Sequelize.DATE, allowNull: true },
    delivery_otp_attempts:     { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
    delivered_at:              { type: Sequelize.DATE, allowNull: true },
    pickup_otp_locked_until:   { type: Sequelize.DATE, allowNull: true },
    delivery_otp_locked_until: { type: Sequelize.DATE, allowNull: true },
  };

  for (const [col, def] of Object.entries(cols)) {
    if (!tableDesc[col]) {
      await queryInterface.addColumn('booking', col, def);
    }
  }
};

export const down = async (queryInterface) => {
  const cols = ['pickup_otp_generated_at','pickup_otp_attempts','pickup_verified_at',
    'delivery_otp_generated_at','delivery_otp_attempts','delivered_at',
    'pickup_otp_locked_until','delivery_otp_locked_until'];
  for (const col of cols) await queryInterface.removeColumn('booking', col);
};
