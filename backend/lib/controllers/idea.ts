'use strict';

import * as restify from 'restify';
import {Idea} from '../models/idea';

export function create(req: restify.Request, res: restify.Response) {
  const title = req.params.title;
  Idea.create({
    title: title
  }, (err, response) => {
      if (err) {
        res.send(500);
        return;
      }
      res.send(201);
    });
}

export function get(req: restify.Request, res: restify.Response) {
  const id = req.params.id;
  Idea.findById(id, (err, response) => {
    if (err) {
      res.send(500, err);
      return;
    }
    res.json(response);
  });
}
