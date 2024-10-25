// import { DataTypes, Model } from 'sequelize';
// import { sequelize } from '../config/database';

// export class Person extends Model {
//     public id!: string;
//     public name!: string;
//     public document!: string;
//     public password!: string;
//     public readonly createdAt!: Date;
//     public readonly updatedAt!: Date;
// }

// Person.init(
//     {
//         id: {
//             type: DataTypes.UUID,
//             defaultValue: DataTypes.UUIDV4,
//             primaryKey: true,
//         },
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         document: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//     },
//     {
//         sequelize, 
//         tableName: 'persons',
//         timestamps: true,
//     }
// );
