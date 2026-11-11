const JSON_FILE_NAME_PATTERN = /([^/]+)\.json$/;

/**
 * Combines per-section locale modules into a single translation object.
 * The file name (without extension) is used as the top-level key, so
 * `./locales/es/about.json` is exposed as `about.*`.
 *
 * @throws Error when a path is not a `.json` file or two files map to the same section.
 */
export const mergeLocaleSections = (
  sectionsByPath: Record<string, Record<string, unknown>>
): Record<string, Record<string, unknown>> => {
  const translation: Record<string, Record<string, unknown>> = {};

  for (const [path, section] of Object.entries(sectionsByPath)) {
    const sectionName = JSON_FILE_NAME_PATTERN.exec(path)?.[1];
    if (!sectionName) {
      throw new Error(`Locale file "${path}" is not a JSON section file`);
    }
    if (sectionName in translation) {
      throw new Error(`Duplicated locale section "${sectionName}" in "${path}"`);
    }
    translation[sectionName] = section;
  }

  return translation;
};
