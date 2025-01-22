import connection from "../connection.js";
import CustomError from "../classes/CustomError.js";

function index(req, res) {
    const sql = "SELECT * FROM `posts`";
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed" });
        }

        console.log(results);

        const response = {
            info: {
                totalCount: results.length,
            },
            results: results,
        };

        res.json(response);
    });
}

function show(req, res) {
    console.log("Richiesta ricevuta per ID:", req.params.id);
    const id = parseInt(req.params.id);

    // Controllo ID valido
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID non valido" });
    }

    const sql = "SELECT * FROM `posts` WHERE `id` = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Errore nella query del database" });
        }

        const item = results[0];
        if (!item) {
            return res.status(404).json({ error: "Post non trovato" });
        }

        // Risposta con il post trovato
        res.json({ success: true, item });
    });
}


function store(req, res) {
    let newId = 0;
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id > newId) {
            newId = posts[i].id;
        }
    }
    newId += 1;
    const newPost = { id: newId, ...req.body };
    posts.push(newPost);
    res.json({ success: true, item: newPost });
}

function update(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (!post) {
        throw new CustomError("L'elemento non esiste", 404);
    }

    // Update campo escludendo id
    for (const key in req.body) {
        if (key !== "id") {
            post[key] = req.body[key];
        }
    }

    res.json(post);
}

function destroy(req, res) {
    const id = parseInt(req.params.id);
    const sql = "DELETE FROM `posts` WHERE `id` = ?";

    connection.query(sql, [id], (err, res) => {
        if (err) {
            return res.status(500).json({ error: "Errore nella query di eliminazione" });
        }
        res.sendStatus(204);
    });
}

export { index, show, store, update, destroy };
