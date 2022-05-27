import { prisma } from "../helpers/utils.js";

export const createTwitte = async (req, res) => {
  try {
    const { body } = req.body
    const { id } = req.user
    console.log('BODY: ' + body)
    console.log("Id do usuário!: " + id)
    const twitte = await prisma.twitte.create({
      data: {
        body,
        user: { connect: { id: Number(id) } }
      },
    });
    return res.send(twitte).status(200);
  } catch (error) {
    console.error("users", error);
    res.status(500).send({ error: `Não possível criar o twitte.` });
  }
};

export const getAllTwittes = async (req, res) => {
  try {
    const twittes = await prisma.twitte.findMany()
    return res.send(twittes).status(200);
  } catch (error) {
    console.error("users", error);
    res.status(500).send({ error: `Não possível listar os twittes.` });
  }
};

export const getTwittesOfUser = async (req, res) => {
  try {
    const { id } = req.user
    const { userTwittes } = req.params
    userTwittes !== 'myTwittes' ? res.send('Parâmetro de busca inválido!') : ''
    const twittesOfUser = await prisma.twitte.findUnique({ where: { id: Number(id) } })
    return res.send(twittesOfUser).status(200);
  } catch (error) {
    console.error("users", error);
    res.status(500).send({ error: `Não possível listar os twittes.` });
  }
};
