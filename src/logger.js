import {postInteraction} from '@/api.js';

export default function (sessionId, value, type) {
  // eslint-disable-next-line no-undef
  if (process.env.VUE_APP_LOG_INTERACTIONS == 0) return;
    let logItem = {
      sessionId, 
      data: value,
      type,
      timestamp: Date.now()
    }
    postInteraction(logItem);
    // console.log(logItem);
  }