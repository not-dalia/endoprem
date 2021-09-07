import {postInteraction} from '@/api.js';

export default function (sessionId, value, type) {
    let logItem = {
      sessionId, 
      data: value,
      type,
      timestamp: Date.now()
    }
    postInteraction(logItem);
    // console.log(logItem);
  }