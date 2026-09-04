const worker = new Worker(new URL('./worker.ts', import.meta.url));

worker.onmessage = (event) => {
  console.log('The results from Workers:', event.data);
};

worker.postMessage(10);
