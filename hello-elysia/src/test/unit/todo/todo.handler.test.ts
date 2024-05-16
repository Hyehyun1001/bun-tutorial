import { beforeAll, beforeEach, describe, expect, test } from "bun:test";

import { TodoData } from "@main/todo/todo.data";

import { TodoHandler } from "@main/todo/todo.handler";
import { Todo, TodoDto } from "@main/todo/todo.model";

describe("Todo Handler", () => {
  beforeEach(() => {
    TodoData.initialize();
  });

  test("FindAll", () => {
    const expected = TodoData.todoData;
    const actual = TodoHandler.findAll();

    expect(actual).toEqual(expected);
  });

  test("FindById", () => {
    const expected = TodoData.todoData[0];
    const actual = TodoHandler.findById(1);

    expect(actual).toEqual(expected);
  });

  describe("Add", () => {
    let expected: Todo;
    let actual: Todo;

    beforeEach(() => {
      TodoData.initialize();

      const todo: TodoDto = {
        title: "Test Todo",
        status: "done",
      };

      actual = TodoHandler.add(todo);
      expected = {
        id: actual.id,
        ...todo,
      };
    });

    test("Add 1", () => {
      expect(actual).toEqual(expected);
    });

    test("Add 2", () => {
      expect(TodoData.todoData).toContainEqual(expected);
    });
  });

  describe("Update", () => {
    let actual: Todo;
    let expected: Todo;

    const dummy: TodoDto = {
      title: "dummy 1",
      status: "done",
    };

    const updated: TodoDto = {
      title: "Updated Todo",
      status: "done",
    };

    beforeEach(() => {
      TodoData.initialize();

      console.info(`test1: ${JSON.stringify(TodoData.todoData)}`);

      const { id } = TodoHandler.add(dummy);

      console.info(`test2: ${JSON.stringify(TodoData.todoData)}`);
      expected = { id, ...updated };
      console.info(`test3: ${JSON.stringify(expected)}`);
      actual = TodoHandler.update(id, updated) as Todo;
      console.info(`test4: ${JSON.stringify(actual)}`);
    });

    test("Update 1", () => {
      console.info(`Update1 actual: ${JSON.stringify(actual)}`);
      console.info(`Update1 expected: ${JSON.stringify(expected)}`);
      expect(actual).toEqual(expected);
    });

    test("Update 2", () => {
      console.info(`Update2 : ${JSON.stringify(TodoData.todoData)}`);
      console.info(`Update2 expected: ${JSON.stringify(expected)}`);
      expect(TodoData.todoData).toContainEqual(expected);
    });
  });

  describe("Remove", () => {
    let actual: Todo;
    let expected: Todo;

    const dummy: TodoDto = {
      title: "dummy 1",
      status: "done",
    };

    beforeAll(() => {
      TodoData.initialize();
      const { id } = TodoHandler.add(dummy);
      expected = { id, ...dummy };
      actual = TodoHandler.remove(id) as Todo;
    });

    test("Remove 1", () => {
      expect(actual).toEqual(expected);
    });

    test("Remove 2", () => {
      expect(TodoData.todoData).not.toContainEqual(expected);
    });
  });
});
