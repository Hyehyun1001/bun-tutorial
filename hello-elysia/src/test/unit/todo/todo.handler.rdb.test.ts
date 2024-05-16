import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "bun:test";

import { TodoData } from "@main/todo/todo.data";

import { RdbmsConfig } from "@main/configure/rdbms.config";
import { TodoHandler } from "@main/todo/todo.handler";
import { TodoHandlerRdbms } from "@main/todo/todo.handler.rdb";
import { Todo, TodoDto } from "@main/todo/todo.model";

describe("Todo Handler rdbms", () => {
  beforeEach(() => {
    RdbmsConfig.open();
    RdbmsConfig.initialize();
  });

  afterEach(() => {
    RdbmsConfig.close();
  });

  test("FindAll", () => {
    const expected: Todo[] = TodoData.todoData;
    const actual: Todo[] = TodoHandlerRdbms.findAll() as Todo[];
    expect(actual).toEqual(expected);
  });

  test("FindById", () => {
    const expected: Todo = TodoData.todoData[0];
    const actual: Todo = TodoHandler.findById(1) as Todo;
    expect(actual).toEqual(expected);
  });

  test("Add", () => {
    const todo: TodoDto = {
      title: "Test Todo",
      status: "done",
    };

    const actual: Todo = TodoHandler.add(todo);
    const expected: Todo = {
      id: actual.id,
      ...todo,
    };

    expect(actual).toEqual(expected);
  });

  test("Update", () => {
    const dummy: TodoDto = {
      title: "dummy 1",
      status: "done",
    };

    const updated: TodoDto = {
      title: "Updated Todo",
      status: "done",
    };

    const { id } = TodoHandlerRdbms.add(dummy) as Todo;

    const expected = { id, ...updated };
    const actual = TodoHandler.update(id, updated) as Todo;
    expect(actual).toEqual(expected);
  });

  test("Remove", () => {
    const dummy: TodoDto = {
      title: "dummy 1",
      status: "done",
    };

    const { id } = TodoHandler.add(dummy) as Todo;
    const expected: Todo = { id, ...dummy };
    const actual: Todo = TodoHandler.remove(id) as Todo;

    expect(actual).toEqual(expected);
  });
});
