import express from "express";
import axios from "axios";

const port = 3000;
const app = express();

app.use(express.static("public"));

let imgNum = 0;

app.get("/", (req, res) => {
    res.render("index.ejs", {
        activePage: "/",
        dynamicText: "He who is fixed to a star does not change his mind."
    });
});

app.get("/iq", async (req, res) => {
    try {
        const result = await axios.get("https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en");

        const author = result.data.quoteAuthor !== '' ? result.data.quoteAuthor : '?';
        const content = `${result.data.quoteText} -${author}`;


        imgNum = Math.floor(Math.random() * 10) + 1;
        const image = `/images/iq-${imgNum}.jpg`;

        res.render("index.ejs", {
            activePage: "iq",
            dynamicText: content,
            dynamicImage: image
        });
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

app.get('/pq', async (req, res) => {
    try {
        const result = await axios.get("https://programming-quotes-api-pi.vercel.app/quotes/random");
        const author = result.data.author !== '' ? result.data.author : '?';
        const content = `${result.data.en} -${author}`;

        imgNum = Math.floor(Math.random() * 10) + 1;
        const image = `/images/pq-${imgNum}.jpg`;

        res.render("index.ejs", {
            activePage: "pq",
            dynamicText: content,
            dynamicImage: image
        });
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

app.get("/j", async (req, res) => {
    try {
        const result = await axios.get("https://v2.jokeapi.dev/joke/any");
        let content;

        if (result.data.type === 'twopart') {
            content = `${result.data.setup}                 ...${result.data.delivery}`;
        } else {
            content = `${result.data.joke}`;
        }

        imgNum = Math.floor(Math.random() * 10) + 1;
        const image = `/images/j-${imgNum}.jpg`;

        res.render("index.ejs", {
            activePage: "j",
            dynamicText: content,
            dynamicImage: image
        });
    } catch (error) {
        if (error.response) {
            console.error("API error:", error.response.status);
        } else {
            console.error("Request error:", error.message);
        }

        res.status(500).render("index.ejs", {
            activePage: "j",
            dynamicText: "Could not load joke."
        });
    }
});

app.get("/dj", async (req, res) => {
    try {
        const config = {
            headers: { Accept: "application/json" },
        };
        const result = await axios.get("https://icanhazdadjoke.com/", config);
        const content = result.data.joke;

        imgNum = Math.floor(Math.random() * 10) + 1;
        const image = `/images/dj-${imgNum}.jpg`;

        res.render("index.ejs", {
            activePage: "dj",
            dynamicText: content,
            dynamicImage: image
        });
    } catch (error) {
        if (error.response) {
            console.error("API error:", error.response.status);
        } else {
            console.error("Request error:", error.message);
        }

        res.status(500).render("index.ejs", {
            activePage: "j",
            dynamicText: "Could not load joke."
        });
    }
});

app.get("/cnj", async (req, res) => {
    try {
        const result = await axios.get("https://api.chucknorris.io/jokes/random");
        const content = result.data.value;

        imgNum = Math.floor(Math.random() * 10) + 1;
        const image = `/images/cnj-${imgNum}.jpg`;

        res.render("index.ejs", {
            activePage: "cnj",
            dynamicText: content,
            dynamicImage: image
        });
    } catch (error) {
        if (error.response) {
            console.error("API error:", error.response.status);
        } else {
            console.error("Request error:", error.message);
        }

        res.status(500).render("index.ejs", {
            activePage: "j",
            dynamicText: "Could not load joke."
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});