export default function (sessionId, value, type) {
    let logItem = {
      sessionId, 
      value,
      type,
      timestamp: Date.now()
    }
    console.log(logItem)
  }