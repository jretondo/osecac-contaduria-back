import { Tables } from './../constant/TABLES';
import { IStockType } from './../interfaces/Tables';
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';

type StockTypeCreationAttributes = Optional<IStockType, "id">;

class StockType extends Model<IStockType, StockTypeCreationAttributes>{ }

StockType.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING(150)
    }
}, {
    sequelize,
    timestamps: false,
    tableName: Tables.STOCK_TYPE
})

export = StockType