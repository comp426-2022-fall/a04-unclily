#!/usr/bin/env node

import { roll } from "../lib/roll.js"
import minimist from "minimist";
import express from 'express';

const args = minimist(process.argv.slice(2));
const app = express();
//const port = 5000;
const port = args.port || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
if(args.port != null){
	port = args.port
}

app.get('/app/', (req, res) => {
    res.status(200).send('200 OK');
})

var sides = 6;
var dice = 2;
var rolls = 1;

app.get('/app/roll', (req, res) => {
    res.status(200).send(roll(sides, dice, rolls));
})

app.post('/app/roll', (req, res) => {
    sides = parseInt(req.body.sides) || 6;
    dice = parseInt(req.body.dice) || 2;
    rolls = parseInt(req.body.rolls) || 1;
    res.status(200).send(roll(sides, dice, rolls));
})

app.get('/app/roll/:sides/', (req, res) => {
    res.status(200).send(roll(parseInt(req.params.sides), 2, 1));
})

app.get('/app/roll/:sides/:dice/', (req, res) => {
    res.status(200).send(roll(parseInt(req.params.sides), parseInt(req.params.dice), 1));
})

app.get('/app/roll/:sides/:dice/:rolls/', (req, res) => {
    res.status(200).send(roll(parseInt(req.params.sides), parseInt(req.params.dice), parseInt(req.params.rolls)));
})

app.get('*', (req, res) => {
    res.status(404).send('404 NOT FOUND');
})

app.listen(port, () => {
	console.log(port);
})