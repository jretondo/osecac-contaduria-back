import { Tables } from './../constant/TABLES';
import { IMovementsType } from './../interfaces/Tables';
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';

type MovementsTypeCreationAttributes = Optional<IMovementsType, "id">;

class MovementType extends Model<IMovementsType, MovementsTypeCreationAttributes>{ }

MovementType.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100)
    },
    description: {
        type: DataTypes.STRING(250)
    },
    order: {
        type: DataTypes.INTEGER
    },
    book_order: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    timestamps: false,
    tableName: Tables.MOVEMENTS_TYPE
})

export = MovementType