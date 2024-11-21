const { successResponse, errorResponse, internalErrorResponse, notFoundResponse } = require('../Config/responseJson');
const { schedule } = require('../Models/schedule');
const { admins } = require('../Models/admins');

const getSchedules = async (req, res) => {
    try {
        const schedules = await schedule.findAll({
            include: [{ model: admins, as: 'assignedAdmin' }]
        });
        successResponse(res, 'Schedules fetched successfully', schedules);
    } catch (err) {
        internalErrorResponse(res, err);
    }
};

const createSchedule = async (req, res) => {
    const { date, shift, assigned_admin_id } = req.body;

    try {
        const newSchedule = await schedule.create({ date, shift, assigned_admin_id });
        if (!newSchedule) {
            errorResponse(res, 'Schedule not created', 400);
        } else {
            successResponse(res, 'Schedule created successfully', newSchedule, 201);
        }
    } catch (err) {
        internalErrorResponse(res, err);
    }
};

const updateSchedule = async (req, res) => {
    const { id } = req.params;
    const { date, shift, assigned_admin_id } = req.body;

    try {
        const existingSchedule = await schedule.findByPk(id);

        if (!existingSchedule) {
            return notFoundResponse(res, 'Schedule not found');
        }

        await existingSchedule.update({ date, shift, assigned_admin_id });
        successResponse(res, 'Schedule updated successfully', existingSchedule);
    } catch (err) {
        internalErrorResponse(res, err);
    }
};

const showScheduleById = async (req, res) => {
    const { id } = req.params;

    try {
        const foundSchedule = await schedule.findByPk(id, {
            include: [{ model: admins, as: 'assignedAdmin' }]
        });

        if (!foundSchedule) {
            return notFoundResponse(res, 'Schedule not found');
        }

        successResponse(res, 'Schedule fetched successfully', foundSchedule);
    } catch (err) {
        internalErrorResponse(res, err);
    }
};

const deleteSchedule = async (req, res) => {
    const { id } = req.params;

    try {
        const existingSchedule = await schedule.findByPk(id);

        if (!existingSchedule) {
            return notFoundResponse(res, 'Schedule not found');
        }

        await existingSchedule.destroy();
        successResponse(res, 'Schedule deleted successfully', existingSchedule);
    } catch (err) {
        internalErrorResponse(res, err);
    }
};

module.exports = {
    getSchedules,
    createSchedule,
    updateSchedule,
    showScheduleById,
    deleteSchedule,
};
