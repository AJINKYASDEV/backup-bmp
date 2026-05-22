export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable("parcel_acceptances", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    parcel_request_id: {
      type: Sequelize.UUID,
      allowNull: false,
      unique: true,
      // FK to parcel_requests — enforced at app level
    },
    parcel_id: {
      type: Sequelize.UUID,
      allowNull: false,
      // FK to parcel table — enforced at app level; parcel table created by model sync
    },
    traveller_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    accepted_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    acceptance_price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  });

  await queryInterface.addIndex("parcel_acceptances", ["parcel_id"], {
    name: "idx_parcel_acceptances_parcel_id",
  });
  await queryInterface.addIndex("parcel_acceptances", ["traveller_id"], {
    name: "idx_parcel_acceptances_traveller_id",
  });
  await queryInterface.addIndex("parcel_acceptances", ["parcel_request_id"], {
    name: "idx_parcel_acceptances_parcel_request_id",
  });
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable("parcel_acceptances");
};
