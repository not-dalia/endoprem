import {postInteraction} from '@/api.js';
/**
 * 
 * @param {string} sessionId - Unique identifier for the user session
 * @param {Object} value - Values to be logged
 * @param {string} type  - Type of interaction to be logged
 * @example
 * // Logs a page load interaction with the title of the page and a sessionId cookie
 * epLogger(Cookies.get('sessionId'), { pageTitle: 'Hello World' }, 'page_load');
 */
export default function (sessionId, value, type) {
  if (process.env.VUE_APP_LOG_INTERACTIONS == 0) return;
    let logItem = {
      sessionId, 
      data: value,
      type,
      timestamp: Date.now()
    }
    postInteraction(logItem);
  }