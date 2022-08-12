// Import Sequelize
const { Sequelize, DataTypes, Op } = require('sequelize');

// Setup Global Operator
global.Op = Op;

// Define Sequelize Server
let sequelize;
let env = process.env.NODE_ENV || 'development';

// Second Check
if (!process.env.DATABASE_URL) env = 'development';

if (env === 'development') {
	sequelize = new Sequelize('sqlite::memory:', {
		logging: console.log,
	});
} else {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		logging: false,
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	});
}

// Import Models
const Article = require('./Article');
const User = require('./User');
const Event = require('./Event');
const Post = require('./Post');

// Define Models
global.Article = Article(sequelize, DataTypes);
global.User = User(sequelize, DataTypes);
global.Event = Event(sequelize, DataTypes);
global.Post = Post(sequelize, DataTypes);

// Setup Relationships

// Relationship for Events
global.User.belongsToMany(global.Event, {
	through: 'EventSubscribers',
});
global.Event.belongsToMany(global.User, {
	through: 'EventSubscribers',
});

// Relationship for Follower System
global.User.belongsToMany(global.User, {
	as: 'Followee',
	foreignKey: 'followeeId',
	through: 'Followers',
});
global.User.belongsToMany(global.User, {
	as: 'Follower',
	foreignKey: 'followerId',
	through: 'Followers',
});

// Relationship for Block System
global.User.belongsToMany(global.User, {
	through: 'Blocked',
	as: 'Blocker',
	foreignKey: 'blockerId',
});
global.User.belongsToMany(global.User, {
	through: 'Blocked',
	as: 'BlockedUser',
	foreignKey: 'blockedId',
});



// Relationships for the posts crud  system.

global.User.hasMany(global.Post);
global.Post.belongsTo(global.User);



// Relationships for the posts liking system.

global.User.belongsToMany(global.Post, {
	as: "LikedPost",
	foreignKey:"LikedPostId",
	through: "Users_LikedPosts", // the name of the join table
});

global.Post.belongsToMany(global.User, {
	as : "Liker",
	foreignKey : "LikerId",
	through: "Users_LikedPosts", // the name of the join table
});






global.sequelize = sequelize;
