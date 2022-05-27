import { prisma } from "../helpers/utils.js";

export const index = async (req, res) => {
  try {
    let users = await prisma.user.findMany({
      select: { email: true },
    });
    return res.send({ data: { users } });
  } catch (error) {
    console.error("users", error);
    res.status(500).send({ error: `Cannot fetch users` });
  }
};

export const updateProfilePicture = async (req, res) => {
  try {
    const id = Number(req.params.id)
    console.log(id)
    const img = req.file?.path ? req.file.path : ''
    const newProfile = await prisma.user.update({
      where: { id },
      data: { image_url: img }
    })
    res.send(newProfile)
  } catch (error) {
    console.error("users", error);
    res.status(500).send('Não foi possível atualizar a foto.');
  }
};
