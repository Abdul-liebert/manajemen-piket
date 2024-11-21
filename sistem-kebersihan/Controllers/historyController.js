const { successResponse, errorResponse, internalErrorResponse, notFoundResponse } = require('../Config/responseJson');
const { history} = require('../Models/history');
const { admins } = require('../Models/admins');

const getHistories = async (req, res) => {
    try {
        const historyList = await history.findAll({
            include: [{ model: admins, as: 'admin' }]
        });
        successResponse(res, 'Histories fetched successfully', historyList);
    } catch (err) {
        internalErrorResponse(res, err);
    }
};

const createHistory = async (req, res) => {
    const { admin_id, date, shift, status, remarks } = req.body;

    try {
        const newHistory = await history.create({ admin_id, date, shift, status, remarks });
        successResponse(res, 'History created successfully', newHistory, 201);
    } catch (err) {
        internalErrorResponse(res, err);
    }
};

module.exports = {
    getHistories,
    createHistory,
};
