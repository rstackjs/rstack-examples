declare module '*.css';

declare module 'webpack-hot-middleware/client?*' {
  type Event = { type: string } & Record<string, unknown>;

  const client: {
    subscribe(callback: (event: Event) => void): void;
  };

  export default client;
}
