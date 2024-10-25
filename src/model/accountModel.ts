// import { Model, DataTypes } from 'sequelize';
// import { sequelize } from '../config/database'; 

// export class Account extends Model {
//     public id!: string;
//     public branch!: string;
//     public account!: string;
//     public userId!: string;  
//     public readonly createdAt!: Date;
//     public readonly updatedAt!: Date;
// }

// Account.init(
//     {
//         id: {
//             type: DataTypes.UUID,
//             defaultValue: DataTypes.UUIDV4,
//             primaryKey: true,
//         },
//         branch: {
//             type: DataTypes.STRING(3),
//             allowNull: false,
//         },
//         account: {
//             type: DataTypes.STRING(9), 
//             allowNull: false,
//             unique: true,
//         },
//         userId: {
//             type: DataTypes.UUID,
//             allowNull: false,
//         },
//     },
//     {
//         sequelize,
//         tableName: 'accounts',
//         timestamps: true,
//     }
// );
