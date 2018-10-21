module.exports = app => {
  const { badCredentials } = app.shared.authErrors;
  const bcrypt = app.get("bcrypt");
  const mongoose = app.get("mongoose");

  // Define user model
  const userSchema = new mongoose.Schema({
    god: { type: Boolean, default: false },
    email: { type: String, unique: true, lowercase: true },
    username: { type: String, unique: true, lowercase: true },
    password: String
  });

  // // Generate a salt, password, then run callback
  // userSchema.methods.createPassword = async (password, next) => {
  //   try {
  //     const salt = await bcrypt.genSalt(12);
  //     if (!salt)
  //       return next({
  //         err: "Unable to generate password salt!",
  //         newPassword: null
  //       });
  //
  //     const newPassword = await bcrypt.hash(password, salt, null);
  //     if (!newPassword)
  //       return next({
  //         err: "Unable to generate a secure password!",
  //         newPassword: null
  //       });
  //
  //     next({ err: null, newPassword });
  //   } catch (err) {
  //     next({ err, newPassword: null });
  //   }
  // };

  // Set a compare password method on the model
  userSchema.methods.comparePassword = async (incomingPassword, next) => {
    try {
      const isMatch = await bcrypt.compare(incomingPassword, this.password);
      if (!isMatch) return next({ err: badCredentials, isMatch: false });

      next({ err: null, isMatch });
    } catch (err) {
      next({ err, isMatch: false });
    }
  };

  // Create model class
  mongoose.model("users", userSchema);
};
