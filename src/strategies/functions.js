const colorFunctions = /((rgb|hsl)a?\(\s*[\d.]+%?\s*(?<commaOrSpace>\s|,)\s*[\d.]+%?\s*\k<commaOrSpace>\s*[\d.]+%?(\s*(\k<commaOrSpace>|\/)\s*\d?\.?\d+%?)?\s*\))/gi;
const colorWithoutFunctions = /([\d.]+\s+[\d.]+%\s+[\d.]+%\s*)/gi;

/**
 * @export
 * @param {string} text
 * @returns {{
 *  start: number,
 *  end: number,
 *  color: string
 * }}
 */
export async function findFn(text) {
  let match = colorFunctions.exec(text);
  let match2 = colorWithoutFunctions.exec(text);
  let result = [];

  while (match !== null || match2 !== null) {
    if (match !== null) {
      const start = match.index;
      const end = colorFunctions.lastIndex;
      const color = match[0];

      result.push({
        start,
        end,
        color
      });
    }

    if (match2 !== null) {
      const start = match2.index;
      const end = colorWithoutFunctions.lastIndex;
      const color = `hsl(${match2[0]})`;

      result.push({
        start,
        end,
        color
      });
    }

    match = colorFunctions.exec(text);
    match2 = colorWithoutFunctions.exec(text);
  }

  return result;
}

export function sortStringsDesc(arr) {
  return arr.sort((a, b) => {
    if (b < a) {
      return -1;
    } else if (b > a) {
      return 1;
    } else {
      return 0;
    }
  });
}
