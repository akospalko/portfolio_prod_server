//returns the formatted status code that is fit to send as a response back to the client 
const getStatusCode = (responseData) => {
  return Number(responseData.split(' ')[0].slice(0, 3)) 
}

exports.module = getStatusCode;