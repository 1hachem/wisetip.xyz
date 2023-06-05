import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { email } = req.query;

  const request = await prisma.email
    .create({
      data: {
        email: email,
      },
    })
    .then(async () => {
      await prisma.$disconnect();
      return res.status(200).json({ message: "Added to waitlist!!" });
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
  return res.status(400).json({ messsage: "Ooops! something went wrong :/." });
}
