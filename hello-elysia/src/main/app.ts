import staticPlugin from "@elysiajs/static";
import swagger from "@elysiajs/swagger";
import { ErrorMessages } from "@main/common/error.message";
import { ElysiaConfig } from "@main/configure/elysia.config";
import { RdbmsConfig } from "@main/configure/rdbms.config";
import { greetRouter } from "@main/greet/greet.router";
import { TodoData } from "@main/todo/todo.data";
import { todoRouter } from "@main/todo/todo.router";
import { Elysia } from "elysia";

TodoData.initialize();
RdbmsConfig.open();
RdbmsConfig.initialize();

const elysiaOption = {
  port: Bun.env.PORT || 3000,
  tls: {
    key: Bun.file("resource/cert/privkey.pem"),
    cert: Bun.file("resource/cert/fullchain.pem"),
  },
};

const app = new Elysia()
  .use(ElysiaConfig.elysiaStaticPlugin)
  .use(ElysiaConfig.elysiaSwaggerPlugin)
  .use(greetRouter)
  .use(todoRouter)
  .get("/", () => Bun.file("resource/public/index.html"))
  .onError(({ code }) => ErrorMessages.elysiaErrorMessage(code))
  .listen(elysiaOption);

console.info(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
