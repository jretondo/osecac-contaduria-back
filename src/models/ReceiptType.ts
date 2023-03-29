import { Tables } from './../constant/TABLES';
import { IReceiptTypes } from './../interfaces/Tables';
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';

type ReceiptTypeCreationAttributes = Optional<IReceiptTypes, "id">;

class ReceiptType extends Model<IReceiptTypes, ReceiptTypeCreationAttributes>{ }

ReceiptType.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING(150)
    },
    order: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    timestamps: false,
    tableName: Tables.RECEIPTS_TYPES
})

export = ReceiptType