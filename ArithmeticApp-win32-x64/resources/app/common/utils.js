const randomNum = (min = 0, max) => ~~(Math.random() * (max - min + 1) + min);

export {
  randomNum,
}