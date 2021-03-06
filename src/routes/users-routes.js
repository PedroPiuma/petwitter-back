import { validateRequest } from "../middleware/auth.js";
import * as UserController from "../controllers/user-controller.js";
import multer from "fastify-multer";
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, reply, callback) => {
    callback(null, "public/images");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, file.originalname + "-" + Date.now() + extension);
  },
});

const upload = multer({ storage });

export default {
  getAllUsers: {
    method: "GET",
    url: "/users",
    preHandler: [validateRequest],
    handler: UserController.index,
  },
  getUser: {
    method: "GET",
    url: "/users/:id",
    preHandler: [validateRequest],
    handler: UserController.getUser,
  },
  updateProfile: {
    method: "PATCH",
    url: "/users/:id",
    // preHandler: upload.single("image_url"),
    preHandler: [validateRequest],
    handler: UserController.updateProfile,
  },
};
