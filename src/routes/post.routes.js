const r = require("express").Router();
const a = require("../middleware/auth");

r.get("/", a, (q, s) =>
    s.json([{ id: 1, title: "Welcome" }])
);

module.exports = r;