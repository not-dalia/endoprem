import {postInteraction} from '@/api.js';

const HOST = 'http://localhost:4000'

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