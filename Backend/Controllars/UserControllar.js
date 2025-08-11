const UserModel = require("../Models/UserModel");
const { GenrateHashPassword, GenrateToken, DecriptPassword } = require("../utils/Helper");



async function UserRegister(req, res) {
    const { email, username, password, confirmPassword } = req.body;
    try {
        if (!email || !username || !password || !confirmPassword) {
            return res.status(400).json({ msg: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ msg: "Passwords do not match" });
        }
        const FindUser = await UserModel.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        })
        if (!FindUser) {
            try {
                const HashPassword = await GenrateHashPassword(password)
                if (HashPassword) {
                    const newUser = await UserModel.create({
                        email,
                        username,
                        password: HashPassword,
                    })
                    const token = GenrateToken(newUser.email, newUser._id)
                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: true,        // Production me true
                        sameSite: "none"     // cross-domain ke liye
                    });
                    res.status(201).json({
                        msg: "Acccount created successfully",
                        user: {
                            username: newUser.username,
                            email: newUser.email
                        }
                    });

                } else {
                    res.status(501).json({
                        msg: "Internal server error"
                    })
                }
            } catch (err) {
                res.status(400).json({
                    msg: "Unable to create user",
                    error: err.message
                });
            }
        } else {
            return res.status(409).json({ msg: "Username or Email already exists" });
        }
    } catch (err) {
        res.status(501).json({
            msg: "Internal Server error"
        })
    }
}


async function UserLogin(req, res) {
    const { identifier, password } = req.body;
    try {
        if (!identifier || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const FindUser = await UserModel.findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        })

        if (!FindUser) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        const VerifyUserPassword = await DecriptPassword(password, FindUser.password)

        if (!VerifyUserPassword) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const token = await GenrateToken(FindUser.email, FindUser._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,        // Production me true
            sameSite: "none"     // cross-domain ke liye
        });

        res.status(202).json({
            msg: "Acccount Login successfully",
            user: {
                username: FindUser.username,
                email: FindUser.email
            }
        });

    } catch (err) {
        res.status(500).json({
            msg: "Internal Server error"
        })
    }
}


async function logoutUser(req, res) {
    try {

        res.clearCookie("token", {
            httpOnly: true,

        });
        if (req.session) {
            req.session.destroy(err => {
                if (err) {
                    return res.status(500).json({ msg: "Error logging out" });
                }
            });
        }

        return res.status(200).json({ msg: "Logged out successfully" });

    } catch (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ msg: "Server error during logout" });
    }
}


module.exports = { UserRegister, UserLogin, logoutUser };