var bcrypt = require("bcryptjs");
module.exports=function(sequelize,DataTypes){
    const User=sequelize.define('User',{
        email:
        {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
        }
    },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        username:{
            type: DataTypes.STRING
        }
    });
User.associate=models=>{
    User.hasMany(models.Memories,{
        onDelete:'cascade'
    })
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
      };
      // Hooks are automatic methods that run during various phases of the User Model lifecycle
      // In this case, before a User is created, we will automatically hash their password
      User.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      });   
}

    return User;
}