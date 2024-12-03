/**
 * Normalizes a port value to a valid port number or returns the original value if it's a named pipe.
 * 
 * @param {string} val - The port value to normalize.
 * @returns {(number | string | boolean)} The normalized port value.
 */
export default function normalizePort(val: string) {
  const port = parseInt(val, 10); // Attempt to parse the value as an integer

  // If the parsed value is NaN, it means the original value is a named pipe
  if (isNaN(port)) {
    return val; // Return the original value as it's a named pipe
  }

  // If the parsed value is a non-negative number, it's a valid port number
  if (port >= 0) {
    return port; // Return the parsed port number
  }

  // If the parsed value is a negative number, it's an invalid port number
  return false; // Return false to indicate an invalid port number
}
