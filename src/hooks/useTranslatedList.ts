import { useTranslation } from 'react-i18next';
import { toValidList } from '../utils/translationGuards';

/**
 * Reads an array resource from i18n (`returnObjects`) and keeps only the items
 * that satisfy `isItem`. Missing or malformed resources yield an empty list.
 */
export const useTranslatedList = <T>(key: string, isItem: (value: unknown) => value is T): T[] => {
  const { t } = useTranslation();
  const resource: unknown = t(key, { returnObjects: true });
  return toValidList(resource, isItem);
};
