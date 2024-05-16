import { describe, expect, test } from "bun:test";
import { GreetHandler } from "@main/greet/greet.handler";

describe("Greet Handler", () => {
  test('helloElysia should be return "Hello, Elysia!', () => {
    const expected: string = "Hello, Elysia!";
    const actual: string = GreetHandler.helloElysia();

    expect(actual).toEqual(expected);
  });
});
