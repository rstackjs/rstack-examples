import esbuild from 'esbuild';

export default function workletLoader(source) {
  const result = esbuild.buildSync({
    entryPoints: [this.resource],
    write: false,
    bundle: true,
  });
  const content = result.outputFiles[0].text;
  return content;
}
