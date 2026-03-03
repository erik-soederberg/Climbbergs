/**
 * Snaps a coordinate to the nearest grid point
 * @param {number} value - The coordinate to snap
 * @param {number} gridSize - The grid size in pixels
 * @returns {number} - Snapped coordinate
 */
export function snapToGrid(value, gridSize) {
  return Math.round(value / gridSize) * gridSize;
}

/**
 * Snaps a grip position to grid
 * @param {object} grip - Grip with x, y coordinates
 * @param {number} gridSize - Grid size
 * @returns {object} - Grip with snapped coordinates
 */
export function snapGripToGrid(grip, gridSize) {
  return {
    ...grip,
    x: snapToGrid(grip.x, gridSize),
    y: snapToGrid(grip.y, gridSize),
  };
}

/**
 * Get visual grid overlay points for canvas
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 * @param {number} gridSize - Grid size
 * @returns {array} - Array of grid line coordinates
 */
export function getGridLines(width, height, gridSize) {
  const lines = [];
  
  // Vertical lines
  for (let x = 0; x <= width; x += gridSize) {
    lines.push({ x1: x, y1: 0, x2: x, y2: height, type: 'vertical' });
  }
  
  // Horizontal lines
  for (let y = 0; y <= height; y += gridSize) {
    lines.push({ x1: 0, y1: y, x2: width, y2: y, type: 'horizontal' });
  }
  
  return lines;
}