import spinUp from "./spinUp";
import { ObjectId } from "mongodb";

const id1 = ObjectId("59ff9b246d61043f186dcfed");
const id2 = ObjectId("59ff9b246d61043f186dcfee");
const id3 = ObjectId("59ff9b246d61043f186dcfef");
const idCrap = ObjectId("59ff9b246d61043f186dcfe9");

let db, schema, queryAndMatchArray, runMutation;
beforeAll(async () => {
  ({ db, schema, queryAndMatchArray, runMutation } = await spinUp());

  await db.collection("books").insert({ title: "Book 1", mongoIds: [id1, id2] });
  await db.collection("books").insert({ title: "Book 2", mongoIds: [id3] });
  await db.collection("books").insert({ title: "Book 3", mongoIds: [id1, id2, id3] });
  await db.collection("books").insert({ title: "Book 4", mongoIds: [] });
});

afterAll(async () => {
  await db.collection("books").remove({});
  db.close();
  db = null;
});

test("Array match 1", async () => {
  await queryAndMatchArray({
    query: `{allBooks(mongoIds: ["${id1}", "${id2}", "${id3}"]){Books{title}}}`,
    coll: "allBooks",
    results: [{ title: "Book 3" }]
  });
});

test("Array match 2", async () => {
  await queryAndMatchArray({
    query: `{allBooks(mongoIds: [], SORT: {title: 1}){Books{title}}}`,
    coll: "allBooks",
    results: [{ title: "Book 4" }]
  });
});

test("Array match in", async () => {
  await queryAndMatchArray({
    query: `{allBooks(mongoIds_in: [[], ["${idCrap}"]], SORT: {title: 1}){Books{title}}}`,
    coll: "allBooks",
    results: [{ title: "Book 4" }]
  });
});

test("Array match in 2", async () => {
  await queryAndMatchArray({
    query: `{allBooks(mongoIds_in: [[], ["${id3}"]], SORT: {title: 1}){Books{title}}}`,
    coll: "allBooks",
    results: [{ title: "Book 2" }, { title: "Book 4" }]
  });
});

test("Array match - order matters", async () => {
  await queryAndMatchArray({
    query: `{allBooks(mongoIds: ["${id3}", "${id2}", "${id1}"]){Books{title}}}`,
    coll: "allBooks",
    results: []
  });
});

test("Array match - contains", async () => {
  await queryAndMatchArray({
    query: `{allBooks(mongoIds_contains: "${id2}", SORT: {title: 1}){Books{title}}}`,
    coll: "allBooks",
    results: [{ title: "Book 1" }, { title: "Book 2" }]
  });
});

test("Array match - contains 2", async () => {
  await queryAndMatchArray({
    query: `{allBooks(mongoIds_contains: "${id3}", SORT: {title: 1}){Books{title}}}`,
    coll: "allBooks",
    results: [{ title: "Book 2" }, { title: "Book 3" }]
  });
});
