"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Account extends sequelize_1.Model {
}
exports.Account = Account;
Account.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    branch: {
        type: sequelize_1.DataTypes.STRING(3),
        allowNull: false,
    },
    account: {
        type: sequelize_1.DataTypes.STRING(9),
        allowNull: false,
        unique: true,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'accounts',
    timestamps: true,
});
