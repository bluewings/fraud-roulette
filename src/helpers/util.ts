import { schemeCategory10 as colors } from 'd3-scale-chromatic';

const getColor = (() => {
  const allColors = shuffle([...colors]);
  let index = 0;
  return () => allColors[index++ % allColors.length];
})();

function shuffle(a: any[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export { getColor };
