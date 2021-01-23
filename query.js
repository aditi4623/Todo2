"use strict";
var pool = require("./database_configuration");

module.exports.ADD_TASK = async(req, res, next) => {
    try {
        var task_name = req.body.task;
        var date = req.body.date;
        console.log(req.body)
        if (task_name && date) {
            let sql = `INSERT INTO mytodo(task, date, isActive) VALUES ('${task_name}','${date}','1')`;
            await pool.query(sql);
            res.status(200).json({
                message: "Saved",
                status: 1,
            });
        } else {
            res.status(200).json({
                message: "Missing req.",
                status: 0,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            status: 0,
            message: err.message,
        });
    }
};
module.exports.DELETE_TASK = async(req, res, next) => {
    try {
        var id = req.body.id;
        // var exp = req.body.exp;
        console.log(req.body)
        if (id) {
            let sql = `DELETE FROM mytodo WHERE id=${id}`;
            await pool.query(sql);
            res.status(200).json({
                message: "Deleted",
                status: 1,
            });
        } else {
            res.status(200).json({
                message: "Missing req.",
                status: 0,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            status: 0,
            message: err.message,
        });
    }
};
module.exports.EDIT_TASK = async(req, res, next) => {
    try {
        let task_id = req.params.id;
        let task_name = req.body.task;
        if (task_id && task_name) {
            let check_sql = "SELECT * FROM mytodo WHERE id=?";
            let [check_result] = await pool.query(check_sql, [task_id]);
            if (check_result) {
                let sql = "UPDATE mytodo set task=? WHERE id=?";
                let result = await pool.query(sql, [task_name, task_id]);
                res.status(200).json({
                    message: "Task Edited",
                });
            } else {
                res.status(400).json({
                    message: "Task Doesn't Exist",
                });
            }
        } else {
            res.status(400).json({
                message: "Missing Required Field",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            errMessage: err.message,
        });
    }
};
module.exports.MARK_COMPLETE = async(req, res, next) => {
    try {
        var task_id = req.params.id;
        if (task_id) {
            let check_sql = "SELECT * FROM mytodo WHERE id=?";
            let [check_result] = await pool.query(check_sql, [task_id]);
            if (check_result) {
                let sql = "UPDATE mytodo set isActive=? WHERE id=?";
                let result = await pool.query(sql, [0, task_id]);
                res.status(200).json({
                    message: "Task Completed",
                });
            } else {
                res.status(400).json({
                    message: "Task Doesn't Exist",
                });
            }
        } else {
            res.status(400).json({
                message: "Missing Required Field",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            errMessage: err.message,
        });
    }
};
module.exports.GET_TASK = async(req, res, next) => {
    try {
        let status = req.body.status;
        console.log(status);
        if (status) {
            let sql = "SELECT * FROM mytodo WHERE isActive=? ORDER BY id DESC";
            result = await pool.query(sql, [status]);
        } else {
            let sql = "SELECT * FROM mytodo ORDER BY id DESC";
            var result = await pool.query(sql);
        }

        res.status(200).json({
            message: "Data Fetched",
            data: result,
        });
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            errMessage: err.message,
        });
    }
};