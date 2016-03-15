import {Pipe, PipeTransform} from 'angular2/core';
import parse = require('parse');
import {Idea, Comment} from './../models/models';

const Parse = parse.Parse;

@Pipe({
  name: 'commentCount',
  pure: false
})
export class CommentCountPipe implements PipeTransform {
  private fetchedValue: number;
  private fetchPromise: Promise<number>;

  transform(value: string, args: string[]): any {
    console.log(value);
    if (!this.fetchPromise) {
      this.fetchPromise = new Promise<number>((resolve, reject) => {
        const query = new Parse.Query(Comment);
        const idea = new Idea();
        idea.id = value;
        query.equalTo('idea', idea);
        query.count({
          success: (count) => resolve(count),
          error: (error) => reject(error)
        });
      });

      this.fetchPromise.then((val: number) => this.fetchedValue = val);
    }
    return this.fetchedValue;
  }
}
