declare module '*.md' {
  let MDXComponent: () => JSX.Element;
  export default MDXComponent;
}

declare module '*.mdx' {
  let MDXComponent: () => JSX.Element;
  export default MDXComponent;
}
