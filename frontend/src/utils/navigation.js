let history;
export const registerNav = (ref) => {
  if (ref && ref.history) {
    history = ref.history;
  }
};

const jumpTo = (uri) => {
  history.push(uri);
};
export const go = (uri) => {
  console.log(uri);
  history.go(uri);
};
export default jumpTo;
