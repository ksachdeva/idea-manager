'use strict';

import * as restify from 'restify';
import * as HTTPStatus from 'http-status';

import {Idea} from '../models/idea';
import {RequestEx} from '../interfaces';

export function create(req: RequestEx, res: restify.Response) {
  const title = req.params.title;
  const is_public = req.params.is_public || true;

  req.checkBody('title', 'title can not be empty').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.send(HTTPStatus.BAD_REQUEST, errors);
    return;
  }

  Idea.create({
    title: title,
    creator: req.user,
    is_public: is_public
  }, (err, response) => {
      if (err) {
        res.send(HTTPStatus.BAD_REQUEST);
        return;
      }
      res.send(HTTPStatus.CREATED);
    });
}

export function get(req: RequestEx, res: restify.Response) {
  const id = req.params.id;

  req.checkParams('id', 'id can not be empty').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.send(HTTPStatus.BAD_REQUEST, errors);
    return;
  }

  Idea.findById(id, (err, response) => {
    if (err) {
      res.send(HTTPStatus.BAD_REQUEST, err);
      return;
    }
    res.json(response);
  });
}
