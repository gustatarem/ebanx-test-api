import fastify from "fastify";
import { eventRoutes } from "./routes/event";
import { balanceRoutes } from "./routes/balance";
import { resetRoute } from "./routes/reset";

export const app = fastify();

app.register(eventRoutes);
app.register(balanceRoutes);
app.register(resetRoute);
