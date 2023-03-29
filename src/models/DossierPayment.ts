import { Tables } from './../constant/TABLES';
import { IDossiersPayments } from './../interfaces/Tables';
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';

type DossierPaymentCreationAttributes = Optional<IDossiersPayments, "id">;

class DossierPayment extends Model<IDossiersPayments, DossierPaymentCreationAttributes>{ }

DossierPayment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(150)
    }
}, {
    sequelize,
    timestamps: false,
    tableName: Tables.DOSSIERS_PAYMENTS
})

export = DossierPayment