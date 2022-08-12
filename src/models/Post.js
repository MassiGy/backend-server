module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Post', {
		title: DataTypes.STRING,
		content: DataTypes.TEXT,
		ownerId: DataTypes.INTEGER,
		likedBy: [DataTypes.INTEGER], // stores the users ids that likes the post instance, so likesCount = length
	});
};
