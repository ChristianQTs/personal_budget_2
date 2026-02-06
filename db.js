// JavaScript source code
import { Sequelize, DataTypes, Model } from 'sequelize';

export class Envelope extends Model { }
export class Transaction extends Model { }

export const sequelize = new Sequelize(
    'personal_budget',
    'postgres',
    'postgres',
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
        logging: false
    }
);

Envelope.init(
    {
        name: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        budget: {
            type: DataTypes.FLOAT
        },
        spent: {
            type: DataTypes.FLOAT
        },
        balance: {
            type: DataTypes.FLOAT
        }
    },
    {
        sequelize,
        modelName: 'Envelope',
        tableName: 'envelopes',
        timestamps: false
    }
);

Transaction.init(
    {
        envelope_name: {
            type: DataTypes.STRING,
            references: {
                model: 'Envelope',
                key : 'name'
            }
        },
        amount: {
            type : DataTypes.FLOAT
        },
        recipient: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATE
        }

    },

    {
        sequelize,
        modelName: 'Transaction',
        tableName: 'transactions',
        timestamps: false
    }

)