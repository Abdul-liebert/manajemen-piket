module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define('history', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        admin_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'admins',
                key: 'id'
            }
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        shift: {
            type: DataTypes.ENUM('morning', 'afternoon', 'evening'),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('completed', 'missed', 'pending'),
            allowNull: false,
            defaultValue: 'pending'
        },
        remarks: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        tableName: 'history',
    });

    History.associate = (models) => {
        History.belongsTo(models.admins, {
            foreignKey: 'admin_id',
            as: 'admin'
        });
    };

    return History;
};
