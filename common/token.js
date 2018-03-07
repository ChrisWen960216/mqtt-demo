/** Created By ChrisWen
 *  Token
 */
const getHashToken = (() => {
  let count = 0;
  return () => {
    const date = Date.now() * 1000;
    const result = (date + (count++ % 1000)).toString(16);
    return result;
  };
})();
module.exports = getHashToken;
