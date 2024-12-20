import { Hono } from "hono";
import { cors } from "hono/cors";
import { hariLiburRoute } from "./routes/hari-libur.route";
import { masterDataRoute } from "./routes/master-data.route";
import { tunjanganKinerjaRoute } from "./routes/tunjangan-kinerja.route";
import { standarBiayaMasuaknRoute } from "./routes/sbm.route";

const app = new Hono();
app.use("*", cors());
app.route("/hari-libur", hariLiburRoute);
app.route("/master-data", masterDataRoute);
app.route("/tunjangan-kinerja", tunjanganKinerjaRoute);
app.route("/standar-biaya-masukan", standarBiayaMasuaknRoute);

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

export default {
	port: process.env.PORT,
	fetch: app.fetch,
};
