import { GreetHandler } from "@main/greet/greet.handler";
import { Elysia } from "elysia";

export const greetRouter = new Elysia({ prefix: "/greets" }).get(
  "/",
  () => GreetHandler.helloElysia(),
  {
    detail: {
      tags: ["greet"],
      description: "Greet 서비스를 제공하는 API입니다. 인사말을 전달합니다.",
    },
  },
);
