import parse = require('parse');

const Parse = parse.Parse;

export class Idea extends Parse.Object {

  id: String;
  title: String;
  summary: String;
  isPublic: boolean;
  author: Parse.User;
  contributors: String[];

  constructor(parseIdea?: any) {
    super('Idea');

    this.isPublic = true;
    this.contributors = [];

    if (parseIdea) {
      this.title = parseIdea.get('title');
      this.summary = parseIdea.get('summary');
      this.author = parseIdea.get('author');
      this.id = parseIdea.id;
    }
  }

  get attrs() {
    return {
      title: this.title,
      summary: this.summary,
      author: this.author,
      isPublic: this.isPublic,
      contributors: this.contributors
    };
  }
}

export class Comment extends Parse.Object {
  id: String;
  value: String;
  author: Parse.User;
  idea: Idea;

  constructor(comment?: any) {
    super('Comment');

    if (comment) {
      this.id = comment.id;
      this.value = comment.get('value');
      this.author = comment.get('author');
      this.idea = comment.get('idea');
    }
  }

  get attrs() {
    return {
      value: this.value,
      author: this.author,
      idea: this.idea
    };
  }
}

Parse.Object.registerSubclass('Idea', Idea);
Parse.Object.registerSubclass('Comment', Comment);
