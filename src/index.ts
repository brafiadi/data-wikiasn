import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { hariLiburRoute } from "./routes/hari-libur.route";
import { masterDataRoute } from "./routes/master-data.route";
import { tunjanganKinerjaRoute } from "./routes/tunjangan-kinerja.route";
import { standarBiayaMasukanRoute } from "./routes/sbm.route";
import { peraturanRoute } from "./routes/peraturan.route";
import { authRoute } from "./routes/auth.route";
import { HTTPException } from "hono/http-exception";

const app = new Hono();
app.use("*", cors());
app.use("*", logger());
app.route("/hari-libur", hariLiburRoute);
app.route("/master-data", masterDataRoute);
app.route("/tunjangan-kinerja", tunjanganKinerjaRoute);
app.route("/standar-biaya-masukan", standarBiayaMasukanRoute);
app.route("/peraturan", peraturanRoute);
app.route("/auth", authRoute);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.onError((err, c) => {
  console.error(`[Error] ${err.name}: ${err.message}`);
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return c.json(
    {
      success: false,
      message: "Internal Server Error",
    },
    500,
  );
});

export default {
  port: process.env.PORT,
  fetch: app.fetch,
};
