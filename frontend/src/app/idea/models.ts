import parse = require('parse');

const Parse = parse.Parse;

export class Idea extends Parse.Object {

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

Parse.Object.registerSubclass('Idea', Idea);
