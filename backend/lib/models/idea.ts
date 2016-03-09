'use strict';

import * as mongo from 'mongoose';

export const IdeaSchema = new mongo.Schema({
  title: { type: String, required: true }
});

export const Idea = mongo.model('Idea', IdeaSchema);
