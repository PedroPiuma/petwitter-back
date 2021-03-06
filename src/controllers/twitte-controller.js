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
    res.status(500).send({ error: `Não possível criar o twitte.` });
  }
};

export const deleteTwitte = async (req, res) => {
  try {
    const { id } = req.params
    const twitteDeleted = await prisma.twitte.delete({ where: { id: Number(id) } })
    return res.send(twitteDeleted).status(200);
  } catch (error) {
    res.status(500).send({ error: `Não possível deletar o twitte.` });
  }
};

export const getAllTwittes = async (req, res) => {
  const { take, skip = 0 } = req.query
  let data = {}
  data.skip = Number(skip)
  data.orderBy = { id: 'desc' }
  if (take) data.take = Number(take)

  try {
    const twittes = await prisma.twitte.findMany(data)
    return res.send(twittes).status(200);
  } catch (error) {
    res.status(500).send({ error: `Não possível listar os twittes.` });
  }
};

export const getTwittesOfUser = async (req, res) => {
  try {
    const { take, skip = 0 } = req.query
    const { id } = req.params
    let data = {
      where: { user_id: Number(id) },
      orderBy: { id: 'desc' },
      skip: Number(skip),
    }
    if (take) data.take = Number(take)
    const twittesOfUser = await prisma.twitte.findMany(data)
    return res.send(twittesOfUser).status(200);
  } catch (error) {
    res.status(500).send({ error: `Não possível listar os twittes.` });
  }
};
