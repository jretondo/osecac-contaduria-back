import { Columns, Restrictions, Tables } from './../constant/TABLES';
import { IDossiers } from './../interfaces/Tables';
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';
import Admin from './Admin';
import Provider from './Provider';
import DossierState from './DossierState';
import DossierPayment from './DossierPayment';

type DossierCreationAttributes = Optional<IDossiers, "id">;

class Dossier extends Model<IDossiers, DossierCreationAttributes>{ }

Dossier.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    year: {
        type: DataTypes.INTEGER
    },
    number: {
        type: DataTypes.INTEGER
    },
    gross_amount: {
        type: DataTypes.DOUBLE
    },
    local_tax: {
        type: DataTypes.DOUBLE
    },
    incomes_tax: {
        type: DataTypes.DOUBLE
    },
    net_amount: {
        type: DataTypes.DOUBLE
    },
    provider_id: {
        type: DataTypes.INTEGER
    },
    state_id: {
        type: DataTypes.INTEGER
    },
    payment_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    timestamps: true,
    tableName: Tables.DOSSIERS
})

Dossier.hasMany(Provider, {
    foreignKey: Columns.providers.id,
    sourceKey: Columns.dossiers.provider_id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

Provider.belongsTo(Dossier, {
    foreignKey: Columns.providers.id,
    targetKey: Columns.dossiers.provider_id
})

Dossier.hasMany(DossierState, {
    foreignKey: Columns.dossierState.id,
    sourceKey: Columns.dossiers.state_id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

DossierState.belongsTo(Dossier, {
    foreignKey: Columns.dossierState.id,
    targetKey: Columns.dossiers.state_id
})

Dossier.hasMany(DossierPayment, {
    foreignKey: Columns.dossiersPayments.id,
    sourceKey: Columns.dossiers.payment_id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

DossierPayment.belongsTo(Dossier, {
    foreignKey: Columns.dossiersPayments.id,
    targetKey: Columns.dossiers.payment_id
})

Dossier.hasMany(Admin, {
    foreignKey: Columns.admin.id,
    sourceKey: Columns.dossiers.user_id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

Admin.belongsTo(Dossier, {
    foreignKey: Columns.admin.id,
    targetKey: Columns.dossiers.user_id
})

export = Dossier