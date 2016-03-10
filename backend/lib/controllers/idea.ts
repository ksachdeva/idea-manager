'use strict';

import * as restify from 'restify';
import * as HTTPStatus from 'http-status';
import * as mongo from 'mongoose';

import {Idea} from '../models/idea';
import {RequestEx, IIdeaModel} from '../interfaces';

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

export function list(req: RequestEx, res: restify.Response) {

  console.log('here');
  console.log(Idea['paginate']);

  Idea['paginate']({}, function(err, result) {
    if (err) {
      console.log('in error');
      console.log(err);
      res.send(HTTPStatus.BAD_REQUEST, err);
      return;
    }
    res.json(result);
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
