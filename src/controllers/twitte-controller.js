import { prisma } from "../helpers/utils.js";

export const createTwitte = async (req, res) => {
  try {
    const { body } = req.body
    const { id } = req.user
    const twitteCreated = await prisma.twitte.create({
      data: {
        body,
        user: { connect: { id: Number(id) } }
      },
    });
    return res.send(twitteCreated).status(200);
  } catch (error) {
    console.error("users", error);
    res.status(500).send({ error: `Não possível criar o twitte.` });
  }
};

export const deleteTwitte = async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)
    const twitteDeleted = await prisma.twitte.delete({ where: { id: Number(id) } })
    return res.send(twitteDeleted).status(200);
  } catch (error) {
    console.error("users", error);
    res.status(500).send({ error: `Não possível deletar o twitte.` });
  }
};

export const getAllTwittes = async (req, res) => {
  const { take = 0 } = req.query
  try {
    const twittes = await prisma.twitte.findMany({
      skip: 0,
      take: Number(take),
      orderBy: {
        id: 'desc',
      },
    },
    )
    return res.send(twittes).status(200);
  } catch (error) {
    console.error("users", error);
    res.status(500).send({ error: `Não possível listar os twittes.` });
  }
};

export const getTwittesOfUser = async (req, res) => {
  try {
    const { id } = req.params
    const twittesOfUser = await prisma.twitte.findMany({ where: { user_id: Number(id) } })
    return res.send(twittesOfUser).status(200);
  } catch (error) {
    console.error("users", error);
    res.status(500).send({ error: `Não possível listar os twittes.` });
  }
};
