/**
 * Validates if a string is a valid UUID.
 * @param uuid - The string to validate.
 * @returns true if the string is a valid UUID, false otherwise.
 */
export const isValidUUID = (uuid: string): boolean => {
    if (!isNonEmptyString(uuid)) {
        return false;
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid as string);
};

/**
 * Validates if a string is a valid UTC date in ISO 8601 format.
 * @param dateString - The string to validate.
 * @returns true if the string is a valid UTC date, false otherwise.
 */
export const isValidUtcDate = (dateString: string): boolean => {
    if (!isNonEmptyString(dateString)) {
        return false;
    }

    // Regex UTC date (e.g., 2023-10-27T10:00:00.000Z or 2023-10-27T10:00:00Z)
    const utcDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/;

    if (!utcDateRegex.test(dateString as string)) {
        return false;
    }

    const date = new Date(dateString as string);
    return !isNaN(date.getTime());
};

/**
 * Checks if the value is a string containing at least one non-whitespace character.
 * @param value - The string to validate.
 * @returns true if it is a non empty string, false otherwise.
 */
export const isNonEmptyString = (value: string): boolean => {
    return value.trim().length > 0;
}
