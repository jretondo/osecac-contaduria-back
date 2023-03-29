import { Tables, Columns, Restrictions } from './../constant/TABLES';
import { IDossiersDetails } from './../interfaces/Tables';
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';
import Dossiers from './Dossier';
import Beneficiary from './Beneficiary';

type DossierDetailCreationAttributes = Optional<IDossiersDetails, "id">;

class DossierDetail extends Model<IDossiersDetails, DossierDetailCreationAttributes>{ }

DossierDetail.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ad: {
        type: DataTypes.INTEGER
    },
    invoice_number: {
        type: DataTypes.STRING(150)
    },
    invoice_amount: {
        type: DataTypes.DOUBLE
    },
    month_period: {
        type: DataTypes.INTEGER
    },
    year_period: {
        type: DataTypes.INTEGER
    },
    dossier_id: {
        type: DataTypes.INTEGER
    },
    beneficiary_id: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    timestamps: true,
    tableName: Tables.DOSSIERS_DETAILS
})

DossierDetail.hasMany(Dossiers, {
    foreignKey: Columns.dossiers.id,
    sourceKey: Columns.dossiersDetails.dossier_id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

Dossiers.belongsTo(DossierDetail, {
    foreignKey: Columns.dossiers.id,
    targetKey: Columns.dossiersDetails.dossier_id
})

DossierDetail.hasMany(Beneficiary, {
    foreignKey: Columns.beneficiaries.id,
    sourceKey: Columns.dossiersDetails.beneficiary_id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

Beneficiary.belongsTo(DossierDetail, {
    foreignKey: Columns.beneficiaries.id,
    targetKey: Columns.dossiersDetails.beneficiary_id
})

export = DossierDetail