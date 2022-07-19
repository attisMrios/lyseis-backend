import express from "express";
const generic_crud_routes = express.Router();

/**
 * Get list of table
 */
generic_crud_routes.get('/', (_req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');

    

})