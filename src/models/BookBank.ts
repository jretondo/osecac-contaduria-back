import { Columns, Restrictions, Tables } from './../constant/TABLES';
import { IBookBank } from './../interfaces/Tables';
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';
import Admin from './Admin';
import ReceiptType from './ReceiptType';
import MovementType from './MovementType';
import Dossier from './Dossier';

type BookBankCreationAttributes = Optional<IBookBank, "id">;

class BookBank extends Model<IBookBank, BookBankCreationAttributes>{ }

BookBank.init({
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
    debit: {
        type: DataTypes.DOUBLE
    },
    credit: {
        type: DataTypes.DOUBLE
    },
    local_tax: {
        type: DataTypes.DOUBLE
    },
    incomes_tax: {
        type: DataTypes.DOUBLE
    },
    system_pending_amount: {
        type: DataTypes.DOUBLE
    },
    payment_order: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.STRING(150)
    },
    observations: {
        type: DataTypes.TEXT("long")
    },
    canceled: {
        type: DataTypes.BOOLEAN
    },
    reconciled: {
        type: DataTypes.BOOLEAN
    },
    closed: {
        type: DataTypes.BOOLEAN
    },
    receipt_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    canceled_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    dossier_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER
    },
}, {
    sequelize,
    timestamps: true,
    tableName: Tables.BOOK_BANK
})

BookBank.hasMany(Admin, {
    foreignKey: Columns.admin.id,
    sourceKey: Columns.bookBank.user_id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

Admin.belongsTo(BookBank, {
    foreignKey: Columns.admin.id,
    targetKey: Columns.bookBank.user_id
})

BookBank.hasMany(ReceiptType, {
    foreignKey: Columns.receiptTypes.id,
    sourceKey: Columns.bookBank.receipt_type_id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

ReceiptType.belongsTo(BookBank, {
    foreignKey: Columns.receiptTypes.id,
    targetKey: Columns.bookBank.receipt_type_id
})

BookBank.hasMany(BookBank, {
    foreignKey: Columns.bookBank.id,
    sourceKey: Columns.bookBank.canceled_id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

BookBank.belongsTo(BookBank, {
    foreignKey: Columns.bookBank.id,
    targetKey: Columns.bookBank.canceled_id
})

BookBank.hasMany(MovementType, {
    foreignKey: Columns.movementsType.id,
    sourceKey: Columns.bookBank.user_id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

MovementType.belongsTo(BookBank, {
    foreignKey: Columns.movementsType.id,
    targetKey: Columns.bookBank.user_id
})

BookBank.hasMany(Dossier, {
    foreignKey: Columns.dossiers.id,
    sourceKey: Columns.bookBank.dossier_id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

Dossier.belongsTo(BookBank, {
    foreignKey: Columns.dossiers.id,
    targetKey: Columns.bookBank.dossier_id
})

export = BookBank