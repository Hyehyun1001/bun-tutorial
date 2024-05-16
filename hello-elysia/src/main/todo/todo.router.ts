import * as process from "node:process";
import { TodoHandlerRdbms } from "@main/todo/todo.handler.rdb";
import { TodoModel } from "@main/todo/todo.model";
import { Elysia } from "elysia";

export const todoRouter = new Elysia({ prefix: "/todos" })
  .use(TodoModel)
  .get("/", () => TodoHandlerRdbms.findAll(), {
    detail: {
      tags: ["todo"],
      description: "전체 ToDo 목록을 조회합니다.",
    },
  })
  .get("/:id", ({ params }) => TodoHandlerRdbms.findById(params.id), {
    params: "todo.todoId",
    transform({ params }) {
      params.id = Number(params.id);
    },
    detail: {
      tags: ["todo"],
      description: "지정된 ID의 ToDo를 조회합니다.",
    },
  })
  .post(
    "/",
    ({ set, body }) => {
      set.status = 201;
      TodoHandlerRdbms.add(body);
    },
    {
      body: "todo.todoDto",
      detail: {
        tags: ["todo"],
        description: "새로운 ToDo를 추가합니다.",
      },
    },
  )
  .patch(
    "/:id",
    ({ params, body }) => TodoHandlerRdbms.update(params.id, body),
    {
      params: "todo.todoId",
      transform({ params }) {
        params.id = Number(params.id);
      },
      body: "todo.todoDto",
      detail: {
        tags: ["todo"],
        description: "지정된 ID의 ToDo를 업데이트합니다.",
      },
    },
  )
  .delete("/:id", ({ params }) => TodoHandlerRdbms.remove(params.id), {
    params: "todo.todoId",
    transform({ params }) {
      params.id = Number(params.id);
    },
    detail: {
      tags: ["todo"],
      description: "지정된 ID의 ToDo를 삭제합니다.",
    },
  });
