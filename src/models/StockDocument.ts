import { Tables, Columns, Restrictions } from './../constant/TABLES';
import { IStockDocuments } from './../interfaces/Tables';
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';
import StockType from './StockType';

type StockDocumentsCreationAttributes = Optional<IStockDocuments, "id">;

class StockDocument extends Model<IStockDocuments, StockDocumentsCreationAttributes>{ }

StockDocument.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    number: {
        type: DataTypes.INTEGER
    },
    type_id: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    timestamps: false,
    tableName: Tables.STOCK_DOCUMENTS
})

StockDocument.hasMany(StockType, {
    foreignKey: Columns.stockType.id,
    sourceKey: Columns.stockDocuments.type_id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

StockType.belongsTo(StockDocument, {
    foreignKey: Columns.stockType.id,
    targetKey: Columns.stockDocuments.type_id
})

export = StockDocument