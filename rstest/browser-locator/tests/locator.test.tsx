import { page } from '@rstest/browser';
import { cleanup, render } from '@rstest/browser-react';
import { afterEach, expect, test } from '@rstest/core';

afterEach(() => {
  cleanup();
});

// =============================================================================
// Query API
// =============================================================================

test('getByRole', async () => {
  await render(<button>Submit</button>);
  await expect.element(page.getByRole('button', { name: 'Submit' })).toBeVisible();
});

test('getByText', async () => {
  await render(<p>Hello world</p>);
  await expect.element(page.getByText('Hello world')).toBeVisible();
});

test('getByLabel', async () => {
  await render(
    <>
      <label htmlFor="name">Name</label>
      <input id="name" />
    </>,
  );
  await page.getByLabel('Name').fill('Alice');
  await expect.element(page.getByLabel('Name')).toHaveValue('Alice');
});

test('getByPlaceholder', async () => {
  await render(<input placeholder="Search..." />);
  await page.getByPlaceholder('Search...').fill('test');
  await expect.element(page.getByPlaceholder('Search...')).toHaveValue('test');
});

test('getByAltText', async () => {
  await render(<img alt="User avatar" src="" />);
  await expect.element(page.getByAltText('User avatar')).toBeAttached();
});

test('getByTitle', async () => {
  await render(<span title="Help">?</span>);
  await expect.element(page.getByTitle('Help')).toBeVisible();
});

test('getByTestId', async () => {
  await render(<div data-testid="settings-panel">Settings</div>);
  await expect.element(page.getByTestId('settings-panel')).toHaveText('Settings');
});

test('locator (CSS selector)', async () => {
  await render(<div className="todo-item">Buy milk</div>);
  await expect.element(page.locator('.todo-item')).toHaveText('Buy milk');
});

// =============================================================================
// Composition API
// =============================================================================

test('filter with has', async () => {
  await render(
    <>
      <section>
        <h2>Home</h2>
        <button>Save</button>
      </section>
      <section>
        <h2>Profile</h2>
        <button>Save</button>
      </section>
    </>,
  );
  const profileSave = page
    .locator('section')
    .filter({ has: page.getByRole('heading', { name: 'Profile' }) })
    .getByRole('button', { name: 'Save' });
  await expect.element(profileSave).toHaveCount(1);
});

test('filter with hasNot', async () => {
  await render(
    <>
      <section>
        <h2>Home</h2>
        <button>Save</button>
      </section>
      <section>
        <h2>Profile</h2>
        <button>Save</button>
      </section>
    </>,
  );
  const notProfileSave = page
    .locator('section')
    .filter({ hasNot: page.getByRole('heading', { name: 'Profile' }) })
    .getByRole('button', { name: 'Save' });
  await expect.element(notProfileSave).toHaveCount(1);
});

test('filter with hasText', async () => {
  await render(
    <ul>
      <li>Apple</li>
      <li>Banana</li>
      <li>Cherry</li>
    </ul>,
  );
  await expect.element(page.locator('li').filter({ hasText: 'Banana' })).toHaveCount(1);
});

test('filter with hasNotText', async () => {
  await render(
    <ul>
      <li>Apple</li>
      <li>Banana</li>
      <li>Cherry</li>
    </ul>,
  );
  await expect.element(page.locator('li').filter({ hasNotText: 'Banana' })).toHaveCount(2);
});

test('and / or', async () => {
  await render(
    <>
      <button id="submit-btn">Submit</button>
      <input placeholder="Name" />
      <input placeholder="Email" />
    </>,
  );
  await expect
    .element(page.getByRole('button', { name: 'Submit' }).and(page.locator('#submit-btn')))
    .toHaveCount(1);
  await expect
    .element(page.getByPlaceholder('Name').or(page.getByPlaceholder('Email')))
    .toHaveCount(2);
});

test('nth / first / last', async () => {
  await render(
    <ul>
      <li>First</li>
      <li>Second</li>
      <li>Third</li>
    </ul>,
  );
  const items = page.locator('li');
  await expect.element(items.first()).toHaveText('First');
  await expect.element(items.nth(1)).toHaveText('Second');
  await expect.element(items.last()).toHaveText('Third');
});

// =============================================================================
// Interaction API
// =============================================================================

test('click', async () => {
  let clicked = false;
  await render(
    <button
      onClick={() => {
        clicked = true;
      }}
    >
      Click me
    </button>,
  );
  await page.getByRole('button', { name: 'Click me' }).click();
  expect(clicked).toBe(true);
});

test('dblclick', async () => {
  let count = 0;
  await render(
    <button
      onDoubleClick={() => {
        count++;
      }}
    >
      Double
    </button>,
  );
  await page.getByRole('button', { name: 'Double' }).dblclick();
  expect(count).toBe(1);
});

test('hover', async () => {
  let hovered = false;
  await render(
    <button
      onMouseEnter={() => {
        hovered = true;
      }}
    >
      Hover me
    </button>,
  );
  await page.getByRole('button', { name: 'Hover me' }).hover();
  expect(hovered).toBe(true);
});

test('fill and clear', async () => {
  await render(<input placeholder="Enter text" />);
  const input = page.getByPlaceholder('Enter text');
  await input.fill('hello');
  await expect.element(input).toHaveValue('hello');
  await input.clear();
  await expect.element(input).toHaveValue('');
});

test('focus and blur', async () => {
  await render(<input id="field" />);
  const field = page.locator('#field');
  await field.focus();
  await expect.element(field).toBeFocused();
  await field.blur();
  await expect.element(field).not.toBeFocused();
});

test('press', async () => {
  await render(<input id="field" />);
  const field = page.locator('#field');
  await field.focus();
  await field.press('a');
  await expect.element(field).toHaveValue('a');
});

test('check and uncheck', async () => {
  await render(
    <label>
      <input type="checkbox" /> Agree
    </label>,
  );
  const cb = page.getByLabel('Agree');
  await cb.check();
  await expect.element(cb).toBeChecked();
  await cb.uncheck();
  await expect.element(cb).toBeUnchecked();
});

test('selectOption', async () => {
  await render(
    <>
      <label htmlFor="fruit">Fruit</label>
      <select id="fruit">
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
      </select>
    </>,
  );
  await page.getByLabel('Fruit').selectOption('banana');
  await expect.element(page.getByLabel('Fruit')).toHaveValue('banana');
});

test('scrollIntoViewIfNeeded', async () => {
  await render(
    <>
      <div style={{ height: '3000px' }} />
      <button id="bottom-btn">Bottom</button>
    </>,
  );
  await page.locator('#bottom-btn').scrollIntoViewIfNeeded();
  await expect.element(page.locator('#bottom-btn')).toBeInViewport();
});

// =============================================================================
// Assertion API
// =============================================================================

test('toBeVisible / toBeHidden', async () => {
  await render(
    <>
      <div id="show">Visible</div>
      <div id="hide" style={{ display: 'none' }}>
        Hidden
      </div>
    </>,
  );
  await expect.element(page.locator('#show')).toBeVisible();
  await expect.element(page.locator('#hide')).toBeHidden();
});

test('toBeEnabled / toBeDisabled', async () => {
  await render(
    <>
      <button id="ok">OK</button>
      <button id="no" disabled>
        No
      </button>
    </>,
  );
  await expect.element(page.locator('#ok')).toBeEnabled();
  await expect.element(page.locator('#no')).toBeDisabled();
});

test('toBeChecked / toBeUnchecked', async () => {
  await render(
    <label>
      <input type="checkbox" /> Terms
    </label>,
  );
  const cb = page.getByLabel('Terms');
  await expect.element(cb).toBeUnchecked();
  await cb.check();
  await expect.element(cb).toBeChecked();
});

test('toBeEditable', async () => {
  await render(
    <>
      <input id="editable" />
      <input id="readonly" readOnly />
    </>,
  );
  await expect.element(page.locator('#editable')).toBeEditable();
  await expect.element(page.locator('#readonly')).not.toBeEditable();
});

test('toBeFocused', async () => {
  await render(<input id="f" />);
  await page.locator('#f').focus();
  await expect.element(page.locator('#f')).toBeFocused();
});

test('toBeEmpty', async () => {
  await render(<input id="empty" />);
  await expect.element(page.locator('#empty')).toBeEmpty();
});

test('toBeInViewport', async () => {
  await render(<div id="box">Box</div>);
  await expect.element(page.locator('#box')).toBeInViewport();
});

test('toHaveText / toContainText', async () => {
  await render(<p id="msg">Hello World</p>);
  await expect.element(page.locator('#msg')).toHaveText('Hello World');
  await expect.element(page.locator('#msg')).toContainText('Hello');
});

test('toHaveValue', async () => {
  await render(<input id="v" defaultValue="abc" />);
  await expect.element(page.locator('#v')).toHaveValue('abc');
});

test('toHaveId', async () => {
  await render(<div id="my-id">content</div>);
  await expect.element(page.locator('#my-id')).toHaveId('my-id');
});

test('toHaveAttribute', async () => {
  await render(
    <button type="submit" id="s">
      Submit
    </button>,
  );
  await expect.element(page.locator('#s')).toHaveAttribute('type');
  await expect.element(page.locator('#s')).toHaveAttribute('type', 'submit');
});

test('toHaveCount', async () => {
  await render(
    <ul>
      <li>A</li>
      <li>B</li>
      <li>C</li>
    </ul>,
  );
  await expect.element(page.locator('li')).toHaveCount(3);
});

test('toHaveClass', async () => {
  await render(
    <div className="foo bar" id="c">
      styled
    </div>,
  );
  await expect.element(page.locator('#c')).toHaveClass(/foo/);
});

test('toHaveCSS', async () => {
  await render(
    <div id="styled" style={{ display: 'block' }}>
      text
    </div>,
  );
  await expect.element(page.locator('#styled')).toHaveCSS('display', 'block');
});

test('toHaveJSProperty', async () => {
  await render(
    <label>
      <input type="checkbox" defaultChecked /> Opt
    </label>,
  );
  await expect.element(page.getByLabel('Opt')).toHaveJSProperty('checked', true);
});

test('not modifier', async () => {
  await render(<button>Active</button>);
  await expect.element(page.getByRole('button', { name: 'Active' })).not.toBeDisabled();
  await expect.element(page.getByRole('button', { name: 'Active' })).not.toBeHidden();
});

// =============================================================================
// Configuration API
// =============================================================================

test('setTestIdAttribute', async () => {
  const { setTestIdAttribute } = await import('@rstest/browser');
  await setTestIdAttribute('data-qa');
  await render(<div data-qa="panel">Content</div>);
  await expect.element(page.getByTestId('panel')).toHaveText('Content');
  await setTestIdAttribute('data-testid');
});

// =============================================================================
// Auto-retry: expect.element should keep retrying until timeout
// =============================================================================

test('auto-retry: toBeVisible waits for async DOM insertion', async () => {
  await render(<div id="async-root" />);
  setTimeout(() => {
    const el = document.createElement('p');
    el.textContent = 'Async loaded content';
    document.getElementById('async-root')!.appendChild(el);
  }, 500);
  await expect.element(page.getByText('Async loaded content')).toBeVisible();
});

test('auto-retry: toBeHidden waits for async removal', async () => {
  await render(<div id="spinner">Loading...</div>);
  setTimeout(() => {
    document.getElementById('spinner')!.style.display = 'none';
  }, 500);
  await expect.element(page.locator('#spinner')).toBeHidden();
});

test('auto-retry: toHaveText waits for async text update', async () => {
  await render(<p id="status">Pending</p>);
  setTimeout(() => {
    document.getElementById('status')!.textContent = 'Complete';
  }, 500);
  await expect.element(page.locator('#status')).toHaveText('Complete');
});

test('auto-retry: toHaveValue waits for async input change', async () => {
  await render(<input id="async-input" />);
  setTimeout(() => {
    const input = document.getElementById('async-input') as HTMLInputElement;
    const nativeSet = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
    nativeSet.call(input, 'auto-filled');
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }, 500);
  await expect.element(page.locator('#async-input')).toHaveValue('auto-filled');
});

test('auto-retry: toHaveCount waits for async list growth', async () => {
  await render(
    <ul id="list">
      <li>Item 1</li>
    </ul>,
  );
  setTimeout(() => {
    const list = document.getElementById('list')!;
    list.innerHTML += '<li>Item 2</li><li>Item 3</li>';
  }, 500);
  await expect.element(page.locator('#list li')).toHaveCount(3);
});

test('auto-retry: toBeChecked waits for async check', async () => {
  await render(
    <label>
      <input type="checkbox" id="async-cb" /> Auto
    </label>,
  );
  setTimeout(() => {
    (document.getElementById('async-cb') as HTMLInputElement).checked = true;
  }, 500);
  await expect.element(page.locator('#async-cb')).toBeChecked();
});

test('auto-retry: custom timeout option works', async () => {
  await render(<div id="delayed" />);
  setTimeout(() => {
    document.getElementById('delayed')!.textContent = 'Ready';
  }, 800);
  await expect.element(page.locator('#delayed')).toHaveText('Ready', { timeout: 2000 });
});
