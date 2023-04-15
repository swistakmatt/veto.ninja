import { Request, Response } from "express";
import User, { IUser, UserRole } from "../models/User";

export async function createUser(req: Request, res: Response) {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({
      username,
      email,
      role: UserRole.USER,
    });

    await newUser.setPassword(password);

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const users: IUser[] = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).send("Server error");
  }
}

export async function getUser(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const user: IUser | null = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).send("Server error");
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const userToDelete: IUser | null = await User.findById(id);
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).send("Server error");
  }
}
