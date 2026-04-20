import { describe, expect, it } from '@rstest/core';
import { validateAge, validateEmail, validatePassword } from '../src/validator';

describe('validator utilities', () => {
  describe('validateEmail', () => {
    it('should return error for empty email', () => {
      const result = validateEmail('');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Email is required');
    });

    it('should return error for email without @', () => {
      const result = validateEmail('invalidemail.com');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Email must contain @');
    });

    it('should return error for email without domain dot', () => {
      const result = validateEmail('test@localhost');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Email must contain a domain');
    });

    it('should validate correct email', () => {
      const result = validateEmail('test@example.com');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should return error for local part too long', () => {
      const longLocal = 'a'.repeat(65);
      const result = validateEmail(`${longLocal}@example.com`);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Local part too long');
    });

    // Note: Domain too long branch is intentionally not tested
    // to show partial branch coverage
  });

  describe('validatePassword', () => {
    it('should return error for empty password', () => {
      const result = validatePassword('');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password is required');
    });

    it('should return error for short password', () => {
      const result = validatePassword('Ab1!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must be at least 8 characters');
    });

    it('should return error for password without uppercase', () => {
      const result = validatePassword('password1!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain an uppercase letter');
    });

    it('should return error for password without lowercase', () => {
      const result = validatePassword('PASSWORD1!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain a lowercase letter');
    });

    it('should return error for password without number', () => {
      const result = validatePassword('Password!!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain a number');
    });

    it('should return error for password without special character', () => {
      const result = validatePassword('Password1a');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain a special character');
    });

    it('should validate correct password', () => {
      const result = validatePassword('SecureP@ss1');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    // Note: Password too long branch is intentionally not tested
  });

  describe('validateAge', () => {
    it('should return error for null age', () => {
      const result = validateAge(null);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Age is required');
    });

    it('should return error for undefined age', () => {
      const result = validateAge(undefined);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Age is required');
    });

    it('should return error for non-number age', () => {
      const result = validateAge('25');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Age must be a number');
    });

    it('should validate correct age', () => {
      const result = validateAge(25);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    // Note: Following branches are intentionally not tested:
    // - Non-integer age
    // - Negative age
    // - Age > 150
  });
});
