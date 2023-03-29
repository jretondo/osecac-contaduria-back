import { Tables, Columns, Restrictions } from './../constant/TABLES';
import { IMonthlyBalance } from './../interfaces/Tables';
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';
import BalanceTypes from './BalanceType';

type MonthlyBalanceCreationAttributes = Optional<IMonthlyBalance, "id">;

class MonthlyBalance extends Model<IMonthlyBalance, MonthlyBalanceCreationAttributes>{ }

MonthlyBalance.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    month: {
        type: DataTypes.INTEGER
    },
    year: {
        type: DataTypes.INTEGER
    },
    balance: {
        type: DataTypes.DOUBLE
    },
    type_id: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    timestamps: false,
    tableName: Tables.MONTHLY_BALANCE
})

MonthlyBalance.hasMany(BalanceTypes, {
    foreignKey: Columns.balanceTypes.id,
    sourceKey: Columns.monthlyBalance.type_id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

BalanceTypes.belongsTo(MonthlyBalance, {
    foreignKey: Columns.balanceTypes.id,
    targetKey: Columns.monthlyBalance.type_id
})

export = MonthlyBalance