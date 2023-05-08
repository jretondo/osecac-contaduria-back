import { Columns, Restrictions, Tables } from './../constant/TABLES';
import { IBankStatements } from './../interfaces/Tables';
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';
import Admin from './Admin';
import MovementType from './MovementType';
import BookBank from './BookBank';

type BankStatementsCreationAttributes = Optional<IBankStatements, "id">;

class BankStatement extends Model<IBankStatements, BankStatementsCreationAttributes>{ }

BankStatement.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    date: {
        type: DataTypes.DATE
    },
    receipt_number: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.STRING
    },
    concept: {
        type: DataTypes.STRING
    },
    observations: {
        type: DataTypes.TEXT("long")
    },
    amount: {
        type: DataTypes.DOUBLE
    },
    reconciled: {
        type: DataTypes.BOOLEAN
    },
    closed: {
        type: DataTypes.BOOLEAN
    },
    movement_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize,
    timestamps: true,
    tableName: Tables.BANK_STATEMENTS
})

BankStatement.hasMany(Admin, {
    foreignKey: Columns.admin.id,
    sourceKey: Columns.bankStatements.user_id,
    onDelete: Restrictions.SET_NULL,
    onUpdate: Restrictions.CASCADE
})

Admin.belongsTo(BankStatement, {
    foreignKey: Columns.admin.id,
    targetKey: Columns.bankStatements.user_id
})

BankStatement.hasMany(MovementType, {
    foreignKey: Columns.movementsType.id,
    sourceKey: Columns.bankStatements.movement_type_id,
    onDelete: Restrictions.SET_NULL,
    onUpdate: Restrictions.CASCADE
})

MovementType.belongsTo(BankStatement, {
    foreignKey: Columns.movementsType.id,
    targetKey: Columns.bankStatements.movement_type_id
})

BankStatement.hasMany(BookBank, {
    foreignKey: Columns.bookBank.id,
    sourceKey: Columns.bankStatements.book_id,
    onDelete: Restrictions.SET_NULL,
    onUpdate: Restrictions.CASCADE
})

BookBank.belongsTo(BankStatement, {
    foreignKey: Columns.bookBank.id,
    targetKey: Columns.bankStatements.book_id
})

BankStatement.sync({ alter: true })

export = BankStatement