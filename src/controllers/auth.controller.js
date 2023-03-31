import prisma from "../config/prisma.config.js";
import tryToCatch from "../utils/tryToCatch.js";
import jwt from "jsonwebtoken";
import customError from "../utils/customError.js";
import bcrypt from 'bcryptjs'
import exclude from "../utils/prisma.exclude.js";
import { promisify } from 'util'
import cloudinary from "../config/cloudinary.config.js";


export const signup = tryToCatch(async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path, {
        transformation: [
            { gravity: "face", height: 400, width: 400, crop: "crop" },
            { radius: "max" },
            { width: 200, crop: "scale" }
        ]
    });
    const { email, fullname, username, password, gender, age, role, emailUpdates } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
        data: {
            email,
            fullname,
            username,
            gender,
            imageUrl: result.secure_url,
            age: Number(age),
            cloudinary_public_id: result.public_id,
            password: hashedPassword,
            role,
            userPreference: {
                create: {
                    emailUpdates: JSON.parse(emailUpdates)
                }
            }
        }


    })
    const userWithoutPassword = exclude(user, ['password'])
    // const url = `${req.protocol}://${req.get('host')}/me`;
    // console.log(url)
    // await new Email(user, url).sendWelcome();
    res
        .status(201)
        .json({ status: "success", data: userWithoutPassword });

})
export const updatePassword = tryToCatch(async (req, res, next) => {
    const { password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const updated = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            password: hashedPassword
        }

    })
    if (!updated) {
        return next(new customError(`There is no ${Modal} with that ID ${req.params.id}`, 404))
    }
    res.status(200).json({ status: "success", data: updated })

})

export const login = tryToCatch(async (req, res, next) => {
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email,
        },
    });
    if (user === null) {
        return next(new customError("User not Found", 400));
    } else {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const userWithoutPassword = exclude(user, "password");
            const accessToken = jwt.sign(userWithoutPassword, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "20s",
            });
            const refreshT = jwt.sign(userWithoutPassword, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: "7d",
            });
            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            const clientId = crypto.randomUUID();

            // Check if user has a live refresh token
            const liveRefreshToken = await prisma.refreshToken.findFirst({
                where: {
                    user: { id: user.id },
                    revoked: false,
                    expiresAt: { gte: new Date() },
                },
            });

            if (liveRefreshToken) {
                // Revoke live refresh token
                await prisma.refreshToken.update({
                    where: { id: liveRefreshToken.id },
                    data: { revoked: true },
                });
            }

            // Create new refresh token
            await prisma.refreshToken.create({
                data: {
                    user: {
                        connect: {
                            id: user.id,
                        },
                    },
                    clientId,
                    token: refreshT,
                    expiresAt,
                },
            });

            res.cookie("jwt", refreshT, {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.status(200).json({ status: "success", accessToken, user: req.body });
        } else {
            next(new customError("Password or Email is incorrect", 401));
        }
    }
});
export const token = tryToCatch(async (req, res, next) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    const refreshTokenData = await prisma.refreshToken.findFirst({
        where: {
            token: refreshToken,
            revoked: false,
            expiresAt: { gte: new Date() }
        },
        include: { user: true },
    });

    if (!refreshTokenData) {
        return next(new customError("Invalid request", 401));
    }

    if (!refreshTokenData.user) {
        return next(new customError("Invalid user data", 400));
    }

    const accessToken = jwt.sign(refreshTokenData.user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });

    res.status(200).json({ accessToken });
})

export const authenticateToken = tryToCatch(async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return next(new customError("You are not authorized to access this route", 401))
    const user = await promisify(jwt.verify)(token, process.env.ACCESS_TOKEN_SECRET);
    if (!user) {
        return next(new customError("Your Token has expired", 403))
    }
    req.user = user
    next();

})

export const restrictTo = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new customError("You don't have permission to access this action", 403))
        }
        // call next function to move on to the next middleware
        next()
    }
}

export const logout = async (req, res) => {
    const refreshToken = req.cookies.jwt;
    if (!refreshToken) {
        return res.sendStatus(204); // No content
    }

    const refreshTokenData = await prisma.refreshToken.findFirst({
        where: {
            token: refreshToken,
            revoked: false,
            expiresAt: { gte: new Date() },
        },
        include: { user: true },
    });

    if (!refreshTokenData) {
        return res.sendStatus(204); // No content
    }

    await prisma.refreshToken.update({
        where: { id: refreshTokenData.id },
        data: { revoked: true },
    });

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.json({ message: "Cookie cleared" });
};

export const getMeHandler = async (req, res, next) => {
    try {
        const user = req.user
        res.status(200).status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};