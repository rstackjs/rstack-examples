/**
 * HTML template generator for snapshot testing
 */

export interface ComponentProps {
  id?: string;
  className?: string;
  children?: string;
  attributes?: Record<string, string>;
}

/**
 * Generate a div element HTML
 */
export function div(props: ComponentProps = {}): string {
  const { id, className, children = '', attributes = {} } = props;

  const attrs = [
    id ? `id="${id}"` : '',
    className ? `class="${className}"` : '',
    ...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`),
  ]
    .filter(Boolean)
    .join(' ');

  return `<div${attrs ? ` ${attrs}` : ''}>${children}</div>`;
}

/**
 * Generate a button element HTML
 */
export function button(props: ComponentProps & { type?: string; disabled?: boolean } = {}): string {
  const {
    id,
    className,
    children = '',
    type = 'button',
    disabled = false,
    attributes = {},
  } = props;

  const attrs = [
    `type="${type}"`,
    id ? `id="${id}"` : '',
    className ? `class="${className}"` : '',
    disabled ? 'disabled' : '',
    ...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`),
  ]
    .filter(Boolean)
    .join(' ');

  return `<button ${attrs}>${children}</button>`;
}

/**
 * Generate a list HTML
 */
export function list(items: string[], ordered = false): string {
  const tag = ordered ? 'ol' : 'ul';
  const listItems = items.map((item) => `  <li>${item}</li>`).join('\n');
  return `<${tag}>\n${listItems}\n</${tag}>`;
}
