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

export const getUser = async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)
    let user = await prisma.user.findUnique({ where: { id: Number(id) } });
    return res.send(user);
  } catch (error) {
    console.error("users", error);
    res.status(500).send({ error: `Não foi possível encontrar usuário` });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const img = req.file?.path ? req.file.path : ''
    const { name, image_url } = req.body

    let newProfileData = { where: { id } }
    img ? newProfileData.data = { image_url: img } : ''
    name ? newProfileData.data = { name } : ''
    image_url ? newProfileData.data = { image_url } : ''

    const newProfile = await prisma.user.update(newProfileData)
    res.send(newProfile)
  } catch (error) {
    console.error("users", error);
    res.status(500).send('Não foi possível atualizar o perfil.');
  }
}
