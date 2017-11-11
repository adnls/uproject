'use strict';
// Contient les méthodes de ma classe user
const db = require('../../../mysql');
const user = require('../entity/user');

class User {


    /**
     * INSERT new user in DB
     * @param {Integer} user_id
     * @return {Promise}
     */
    createUser(user_id) {
        return new Promise((resolve, reject) => {
            let reqUser = 'INSERT INTO user (user_id)'
                + ' VALUES (?)';
            /*db.getConnection(function (err, connection) {
                connection.query(reqUser, [user_id], (err, result) => {
                    if (err) {
                        return reject("createUser reject : " + err);
                    }
                    return resolve(result);
                });
            });*/
        });
    }

    /**
     * SELECT one user in DB
     * @param {Integer} user_habit_id
     * @return {Promise}
     */
    getUser(user_id) {
        return new Promise((resolve, reject) => {
            let reqUserHabit = 'SELECT * FROM user WHERE id = ?';
            db.getConnection(function (err, connection) {
                connection.query(reqUserHabit, [user_id], (error, result) => {
                    if (!error) {
                        UserHabitBuilder.buildUser(result).then(builtUserHabit => {

                            return resolve(builtUserHabit);
                        });
                    } else {
                        reject("getUser reject : " + error);
                    }
                });
            });
        });
    }

    /**
     * SELECT all user in DB
     * @param {Integer} user_id
     * @return {Promise}
     */
    getAllUser() {
        return new Promise((resolve, reject) => {
            let reqUser = 'SELECT * FROM user';
            db.getConnection(function (err, connection) {
                connection.query(reqUser, (error, result) => {
                    if (!error) {
                        UserHabitBuilder.buildUserHabit(result).then(builtUserHabit => {
                            return resolve(builtUserHabit);
                        });
                    } else {
                        console.log("getAllUser reject");
                        return reject("getAllUser reject : " + error);
                    }
                });
            });
        });
    }
}
module.exports = User;