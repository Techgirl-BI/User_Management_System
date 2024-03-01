import express from "express";
import { createWorker, editWorker } from "../controller/worker.js";
import { calculateHierarchy } from "../middleware/calculateHierarchy.js";

export const workerRoute = express.Router()

workerRoute.post('/', calculateHierarchy, createWorker)
workerRoute.patch('/:id', calculateHierarchy, editWorker)