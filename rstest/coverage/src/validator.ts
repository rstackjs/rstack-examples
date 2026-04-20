/**
 * Validation utilities demonstrating branch coverage
 */

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate an email address
 * Multiple branches for different validation rules
 */
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];

  if (!email) {
    errors.push('Email is required');
    return { valid: false, errors };
  }

  if (!email.includes('@')) {
    errors.push('Email must contain @');
  }

  if (!email.includes('.')) {
    errors.push('Email must contain a domain');
  }

  const [local, domain] = email.split('@');

  if (local && local.length > 64) {
    errors.push('Local part too long');
  }

  if (domain && domain.length > 255) {
    errors.push('Domain too long');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate a password with multiple criteria
 */
export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];

  if (!password) {
    errors.push('Password is required');
    return { valid: false, errors };
  }

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  if (password.length > 128) {
    errors.push('Password must be at most 128 characters');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain an uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain a lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain a number');
  }

  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Password must contain a special character');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * This function has branches that are intentionally not fully tested
 * to demonstrate partial branch coverage
 */
export function validateAge(age: unknown): ValidationResult {
  const errors: string[] = [];

  if (age === null || age === undefined) {
    errors.push('Age is required');
    return { valid: false, errors };
  }

  if (typeof age !== 'number') {
    errors.push('Age must be a number');
    return { valid: false, errors };
  }

  if (!Number.isInteger(age)) {
    errors.push('Age must be an integer');
  }

  if (age < 0) {
    errors.push('Age cannot be negative');
  }

  if (age > 150) {
    errors.push('Age seems unrealistic');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
