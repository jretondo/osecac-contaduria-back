import { IBalanceTypes } from './../interfaces/Tables';
import { Tables } from '../constant/TABLES';
import { DataTypes, Optional, Model } from 'sequelize';
import sequelize from '../database';

type BalanceTypeCreationAttributes = Optional<IBalanceTypes, 'id'>;

class BalanceTypes extends Model<IBalanceTypes, BalanceTypeCreationAttributes> { }

BalanceTypes.init({
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
    tableName: Tables.BALANCE_TYPES
})

export = BalanceTypes