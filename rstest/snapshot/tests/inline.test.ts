import { describe, expect, it } from '@rstest/core';
import { button, div, list } from '../src/html';

describe('toMatchInlineSnapshot - Basic Usage', () => {
  /**
   * toMatchInlineSnapshot() stores the snapshot directly in the test file.
   * On first run, it will update the test file with the snapshot.
   * Run with --update flag to update existing inline snapshots.
   */

  it('should match div inline snapshot', () => {
    const html = div({ className: 'container', children: 'Hello World' });

    expect(html).toMatchInlineSnapshot(`"<div class="container">Hello World</div>"`);
  });

  it('should match button inline snapshot', () => {
    const html = button({
      id: 'submit-btn',
      className: 'btn btn-primary',
      children: 'Submit',
    });

    expect(html).toMatchInlineSnapshot(
      `"<button type="button" id="submit-btn" class="btn btn-primary">Submit</button>"`,
    );
  });

  it('should match disabled button inline snapshot', () => {
    const html = button({
      className: 'btn',
      children: 'Disabled',
      disabled: true,
    });

    expect(html).toMatchInlineSnapshot(
      `"<button type="button" class="btn" disabled>Disabled</button>"`,
    );
  });
});

describe('toMatchInlineSnapshot - Lists', () => {
  it('should match unordered list inline snapshot', () => {
    const html = list(['Item 1', 'Item 2', 'Item 3']);

    expect(html).toMatchInlineSnapshot(`
"<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>"
`);
  });

  it('should match ordered list inline snapshot', () => {
    const html = list(['First', 'Second', 'Third'], true);

    expect(html).toMatchInlineSnapshot(`
"<ol>
  <li>First</li>
  <li>Second</li>
  <li>Third</li>
</ol>"
`);
  });
});

describe('toMatchInlineSnapshot - Objects', () => {
  it('should match simple object inline snapshot', () => {
    const obj = { name: 'test', value: 42 };

    expect(obj).toMatchInlineSnapshot(`
{
  "name": "test",
  "value": 42,
}
`);
  });

  it('should match array inline snapshot', () => {
    const arr = [1, 2, 3, 4, 5];

    expect(arr).toMatchInlineSnapshot(`
[
  1,
  2,
  3,
  4,
  5,
]
`);
  });
});
