import { getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import * as queries from "../db/queries.js";

export async function syncUser(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { email, name, imageUrl, username } = req.body;
    if (!email || !name || !imageUrl || !username) {
      return res
        .status(400)
        .json({ error: "email, name and imageUrl are required" });
    }

    const user = await queries.upsertUser({
      id: userId,
      email,
      name,
      imageUrl,
      username,
    });
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error syncing user", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
