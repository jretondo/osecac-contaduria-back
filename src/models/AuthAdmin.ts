import { Columns, Tables, Restrictions } from '../constant/TABLES';
import { DataTypes, Optional, Model } from 'sequelize';
import sequelize from '../database';
import Admin from './Admin';
import { IAuth } from '../interfaces/Tables';

type IAuthCreationAttributes = Optional<IAuth, 'id'>;

class AuthAdmin extends Model<IAuth, IAuthCreationAttributes> { }

AuthAdmin.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user: {
        type: DataTypes.STRING(100)
    },
    pass: {
        type: DataTypes.STRING(250)
    },
    prov: {
        type: DataTypes.BOOLEAN
    },
    admin_id: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    tableName: Tables.AUTH_ADMIN,
    timestamps: false
})

Admin.hasOne(AuthAdmin, {
    foreignKey: Columns.authAdmin.admin_id,
    sourceKey: Columns.admin.id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

AuthAdmin.belongsTo(Admin, {
    foreignKey: Columns.authAdmin.admin_id,
    targetKey: Columns.admin.id
})

export = AuthAdmin