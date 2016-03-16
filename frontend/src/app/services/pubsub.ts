import {Injectable} from 'angular2/core';

@Injectable()
export class PubSubService {
  private _channels: Array<any> = [];

  subscribe(topic, ...handlers) {
    if (!this._channels[topic]) {
      this._channels[topic] = [];
    }
    handlers.forEach((handler) => {
      this._channels[topic].push(handler);
    });
  }

  unsubscribe(topic, handler) {
    let t = this._channels[topic];
    if (!t) {
      // Wasn't found, wasn't removed
      return false;
    }

    if (!handler) {
      // Remove all handlers for this topic
      delete this._channels[topic];
      return true;
    }

    // We need to find and remove a specific handler
    let i = t.indexOf(handler);

    if (i < 0) {
      // Wasn't found, wasn't removed
      return false;
    }

    t.splice(i, 1);

    // If the channel is empty now, remove it from the channel map
    if (!t.length) {
      delete this._channels[topic];
    }

    return true;
  }

  /**
   * Publish an event to the given topic.
   *
   * @param {string} topic the topic to publish to
   * @param {any} eventData the data to send as the event
   */
  publish(topic, args) {
    var t = this._channels[topic];
    if (!t) {
      return null;
    }

    let responses = [];
    t.forEach((handler) => {
      responses.push(handler(args));
    });
    return responses;
  }
}
