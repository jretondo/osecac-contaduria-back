import { Columns, Restrictions, Tables } from './../constant/TABLES';
import { IPreferences } from './../interfaces/Tables';
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';
import ProviderType from './ProviderType';

type PreferencesCreationAttributes = Optional<IPreferences, "id">;

class Preferences extends Model<IPreferences, PreferencesCreationAttributes>{ }

Preferences.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING
    },
    value: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    timestamps: false,
    tableName: Tables.PREFERENCES
})

export = Preferences