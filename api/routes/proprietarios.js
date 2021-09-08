import express from "express";
import proprietarioController, {
  validateProprietarioRequestBody,
} from "../controllers/proprietario.controller";

const router = express.Router();

router.get("/", proprietarioController.getProprietarios);
router.get("/:id", proprietarioController.getProprietario);
router.post(
  "/",
  validateProprietarioRequestBody,
  proprietarioController.createProprietario
);
router.put(
  "/:id",
  validateProprietarioRequestBody,
  proprietarioController.updateProprietario
);
router.delete("/:id", proprietarioController.deleteProprietario);

export default router;
