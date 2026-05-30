/** @type {import('sequelize').QueryInterface} */
export async function up(queryInterface, Sequelize) {
  const tables = await queryInterface.showAllTables();
  // Model uses freezeTableName: true, so table is "parcel" (singular), not "parcels"
  if (!tables.includes('parcel')) return;
  const tableDesc = await queryInterface.describeTable('parcel');

  if (!tableDesc.pickup_date) {
    await queryInterface.addColumn('parcel', 'pickup_date', {
      type: Sequelize.DATEONLY,
      allowNull: true,
      defaultValue: null,
    });
    console.log('✅ Added parcel.pickup_date');
  } else {
    console.log('[Migration] parcel.pickup_date already exists — skipping');
  }

  if (!tableDesc.pickup_time) {
    await queryInterface.addColumn('parcel', 'pickup_time', {
      type: Sequelize.TIME,
      allowNull: true,
      defaultValue: null,
    });
    console.log('✅ Added parcel.pickup_time');
  } else {
    console.log('[Migration] parcel.pickup_time already exists — skipping');
  }
}

export async function down(queryInterface) {
  await queryInterface.removeColumn('parcel', 'pickup_time');
  await queryInterface.removeColumn('parcel', 'pickup_date');
}
