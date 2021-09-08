import express from "express";
import animalController, {
  validateAnimalRequestBody,
} from "../controllers/animal.controller";

const router = express.Router();

router.get("/", animalController.getAnimais);
router.get("/:id", animalController.getAnimal);
router.post("/", validateAnimalRequestBody, animalController.createAnimal);
router.put("/:id", validateAnimalRequestBody, animalController.updateAnimal);
router.delete("/:id", animalController.deleteAnimal);

export default router;
