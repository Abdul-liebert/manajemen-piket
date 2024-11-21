module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define('schedule', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        shift: {
            type: DataTypes.ENUM('morning', 'afternoon', 'evening'),
            allowNull: false
        },
        assigned_admin_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'admins',
                key: 'id'
            }
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        tableName: 'schedule',
    });

    Schedule.associate = (models) => {
        Schedule.belongsTo(models.admins, {
            foreignKey: 'assigned_admin_id',
            as: 'assignedAdmin'
        });
    };

    return Schedule;
};
