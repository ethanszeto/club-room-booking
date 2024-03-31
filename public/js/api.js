/**
 * Method to make an API Call
 *
 * @param {String} type
 * @param {Object} data
 * @param {String} endpoint
 * @returns Response
 */
async function request(type, data, endpoint) {
  console.log(data);
  try {
    const response = await fetch(`http://localhost:5200${endpoint}`, {
      method: type,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (e) {
    return e;
  }
}
