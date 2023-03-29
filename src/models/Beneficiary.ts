import { Tables } from '../constant/TABLES';
import { IBeneficiaries } from '../interfaces/Tables';
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';
import Admin from './Admin';

type BeneficiariesCreationAttributes = Optional<IBeneficiaries, "id">;

class Beneficiary extends Model<IBeneficiaries, BeneficiariesCreationAttributes>{ }

Beneficiary.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING(150)
    },
    document_number: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    timestamps: false,
    tableName: Tables.BENEFICIARIES
})

export = Beneficiary