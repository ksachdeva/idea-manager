declare module 'passport' {

  import restify = require('restify');

  function use(strategy: Strategy): Passport;
  function use(name: string, strategy: Strategy): Passport;
  function unuse(name: string): Passport;
  function framework(fw: string): Passport;
  function initialize(options?: { userProperty: string; }): restify.RequestHandler;
  function session(options?: { pauseStream: boolean; }): restify.RequestHandler;

  function authenticate(strategy: string, callback?: Function): restify.RequestHandler;
  function authenticate(strategy: string, options: Object, callback?: Function): restify.RequestHandler;
  function authenticate(strategies: string[], callback?: Function): restify.RequestHandler;
  function authenticate(strategies: string[], options: Object, callback?: Function): restify.RequestHandler;
  function authorize(strategy: string, callback?: Function): restify.RequestHandler;
  function authorize(strategy: string, options: Object, callback?: Function): restify.RequestHandler;
  function authorize(strategies: string[], callback?: Function): restify.RequestHandler;
  function authorize(strategies: string[], options: Object, callback?: Function): restify.RequestHandler;
  function serializeUser(fn: (user: any, done: (err: any, id: any) => void) => void): void;
  function deserializeUser(fn: (id: any, done: (err: any, user: any) => void) => void): void;
  function transformAuthInfo(fn: (info: any, done: (err: any, info: any) => void) => void): void;

  interface Passport {
    use(strategy: Strategy): Passport;
    use(name: string, strategy: Strategy): Passport;
    unuse(name: string): Passport;
    framework(fw: string): Passport;
    initialize(options?: { userProperty: string; }): restify.RequestHandler;
    session(options?: { pauseStream: boolean; }): restify.RequestHandler;

    authenticate(strategy: string, callback?: Function): restify.RequestHandler;
    authenticate(strategy: string, options: Object, callback?: Function): restify.RequestHandler;
    authenticate(strategies: string[], callback?: Function): restify.RequestHandler;
    authenticate(strategies: string[], options: Object, callback?: Function): restify.RequestHandler;
    authorize(strategy: string, callback?: Function): restify.RequestHandler;
    authorize(strategy: string, options: Object, callback?: Function): restify.RequestHandler;
    authorize(strategies: string[], callback?: Function): restify.RequestHandler;
    authorize(strategies: string[], options: Object, callback?: Function): restify.RequestHandler;
    serializeUser(fn: (user: any, done: (err: any, id: any) => void) => void): void;
    deserializeUser(fn: (id: any, done: (err: any, user: any) => void) => void): void;
    transformAuthInfo(fn: (info: any, done: (err: any, info: any) => void) => void): void;
  }

  interface Strategy {
    name?: string;
    authenticate(req: restify.Request, options?: Object): void;
  }

  interface Profile {
    provider: string;
    id: string;
    displayName: string;
    name?: {
      familyName: string;
      givenName: string;
      middleName?: string;
    };
    emails?: {
      value: string;
      type?: string;
    }[];
    photos?: {
      value: string;
    }[];
  }
}
