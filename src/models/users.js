const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNULL: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNULL: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNULL: false,
    unique: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNULL: false,
    defaultValue: "Pendiente"
  },
  confirmationCode: {
    type: DataTypes.STRING,
    allowNULL: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNULL: false,
  }
}, {
  hooks: {
    beforeCreate: (user) => {
      if(user.password) {
        const salt = bcrypt.genSaltSync(10)
        user.password = bcrypt.hashSync(user.password, salt)
      }
    },
    beforeUpdate: (user) => {
      if(user.password) {
        const salt = bcrypt.genSaltSync(10)
        user.password = bcrypt.hashSync(user.password, salt)
      }
    }
  },
})
