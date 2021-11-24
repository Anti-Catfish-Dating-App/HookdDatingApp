const Sequelize = require("sequelize")
const db = require("../db")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Users = db.define("user", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    // validate: {
    //   is: /^[0-9a-f]{64}$/i,
    // },
  },
  gender: {
    type: Sequelize.STRING,
    // type: Sequelize.ENUM({
    //   values: ["Male", "Female", "Non-Binary"],
    // }),
  },
  age: {
    type: Sequelize.INTEGER,
    validate: {
      min: 18,
      max: 99,
    },
  },
  bio: {
    type: Sequelize.STRING,
  },
  baselinePhoto: {
    type: Sequelize.STRING,
  },
  lastTimeVerified: {
    type: Sequelize.DATE,
    validate: {
      isDate: true,
    },
  },
  isVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
})

module.exports = Users

Users.prototype.correctPassword = function (candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
}

Users.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
}

Users.authenticate = async function({ email, password }) {
  const user = await this.findOne({ where: {email}});
  if(!user || !(await user.correctPassword(password))){
    const error = Error('Incorrect email/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
}

Users.findByToken = async function(token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = Users.findByPk(id);
    if(!user){
      throw 'its broke';
    }
  } catch (ex) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
}

const hashPassword = async (user) => {
  if(user.changed('password')){
    user.password = await bcrypt.hash(user.password, 10);
  }
}

Users.beforeCreate(hashPassword);
Users.beforeUpdate(hashPassword);
Users.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
