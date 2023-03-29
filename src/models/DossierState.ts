import { Tables } from './../constant/TABLES';
import { IDossierState } from './../interfaces/Tables';
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';

type DossierStateCreationAttributes = Optional<IDossierState, "id">;

class DossierState extends Model<IDossierState, DossierStateCreationAttributes>{ }

DossierState.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    state: {
        type: DataTypes.STRING(100)
    }
}, {
    sequelize,
    timestamps: false,
    tableName: Tables.DOSSIER_STATE
})

export = DossierState