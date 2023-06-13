import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import User, { IUser, UserRole } from "../models/User";

export const handleErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

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

export async function addFriend(req: Request, res: Response) {
  const { friendUsername } = req.body;

  if (!req.isAuthenticated() || !req.user) {
    return res.status(403).json({ message: "Not authenticated" });
  }

  try {
    const friend: IUser | null = await User.findOne({
      username: friendUsername,
    });

    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }

    const user: IUser | null = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.friends.some((f) => f._id.equals(friend._id))) {
      return res.status(400).json({ message: "Already friends" });
    }

    user.friends.push(friend);
    await user.save();

    res.json(friend);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

export const loginUser = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
};

export const logoutUser = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
};

export const getProfile = (req: Request, res: Response) => {
  try {
    if (req.isUnauthenticated() || req.user === undefined)
      return res.sendStatus(401);

    return res.json({
      nickname: req.user.username,
      _id: req.user._id,
      friends: req.user.friends,
    });
  } catch (error) {
    console.error("Error in /me: ", error);
    res.status(500).send(error);
  }
};

export const getUserFriends = async (req: Request, res: Response) => {
  if (req.user) {
    try {
      const user: IUser | null = await User.findById(req.user._id).populate(
        "friends"
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(
        user.friends.map((friend) => ({
          _id: friend._id,
          username: friend.username,
        }))
      );
    } catch (err) {
      res.status(500).send("Server error");
    }
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
};
