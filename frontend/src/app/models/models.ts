export class User {
  name: string;
  email: string;
  uid: string;
  loggedIn: boolean;
  verified: boolean;

  constructor() {
    this.loggedIn = false;
    this.verified = false;
  }
}

export class UserInfo {
  email: string;
  name: string;
  uid: string;
}

export class IdeaData {
  title: string;
  summary: string;
}

export class IdeaMetaData {
  isPrivate: boolean;
  author: UserInfo;
  contributors: UserInfo[];
}

export class Idea {
  $key: string; // injected by firebase

  data: IdeaData;
  meta: IdeaMetaData;

  constructor() {
    this.data = new IdeaData();
    this.meta = new IdeaMetaData();
    this.meta.isPrivate = false;
    this.meta.contributors = [];
  }
}

export class Comment {
  $key: string; // injected by firebase
  value: string;
  author: UserInfo;
  idea: string;
}
