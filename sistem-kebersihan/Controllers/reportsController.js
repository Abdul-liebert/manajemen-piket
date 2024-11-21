const { successResponse, errorResponse, internalErrorResponse, notFoundResponse } = require('../Config/responseJson');
const { reports } = require('../Models/reports');
const { schedule } = require('../Models/schedule');

const getReports = async (req, res) => {
    try {
        const reportList = await reports.findAll({
            include: [{ model: schedule, as: 'schedule' }]
        });
        successResponse(res, 'Reports fetched successfully', reportList);
    } catch (err) {
        internalErrorResponse(res, err);
    }
};

const createReport = async (req, res) => {
    const { schedule_id, report_text, photo_path } = req.body;

    try {
        const newReport = await reports.create({ schedule_id, report_text, photo_path });
        successResponse(res, 'Report created successfully', newReport, 201);
    } catch (err) {
        internalErrorResponse(res, err);
    }
};

const updateReport = async (req, res) => {
    const { id } = req.params;
    const { schedule_id, report_text, photo_path } = req.body;

    try {
        const existingReport = await reports.findByPk(id);

        if (!existingReport) {
            return notFoundResponse(res, 'Report not found');
        }

        await existingReport.update({ schedule_id, report_text, photo_path });
        successResponse(res, 'Report updated successfully', existingReport);
    } catch (err) {
        internalErrorResponse(res, err);
    }
};

const deleteReport = async (req, res) => {
    const { id } = req.params;

    try {
        const existingReport = await reports.findByPk(id);

        if (!existingReport) {
            return notFoundResponse(res, 'Report not found');
        }

        await existingReport.destroy();
        successResponse(res, 'Report deleted successfully', existingReport);
    } catch (err) {
        internalErrorResponse(res, err);
    }
};

module.exports = {
    getReports,
    createReport,
    updateReport,
    deleteReport,
};
