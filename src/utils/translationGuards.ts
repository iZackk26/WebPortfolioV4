import type {
  DetailChallenge,
  DetailProductionFeature,
  DetailSystemState,
  DetailTechnology,
} from '../types/projectDetail';

type Guard<T> = (value: unknown) => value is T;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const hasStringFields = (value: unknown, fields: readonly string[]): value is Record<string, string> =>
  isRecord(value) && fields.every((field) => typeof value[field] === 'string');

export const isString: Guard<string> = (value): value is string => typeof value === 'string';

export const isTechnology: Guard<DetailTechnology> = (value): value is DetailTechnology =>
  hasStringFields(value, ['name', 'category']);

export const isChallenge: Guard<DetailChallenge> = (value): value is DetailChallenge =>
  hasStringFields(value, ['title', 'description']);

export const isSystemState: Guard<DetailSystemState> = (value): value is DetailSystemState =>
  hasStringFields(value, ['name', 'description']);

export const isProductionFeature: Guard<DetailProductionFeature> = (value): value is DetailProductionFeature =>
  hasStringFields(value, ['icon', 'title', 'description']);

/**
 * Narrows a translation resource expected to be a list.
 * Returns an empty list when the value is not an array, and drops malformed items,
 * so a broken locale file degrades to "nothing rendered" instead of crashing the page.
 */
export const toValidList = <T>(value: unknown, isItem: Guard<T>): T[] =>
  Array.isArray(value) ? value.filter(isItem) : [];
