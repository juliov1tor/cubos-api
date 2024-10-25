"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Person extends sequelize_1.Model {
}
exports.Person = Person;
Person.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    document: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'persons',
    timestamps: true,
});
