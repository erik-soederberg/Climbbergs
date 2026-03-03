/**
 * Creates a mirrored copy of a grip
 * @param {object} grip - Original grip
 * @param {number} canvasWidth - Width of canvas
 * @returns {object} - Mirrored grip
 */
export function mirrorGrip(grip, canvasWidth) {
    const centerX = canvasWidth / 2;
    const distanceFromCenter = grip.x - centerX;

    return {
        ...grip,
        id: `${grip.id}-mirror`,
        x: centerX - distanceFromCenter,
        isMirrored: true,
        originalId: grip.id,
    };
}

/**
 * Get all grips with their mirrors
 * @param {array} grips - Original grips
 * @param {number} canvasWidth - Canvas width
 * @param {boolean} symmetryEnabled - Is symmetry on
 * @returns {array} - Grips + mirrors
 */
export function getGripsWithMirrors(grips, canvasWidth, symmetryEnabled) {
    if (!symmetryEnabled) return grips;

    const originalGrips = grips.filter(g => !g.isMirrored);
    const mirroredGrips = originalGrips.map(g => mirrorGrip(g, canvasWidth));

    return [...originalGrips, ...mirroredGrips];
}

/**
 * Check if grip is on center line
 * @param {object} grip - Grip to check
 * @param {number} canvasWidth - Canvas width
 * @param {number} tolerance - Tolerance in pixels
 * @returns {boolean}
 */
export function isOnCenterLine(grip, canvasWidth, tolerance = 10) {
    const centerX = canvasWidth / 2;
    return Math.abs(grip.x - centerX) < tolerance;
}