import Sequelize from 'sequelize';

export default ({ config, db }) => {
  /**
   * Model
   */
  const Model = db.define('config', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    key: {
      type: Sequelize.STRING,
    },
    value: {
      type: Sequelize.STRING,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()'),
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()'),
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  const findAll = () => Model.findAll();
  const findOne = (id) => Model.findOne({ where: { id } });
  const create = (config) => Model.create(config);

  return {
    Model,
    queries: {
      findAll,
      findOne,
      create,
    },
  };
};