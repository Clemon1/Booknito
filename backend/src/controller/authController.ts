import { Request, Response } from "express";
import users from "../model/usersModel";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/JWT";

// Get all user
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { role } = req.query;
    let findAllUser;
    role === ""
      ? (findAllUser = await users
          .find({ isDeleted: false })
          .sort({ createdAt: -1 })
          .select("-password -bookmark")
          .exec())
      : (findAllUser = await users
          .find({ role, isDeleted: false })
          .sort({ createdAt: -1 })
          .select("-password -bookmark")
          .exec());

    res.status(200).json(findAllUser);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

//Get a single user
export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const singleUser = await users
      .findById(id, { isDeleted: false })
      .sort({ createdAt: -1 })
      .select("-password -bookmark")
      .exec();
    res.status(200).json(singleUser);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

// Admin Registration
export const adminRegister = async (req: Request, res: Response) => {
  try {
    if (!req.body.fullname) {
      return res.status(400).json("Fullname cannot be empty");
    }
    if (!req.body.email) {
      return res.status(400).json("Email cannot be empty");
    }
    if (!req.body.password) {
      return res.status(400).json("Password cannot be empty");
    }
    // checking for existing admin
    const existingAdmin = await users.findOne({ email: req.body.email });
    if (existingAdmin) {
      return res.status(401).json("User already exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new users({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashPassword,
    });

    const newAdmin = await newUser.save();
    console.log(newUser);

    const token = generateToken({ user: newAdmin.id, role: newAdmin.role });
    const { password, ...details } = newAdmin.toObject();

    res.status(200).json({ details, token });
  } catch (err: any) {
    console.log(err.message);

    res.status(500).json(err.message);
  }
};

// Admin Login
export const adminLogin = async (req: Request, res: Response) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(401).json("Email or Password must not be empty");
    }
    const checkUser = await users.findOne({ email: req.body.email }); // checking for existing user
    if (!checkUser) {
      return res
        .status(401)
        .json("This user does not have an account, please register");
    }
    if (checkUser.role !== "Super-Admin") {
      // Checking if its an admin trying to login
      return res.status(401).json("You are not authorized to login here");
    }
    const checkPassword = await bcrypt.compare(
      req.body.password,
      checkUser.password,
    );
    if (!checkPassword) {
      return res.status(401).json("Invalid Password");
    }

    const { password, ...details } = checkUser.toObject();
    const token = generateToken({ user: checkUser.id, role: checkUser.role });

    res.status(200).json({ details, token });
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
// Staff Registration
export const StaffRegister = async (req: Request, res: Response) => {
  try {
    const { fullname, email, role } = req.body;
    // checking if the user is already registered
    const existingAdmin = await users.findOne({ email });
    if (existingAdmin) return res.status(401).json("User already exist");
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const photo = req.file?.path;
    const user = new users({
      fullname,
      email,
      avartar: photo,
      hashPassword,
      role,
    });

    const newUser = await user.save();
    // const token = generateToken({ user: newUser.id, role: newUser.role });
    const { password, ...other } = newUser.toObject();

    res.status(200).json(other);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

//staff Login controller
export const staffLogin = async (req: Request, res: Response) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json("Email or Password must not be empty");
    }
    // checking for existing user
    const checkUser = await users.findOne({ email: req.body.email });
    if (!checkUser) {
      return res
        .status(401)
        .json("This user does not have an account, please register");
    }
    if (checkUser.role !== "admin" || "guest") {
      // Checking if its an admin trying to login
      return res.status(401).json("You are not authorized to login here");
    }
    const checkPassword = await bcrypt.compare(
      req.body.password,
      checkUser.password,
    );
    if (!checkPassword) {
      return res.status(401).json("Invalid Password");
    }
    const { password, ...info } = checkUser;
    const token = generateToken({
      user: checkUser.id,
      role: checkUser.role,
    });
    res.status(200).json({ info, token });
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
