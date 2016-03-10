'use strict';

import * as mongo from 'mongoose';

export const IdeaSchema = new mongo.Schema({
  title: { type: String, required: true },
  creator: { type: String, required: true },
  is_public: Boolean,
  created_at: Date,
  updated_at: Date
});

IdeaSchema.pre('save', function(next) {
  const idea = this;

  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  idea.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!idea.created_at)
    idea.created_at = currentDate;

  return next();

});

export const Idea = mongo.model('Idea', IdeaSchema);
