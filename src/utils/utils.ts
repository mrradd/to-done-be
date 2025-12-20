/**
 * Validates if a string is a valid UUID.
 * @param uuid - The string to validate.
 * @returns true if the string is a valid UUID, false otherwise.
 */
export const isValidUUID = (uuid: string): boolean => {
    if (!uuid) {
        return false;
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
};

/**
 * Validates if a string is a valid UTC date in ISO 8601 format.
 * @param dateString - The string to validate.
 * @returns true if the string is a valid UTC date, false otherwise.
 */
export const isValidUtcDate = (dateString: string): boolean => {
    if (!dateString) {
        return false;
    }

    // Regex for ISO 8601 UTC date (e.g., 2023-10-27T10:00:00.000Z or 2023-10-27T10:00:00Z)
    const utcDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/;

    if (!utcDateRegex.test(dateString)) {
        return false;
    }

    const date = new Date(dateString);
    return !isNaN(date.getTime());
};

