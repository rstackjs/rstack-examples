const worker = new Worker(new URL('./worker.js', import.meta.url));

worker.onmessage = (event) => {
  console.log('The results from Workers:', event.data);
};

worker.postMessage(10);
