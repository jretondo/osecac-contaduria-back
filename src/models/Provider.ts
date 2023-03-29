import { Columns, Restrictions, Tables } from './../constant/TABLES';
import { IProviders } from './../interfaces/Tables';
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';
import ProviderType from './ProviderType';

type ProviderCreationAttributes = Optional<IProviders, "id">;

class Provider extends Model<IProviders, ProviderCreationAttributes>{ }

Provider.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    document_number: {
        type: DataTypes.INTEGER
    },
    provider_number: {
        type: DataTypes.INTEGER
    },
    provider_name: {
        type: DataTypes.STRING(200)
    },
    email: {
        type: DataTypes.STRING(250)
    },
    phone: {
        type: DataTypes.STRING(70)
    },
    provider_type_id: {
        type: DataTypes.INTEGER
    },
    observations: {
        type: DataTypes.TEXT("long")
    },
    city: {
        type: DataTypes.STRING(150)
    },
    cbu: {
        type: DataTypes.STRING(100)
    },
}, {
    sequelize,
    timestamps: true,
    tableName: Tables.PROVIDERS
})

Provider.hasMany(ProviderType, {
    foreignKey: Columns.providerType.id,
    sourceKey: Columns.providers.provider_type_id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

ProviderType.belongsTo(Provider, {
    foreignKey: Columns.providerType.id,
    targetKey: Columns.providers.provider_type_id
})

export = Provider