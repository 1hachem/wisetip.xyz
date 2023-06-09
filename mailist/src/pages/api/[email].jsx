import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { email } = req.query;

  await prisma.email
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
      return res
        .status(400)
        .json({ messsage: "Ooops! something went wrong :/." });
    });
}
