const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"],
        },
        email: {
            type: String,
            required: [true, "Please add a email"],
            unique: true,
            trim: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please enter a valid emaial",
            ],
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
            minLength: [6, "Password must be up to 6 characters"],
        },
        role: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            required: [true, "Please add a photo"],
            default: "https://i.ibb.co/4pDNDk1/avatar.png",
        },
        phone: {
            type: String,
            default: "+234",
        },
        bio: {
            type: String,
            maxLength: [250, "Bio must not be more than 250 characters"],
            default: "bio",
        },
    },
    {
        timestamps: true,
    }
);

//   Encrypt password before saving to DB
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;




























// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
// const argon2 = require('argon2');


// const userSchema = new Schema({

//     fullName: {
//         type: String,
//         required: true
//     },

//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },

//     password: {
//         type: String,
//         required: true
//     },

//     role: {
//         type: String,
//         required: true
//     },
// },
//     {
//         timestamps: true
//     }
// )

// // Middleware to hash the password before saving a new user
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         return next();
//     }

//     try {
//         const hashedPassword = await argon2.hash(this.password);
//         this.password = hashedPassword;
//         next();
//     } catch (err) {
//         return next(err);
//     }
// });

// // Method to remove the password field from the response
// userSchema.methods.toJSON = function () {
//     const user = this.toObject();
//     delete user.password;
//     return user;
// };

// module.exports = mongoose.model('User', userSchema);