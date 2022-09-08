const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('diet', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey : true,
        unique : true,
        defaultValue: DataTypes.UUIDV4
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    }
  });
};
