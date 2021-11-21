const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  identificationNumber: {
    type: String,
    required: [true, "El número de identificación es obligatorio"],
  },
  fullName: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  role: {
    type: String,
    required: [true, "El rol es obligatorio"],
    enum: ["ADMIN", "LEADER", "STUDENT"],
  },
  state: {
    type: String,
    required: [true, "El estado es obligatorio"],
    enum: ["PENDING", "AUTHORIZED", "NOT_AUTHORIZED"],
    default: "PENDING"
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model("User", UserSchema);
