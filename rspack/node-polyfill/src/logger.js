export default function logger(method, ...args) {
  console[method](...args);
}
