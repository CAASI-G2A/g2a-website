import { parse, SyntaxError } from "../../src/libs/researcher_search_lang";

describe("Researcher Search Language Parser", () => {
  test("it should parse an individual phrase", () => {
    const input = "dog";
    const output = parse(input);

    const expectedOutput = {
      query: input,
    };

    expect(output).toEqual(expectedOutput);
  });

  test("it should parse an expression with an escaped 'and'", () => {
    const input = "'dog and cat'";
    const output = parse(input);

    const expectedOutput = {
      query: input,
    };

    expect(output).toEqual(expectedOutput);
  });

  test("it should parse an 'AND' expression", () => {
    const input = "dog and cat";
    const output = parse(input);

    const expectedOutput = {
      query: {
        operation: "AND",
        operand1: "dog",
        operand2: "cat",
      },
    };

    expect(output).toEqual(expectedOutput);
  });

  test("it should parse an 'OR' expression", () => {
    const input = "dog or cat";
    const output = parse(input);

    const expectedOutput = {
      query: {
        operation: "OR",
        operand1: "dog",
        operand2: "cat",
      },
    };

    expect(output).toEqual(expectedOutput);
  });

  test("it should parse an 'AND' and 'OR' expression", () => {
    const input = "dog and cat or turtle";
    const output = parse(input);

    const expectedOutput = {
      query: {
        operation: "AND",
        operand1: "dog",
        operand2: {
          operation: "OR",
          operand1: "cat",
          operand2: "turtle",
        },
      },
    };

    expect(output).toEqual(expectedOutput);
  });

  test("it should reject an empty expression", () => {
    const input = "";

    expect(() => {
      parse(input);
    }).toThrow(SyntaxError);
  });
});
