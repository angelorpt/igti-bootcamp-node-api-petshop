import proprietariosRoutes from "./proprietarios";
import animaisRoutes from "./animais";

const routes = (app) => {
  app.get("/", (req, res) => res.send("Expressjs rodando"));
  app.use("/api/proprietarios", proprietariosRoutes);
  app.use("/api/animais", animaisRoutes);

  app.use((err, req, res, next) => {
    console.log("error", err);
    logger.error(`${req.method} ${req.baseUrl} - ${err}`);
    res.status(400).send(err);
  });
};

export default routes;
