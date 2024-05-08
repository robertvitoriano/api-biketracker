import multer from "multer";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const generateAuthToken = async (userId: string): Promise<string> => {
  const token = jwt.sign({ _id: userId }, process.env.SECRET_KEY);
  return token;
};

export const encodePassword = async (password: string): Promise<string> => {
  const encodedPassword = await bcrypt.hash(password, 8);
  return encodedPassword;
};

export const multerUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const filePath = path.join(__dirname, "./temp");
      cb(null, filePath);
    },
    filename: function (req, file, cb) {
      const extension = file.mimetype.split("/")[1];
      const fileName = ((new Date().getTime() / 1000) | 0) + "." + extension;
      cb(null, fileName);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 2,
    fieldSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    let valid =
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png";
    cb(null, valid);
  },
});
