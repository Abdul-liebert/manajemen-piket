module.exports = (sequelize, DataTypes) => {
    const Evaluation = sequelize.define('evaluation', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        report_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'reports',
                key: 'id'
            }
        },
        evaluator_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'admins',
                key: 'id'
            }
        },
        evaluation_score: {
            type: DataTypes.TINYINT,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        comments: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        tableName: 'evaluation',
    });

    Evaluation.associate = (models) => {
        Evaluation.belongsTo(models.reports, {
            foreignKey: 'report_id',
            as: 'report'
        });

        Evaluation.belongsTo(models.admins, {
            foreignKey: 'evaluator_id',
            as: 'evaluator'
        });
    };

    return Evaluation;
};
