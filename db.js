// JavaScript source code
import { Sequelize, DataTypes, Model } from 'sequelize';
import 'dotenv/config'
class Envelope extends Model { }
class Transaction extends Model { }

export const sequelize = new Sequelize(
    process.env.DATABASE_URL,
    {
        port: 5432,
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized : false
            }
        }
    }
);

Envelope.init(
    {
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull : false
        },
        budget: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        spent: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        balance: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Envelope',
        tableName: 'envelopes',
        timestamps: false,
        hooks: {
            beforeValidate: (envelope) => {
                const budget = Number(envelope.budget) || 0
                const spent = Number(envelope.spent) || 0

                envelope.spent = spent
                envelope.balance = budget - spent
            }
        }
    }
);

Transaction.init(
    {
        envelope_name: {
            type: DataTypes.STRING,
            references: {
                model: Envelope,
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

export { Envelope, Transaction }