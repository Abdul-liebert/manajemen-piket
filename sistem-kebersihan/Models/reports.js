module.exports = (sequelize, DataTypes) => {
    const Reports = sequelize.define('reports', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        schedule_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'schedule',
                key: 'id'
            }
        },
        report_text: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        photo_path: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        tableName: 'reports',
    });

    Reports.associate = (models) => {
        Reports.belongsTo(models.schedule, {
            foreignKey: 'schedule_id',
            as: 'schedule'
        });
    };

    return Reports;
};
