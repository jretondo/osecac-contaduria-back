import { Tables } from './../constant/TABLES';
import { IProviderType } from './../interfaces/Tables';
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';

type ProviderTypeCreationAttributes = Optional<IProviderType, "id">;

class ProviderType extends Model<IProviderType, ProviderTypeCreationAttributes>{ }

ProviderType.init({
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
    tableName: Tables.PROVIDER_TYPE
})

export = ProviderType