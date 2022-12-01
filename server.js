#!/usr/bin/env node

import { roll } from "./lib/rolls.js"
import minimist from "minimist";
import express from 'express';

const args = minimist(process.argv.slice(2));
const app = express();
const port = args.port || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/app/', (req, res) => {
    res.status(200).send('200 OK');
})

app.get('/app/roll', (req, res) => {
    let sides = 6;
    let dice = 2;
    let rolls = 1;
    res.status(200).send(roll(sides, dice, rolls));
});

app.post('/app/roll', (req, res) => {
    let sides = parseInt(req.body.sides);
    let dice = parseInt(req.body.dice);
    let rolls = parseInt(req.body.rolls);
    res.send(roll(sides, dice, rolls));
});

app.get('/app/roll/:sides/', (req, res) => {
    res.send(roll(parseInt(req.params.sides), 2, 1));
});

app.get('/app/roll/:sides/:dice/', (req, res) => {
    res.send(roll(parseInt(req.params.sides), parseInt(req.params.dice), 1));
});

app.get('/app/roll/:sides/:dice/:rolls/', (req, res) => {
    res.send(roll(parseInt(req.params.sides), parseInt(req.params.dice), parseInt(req.params.rolls)));
});

app.get('*', (req, res) => {
    res.status(404).send('404 NOT FOUND');
});

app.listen(port, () => {
	console.log(port);
});