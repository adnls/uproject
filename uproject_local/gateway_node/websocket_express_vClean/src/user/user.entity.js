'use strict';
// Contient la définition de ma classe user
class User {

    constructor(user_id) {
        
    }

    set user_id (user_id) { this._user_id = user_id }
    get user_id () { return this._user_id }
    
}
module.exports = User;