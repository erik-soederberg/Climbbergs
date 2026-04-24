// Zone definitions for hangboard
export const ZONES = {
    TOP: { minY: 0, maxY: 80, name: 'Top Row' },
    MIDDLE: { minY: 80, maxY: 120, name: 'Middle' },
    BOTTOM: { minY: 120, maxY: 200, name: 'Bottom Row' },
};

// Grip type restrictions by zone
export const GRIP_ZONE_RESTRICTIONS = {
    'Jug': ['TOP'],           // Jugs only on top
    'Sloper': ['TOP'],        // Slopers only on top
    'Edge': ['TOP', 'MIDDLE', 'BOTTOM'],  // Edges anywhere
    'Crimp': ['TOP', 'MIDDLE', 'BOTTOM'], // Crimps anywhere
    'Pocket': ['TOP', 'MIDDLE', 'BOTTOM'], // Pockets anywhere
    'Pinch': ['MIDDLE', 'BOTTOM'],        // Pinches not on top
};

/**
 * Check if a grip type can be placed at a given Y position
 */
export function canPlaceGripAtPosition(gripTypeName, y) {
    const allowedZones = GRIP_ZONE_RESTRICTIONS[gripTypeName];
    if (!allowedZones) return true; // Unknown grip type = allow anywhere

    // Check which zone the Y position falls into
    for (const [zoneName, zone] of Object.entries(ZONES)) {
        if (y >= zone.minY && y <= zone.maxY) {
            return allowedZones.includes(zoneName);
        }
    }

    return false;
}

/**
 * Get the closest valid Y position for a grip type
 */
export function getValidYPosition(gripTypeName, requestedY) {
    if (canPlaceGripAtPosition(gripTypeName, requestedY)) {
        return requestedY;
    }

    const allowedZones = GRIP_ZONE_RESTRICTIONS[gripTypeName];
    if (!allowedZones || allowedZones.length === 0) return requestedY;

    // Find the closest allowed zone
    let closestY = requestedY;
    let minDistance = Infinity;

    for (const zoneName of allowedZones) {
        const zone = ZONES[zoneName];
        const zoneCenterY = (zone.minY + zone.maxY) / 2;
        const distance = Math.abs(requestedY - zoneCenterY);

        if (distance < minDistance) {
            minDistance = distance;
            closestY = zoneCenterY;
        }
    }

    return closestY;
}

/**
 * Visual zone indicator for canvas
 */
export function getZoneIndicators(canvasHeight = 200) {
    return [
        {
            zone: 'TOP',
            y: ZONES.TOP.maxY,
            label: 'Jugs & Slopers only',
            color: 'rgba(139, 111, 71, 0.15)',
        },
    ];
}