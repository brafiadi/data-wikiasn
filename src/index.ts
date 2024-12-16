import { Hono } from "hono";
import { cors } from "hono/cors";
import { hariLiburRoute } from "./routes/hari-libur.route";
import { masterDataRoute } from "./routes/master-data.route";
import { tunjanganKinerjaRoute } from "./routes/tunjangan-kinerja.route";

const app = new Hono();
app.use("*", cors());
app.route("/hari-libur", hariLiburRoute);
app.route("/master-data", masterDataRoute);
app.route("/tunjangan-kinerja", tunjanganKinerjaRoute);

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

export default {
	port: process.env.PORT,
	fetch: app.fetch,
};
