import express from "express";
import axios from "axios";

const port = 3000;
const app = express();

app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("index.ejs", { activePage: "/" });
});

app.get("/iq", (req,res) => {
    res.render("index.ejs", { activePage: "iq" });
});

app.get("/pq", (req,res) => {
    res.render("index.ejs", { activePage: "pq" });
});

app.get("/j", (req,res) => {
    res.render("index.ejs", { activePage: "j" });
});

app.get("/dj", (req,res) => {
    res.render("index.ejs", { activePage: "dj" });
});

app.get("/cnj", (req,res) => {
    res.render("index.ejs", { activePage: "cnj" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});