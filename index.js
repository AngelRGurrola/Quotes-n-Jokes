import express from "express";
import axios from "axios";

const port = 3000;
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        activePage: "/",
        dynamicText: "He who is fixed to a star does not change his mind."
    });
});

app.get("/iq", async (req, res) => {
    try {
        const result = await axios.get("https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en")
        const author = result.data.quoteAuthor !== '' ? result.data.quoteAuthor : '?';
        const content = `${result.data.quoteText} -${author}`;
        res.render("index.ejs", {
            activePage: "iq",
            dynamicText: content
        });
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

app.get('/pq', async (req, res) => {
        res.render("index.ejs", { activePage: "pq" })
});

app.get("/j", (req, res) => {
    res.render("index.ejs", { activePage: "j" });
});

app.get("/dj", (req, res) => {
    res.render("index.ejs", { activePage: "dj" });
});

app.get("/cnj", (req, res) => {
    res.render("index.ejs", { activePage: "cnj" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});