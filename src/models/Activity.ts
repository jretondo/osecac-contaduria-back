import { Columns, Restrictions, Tables } from '../constant/TABLES';
import { DataTypes, Optional, Model } from 'sequelize';
import sequelize from '../database';
import { IActivity } from '../interfaces/Tables';
import Admin from './Admin';

type ActivityCreationAttributes = Optional<IActivity, 'id'>;

class Activity extends Model<IActivity, ActivityCreationAttributes> { }

Activity.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    activity_description: {
        type: DataTypes.TEXT("long")
    }
}, {
    sequelize,
    tableName: Tables.ACTIVITY,
    timestamps: false
})

Activity.hasMany(Admin, {
    foreignKey: Columns.admin.id,
    sourceKey: Columns.activity.user_id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

Admin.belongsTo(Activity, {
    foreignKey: Columns.admin.id,
    targetKey: Columns.activity.user_id
})

//Activity.sync({ alter: true })

export = Activity