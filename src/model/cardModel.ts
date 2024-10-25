// src/model/cardModel.ts

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database'; 

export class Card extends Model {
    public id!: string;
    public type!: string;
    public number!: string;
    public cvv!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public accountId!: string; // Adicione esta linha se não estiver presente
}

// Defina o modelo
Card.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cvv: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    accountId: { // Garanta que este campo esteja definido corretamente
        type: DataTypes.UUID, // Ou o tipo correto que você está usando
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'cards', // Nome da tabela no banco de dados
});
