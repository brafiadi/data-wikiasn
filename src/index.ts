import { Hono } from "hono";
import { cors } from "hono/cors";
import { hariLiburRoute } from "./routes/hari-libur.route";

const app = new Hono();
app.use("*", cors());
app.route("/hari-libur", hariLiburRoute);

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

export default {
	port: process.env.PORT,
	fetch: app.fetch,
};
