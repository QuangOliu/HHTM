const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../sequelize')

const Role = sequelize.define(
  'Role',
  {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    timestamps: false, // Tắt sử dụng tự động createdAt và updatedAt
  }
)

const Label = sequelize.define(
  'Label',
  {
    label_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    label_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    timestamps: false, // Tắt sử dụng tự động createdAt và updatedAt
  }
)

const Image = sequelize.define(
  'Image',
  {
    image_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    file_path: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    upload_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    description: DataTypes.TEXT,
  },
  {
    timestamps: false, // Tắt sử dụng tự động createdAt và updatedAt
  }
)

const User = sequelize.define(
  'User',
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      defaultValue: 3, // Đặt giá trị mặc định cho role_id là 3
      allowNull: false, // Đảm bảo không bị null
    },
  },
  {
    timestamps: false, // Tắt sử dụng tự động createdAt và updatedAt
  }
)

const Model = sequelize.define(
  'Model',
  {
    model_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Đảm bảo không bị null
    },
    model_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: DataTypes.TEXT,
    architecture: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    training_duration: DataTypes.TIME,
    loss: DataTypes.FLOAT,
    accuracy: DataTypes.FLOAT,
  },
  {
    timestamps: false, // Tắt sử dụng tự động createdAt và updatedAt
  }
)

const Training = sequelize.define(
  'Training',
  {
    training_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    model_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Đảm bảo không bị null
    },
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Đảm bảo không bị null
    },
  },
  {
    timestamps: false, // Tắt sử dụng tự động createdAt và updatedAt
  }
)

// Một số ví dụ về quan hệ
User.belongsTo(Role, { foreignKey: 'role_id' })
Role.hasMany(User, { foreignKey: 'role_id' })

Image.belongsTo(Label, { foreignKey: 'label_id' })
Label.hasMany(Image, { foreignKey: 'label_id' })

Model.belongsTo(User, { foreignKey: 'user_id' })
User.hasMany(Model, { foreignKey: 'user_id' })

Training.belongsTo(Model, { foreignKey: 'model_id' })
Training.belongsTo(Image, { foreignKey: 'image_id' })
Model.hasMany(Training, { foreignKey: 'model_id' })
Image.hasMany(Training, { foreignKey: 'image_id' })

sequelize
  .sync()
  .then(() => {
    console.log('Database synchronized')
  })
  .catch((err) => {
    console.error('Database synchronization failed:', err)
  })

// Export các Model để sử dụng trong ứng dụng
module.exports = {
  Role,
  Label,
  Image,
  User,
  Model,
  Training,
}
