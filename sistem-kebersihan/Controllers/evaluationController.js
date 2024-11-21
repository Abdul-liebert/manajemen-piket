const { successResponse, errorResponse, internalErrorResponse, notFoundResponse } = require('../Config/responseJson');
const { evaluation } = require('../Models/evaluation');
const { reports } = require('../Models/reports');
const { admins } = require('../Models/admins');

const getEvaluations = async (req, res) => {
    try {
        const evaluations = await evaluation.findAll({
            include: [
                { model: reports, as: 'report' },
                { model: admins, as: 'evaluator' },
            ],
        });
        successResponse(res, 'Evaluations fetched successfully', evaluations);
    } catch (err) {
        internalErrorResponse(res, err);
    }
};

const createEvaluation = async (req, res) => {
    const { report_id, evaluator_id, evaluation_score, comments } = req.body;

    try {
        const newEvaluation = await evaluation.create({ report_id, evaluator_id, evaluation_score, comments });
        successResponse(res, 'Evaluation created successfully', newEvaluation, 201);
    } catch (err) {
        internalErrorResponse(res, err);
    }
};

module.exports = {
    getEvaluations,
    createEvaluation,
};
