module.exports = arr =>
  arr
    .reduce(
      (acc, curr) =>
        acc.length && acc[acc.length - 1].char === curr
          ? [
              ...acc.slice(0, acc.length - 1),
              { char: curr, times: acc[acc.length - 1].times + 1 }
            ]
          : [...acc, { char: curr, times: 1 }],
      []
    )
    .reduce((acc, curr) => acc + `${curr.times}${curr.char}`, "");
