// Sequelize setup for MySQL database connection
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

// Define Message model
const Message = sequelize.define('message', {
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Define AuditTrail model
const AuditTrail = sequelize.define('auditTrail', {
    timestamp: {
        type: Sequelize.DATE,
        allowNull: false
    },
    action: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Sync models with database
sequelize.sync({ force: false }).then(() => {
    console.log('Database synchronized');
}).catch(err => {
    console.error('Error synchronizing database:', err);
});
