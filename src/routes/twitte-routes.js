import { validateRequest } from "../middleware/auth.js";
import * as twitteController from "../controllers/twitte-controller.js";

export default {
    createTwitte: {
        method: "POST",
        url: "/twitte",
        preHandler: [validateRequest],
        handler: twitteController.createTwitte,
    },
    getAllTwittes: {
        method: "GET",
        url: "/twitte",
        preHandler: [validateRequest],
        handler: twitteController.getAllTwittes,
    },
    getTwittesOfUser: {
        method: "GET",
        url: "/twitte/:userTwittes",
        preHandler: [validateRequest],
        handler: twitteController.getTwittesOfUser,
    },
};
