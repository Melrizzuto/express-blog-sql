import { tags } from "../models/postsData.js";
import CustomError from "../classes/CustomError.js";

function index(req, res) {
    const tagsList = tags();
    const response = {
        info: {
            totalCount: tagsList.length,
        },
        results: [...tagsList],
    };
    res.json(response);
}

function show(req, res) {
    const id = parseInt(req.params.id);
    const tag = tags().find((tag) => tag.id === id);
    if (!tag) {
        throw new CustomError("L'elemento non esiste", 404);
    }
    res.json({ success: true, tag });
}

function store(req, res) {
    let newId = 0;
    const tagsList = tags();
    for (let i = 0; i < tagsList.length; i++) {
        if (tagsList[i].id > newId) {
            newId = tagsList[i].id;
        }
    }
    newId += 1;
    const newTag = { id: newId, ...req.body };
    tagsList.push(newTag);
    res.json({ success: true, item: newTag });
}

function update(req, res) {
    const id = parseInt(req.params.id);
    const tag = tags().find((tag) => tag.id === id);
    if (!tag) {
        throw new CustomError("L'elemento non esiste", 404);
    }

    // Update campo escludendo id
    for (const key in req.body) {
        if (key !== "id") {
            tag[key] = req.body[key];
        }
    }

    res.json(tag);
}

function destroy(req, res) {
    const id = parseInt(req.params.id);
    const index = tags().findIndex((tag) => tag.id === id);
    if (index !== -1) {
        tags().splice(index, 1);
        res.sendStatus(204);
    } else {
        throw new CustomError("L'elemento non esiste", 404);
    }
}

export { index, show, store, update, destroy };