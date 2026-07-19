import { rspack, type RspackOptions, type Stats } from '@rspack/core';

export default function build(
  options: RspackOptions,
  callback: (err: Error | null, stats?: Stats) => void,
): void {
  rspack(options, callback);
}
