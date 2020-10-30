const Sequelize = require ('sequelize');
const sequelize= new Sequelize('workout-log',
'postgres', 'password2#', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('connected to workout-log postgres database');
    },
    function(err){
        console.log(err);
    }
);
module.exports = sequelize;