// Helper function to adjust color brightness
function adjustColor(color, amount) {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Main GripShape2D component
export default function GripShape2D({ grip, isSelected }) {
    const commonStyles = {
        position: 'absolute',
        left: `${grip.x - grip.size / 2}px`,
        top: `${grip.y - grip.size / 2}px`,
        transform: `rotate(${grip.rotation}deg)`,
        cursor: 'move',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        filter: isSelected
            ? 'drop-shadow(0 10px 20px rgba(0,0,0,0.3)) brightness(1.1)'
            : 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))',
    };

    const depthOffset = grip.depth || 0;
    const shadowIntensity = 0.1 + (depthOffset / 100);
    const borderStyle = isSelected ? '3px solid #FFC107' : '2px solid rgba(0,0,0,0.3)';

    // Jug - Large positive hold
    if (grip.type.name === 'Jug') {
        return (
            <div style={{
                ...commonStyles,
                width: `${grip.size * 1.5}px`,
                height: `${grip.size}px`,
                borderRadius: '50%',
                background: `radial-gradient(ellipse at 40% 30%, ${adjustColor(grip.type.color, 40)}, ${grip.type.color} 50%, ${adjustColor(grip.type.color, -30)})`,
                border: borderStyle,
                boxShadow: `
          inset 0 -${2 + depthOffset}px ${4 + depthOffset}px rgba(0,0,0,${shadowIntensity}),
          0 ${4 + depthOffset}px ${8 + depthOffset}px rgba(0,0,0,0.3),
          ${isSelected ? '0 0 0 4px rgba(255,193,7,0.3)' : ''}
        `,
            }}>
                <div style={{
                    position: 'absolute',
                    bottom: `${20 + depthOffset/2}%`,
                    left: '10%',
                    right: '10%',
                    height: '4px',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(0,0,0,0.4))',
                    borderRadius: '2px',
                    boxShadow: `0 2px 4px rgba(0,0,0,${shadowIntensity})`,
                }} />
                <div style={{
                    position: 'absolute',
                    top: '15%',
                    left: '15%',
                    width: '30%',
                    height: '20%',
                    background: 'radial-gradient(ellipse, rgba(255,255,255,0.4), transparent)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                }} />
            </div>
        );
    }

    // Crimp - Small edge
    if (grip.type.name === 'Crimp') {
        return (
            <div style={{
                ...commonStyles,
                width: `${grip.size * 1.2}px`,
                height: `${grip.size * 0.4}px`,
                borderRadius: '4px',
                background: `linear-gradient(180deg, ${grip.type.color}, ${adjustColor(grip.type.color, -40)})`,
                border: borderStyle,
                boxShadow: `
          inset 0 -2px 4px rgba(0,0,0,${shadowIntensity}),
          0 ${2 + depthOffset}px ${4 + depthOffset}px rgba(0,0,0,0.3),
          ${isSelected ? '0 0 0 4px rgba(255,193,7,0.3)' : ''}
        `,
            }}>
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '5%',
                    right: '5%',
                    height: '40%',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '2px 2px 0 0',
                }} />
            </div>
        );
    }

    // Sloper - Rounded hold
    if (grip.type.name === 'Sloper') {
        return (
            <div style={{
                ...commonStyles,
                width: `${grip.size}px`,
                height: `${grip.size * 0.7}px`,
                borderRadius: '50% 50% 45% 45%',
                background: `radial-gradient(ellipse at 50% 30%, ${adjustColor(grip.type.color, 20)}, ${grip.type.color})`,
                border: borderStyle,
                boxShadow: `
          inset 0 -3px 6px rgba(0,0,0,${shadowIntensity}),
          0 ${3 + depthOffset}px ${6 + depthOffset}px rgba(0,0,0,0.3),
          ${isSelected ? '0 0 0 4px rgba(255,193,7,0.3)' : ''}
        `,
            }}>
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '20%',
                    width: '40%',
                    height: '30%',
                    background: 'radial-gradient(ellipse, rgba(255,255,255,0.3), transparent)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                }} />
            </div>
        );
    }

    // Pocket - Circular with hole
    if (grip.type.name === 'Pocket') {
        return (
            <div style={{
                ...commonStyles,
                width: `${grip.size}px`,
                height: `${grip.size}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${adjustColor(grip.type.color, -30)} 0%, ${grip.type.color} 40%, ${adjustColor(grip.type.color, -20)} 100%)`,
                border: borderStyle,
                boxShadow: `
          inset 0 -2px 4px rgba(0,0,0,${shadowIntensity}),
          0 ${3 + depthOffset}px ${6 + depthOffset}px rgba(0,0,0,0.3),
          ${isSelected ? '0 0 0 4px rgba(255,193,7,0.3)' : ''}
        `,
            }}>
                <div style={{
                    position: 'absolute',
                    top: '30%',
                    left: '30%',
                    width: '40%',
                    height: '40%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #1a1a1a, #2a2a2a)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)',
                }} />
            </div>
        );
    }

    // Pinch - Vertical narrow
    if (grip.type.name === 'Pinch') {
        return (
            <div style={{
                ...commonStyles,
                width: `${grip.size * 0.5}px`,
                height: `${grip.size * 1.2}px`,
                borderRadius: `${grip.size * 0.25}px`,
                background: `linear-gradient(90deg, ${adjustColor(grip.type.color, -20)}, ${grip.type.color}, ${adjustColor(grip.type.color, -20)})`,
                border: borderStyle,
                boxShadow: `
          inset 0 -2px 4px rgba(0,0,0,${shadowIntensity}),
          0 ${2 + depthOffset}px ${4 + depthOffset}px rgba(0,0,0,0.3),
          ${isSelected ? '0 0 0 4px rgba(255,193,7,0.3)' : ''}
        `,
            }}>
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '45%',
                    width: '10%',
                    height: '60%',
                    background: 'rgba(0,0,0,0.1)'
                }} />
            </div>
        );
    }

    // Edge - Flat horizontal
    if (grip.type.name === 'Edge') {
        return (
            <div style={{
                ...commonStyles,
                width: `${grip.size * 1.3}px`,
                height: `${grip.size * 0.5}px`,
                borderRadius: '6px',
                background: `linear-gradient(180deg, ${adjustColor(grip.type.color, 10)}, ${grip.type.color}, ${adjustColor(grip.type.color, -30)})`,
                border: borderStyle,
                boxShadow: `
          inset 0 -2px 4px rgba(0,0,0,${shadowIntensity}),
          0 ${2 + depthOffset}px ${4 + depthOffset}px rgba(0,0,0,0.3),
          ${isSelected ? '0 0 0 4px rgba(255,193,7,0.3)' : ''}
        `,
            }}>
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    height: '50%',
                    background: 'rgba(255,255,255,0.15)',
                    borderRadius: '6px 6px 0 0',
                }} />
            </div>
        );
    }

    // Default fallback
    return (
        <div style={{
            ...commonStyles,
            width: `${grip.size}px`,
            height: `${grip.size}px`,
            borderRadius: '50%',
            backgroundColor: grip.type.color,
            border: borderStyle,
            boxShadow: `
        0 ${2 + depthOffset}px ${4 + depthOffset}px rgba(0,0,0,0.3),
        ${isSelected ? '0 0 0 4px rgba(255,193,7,0.3)' : ''}
      `,
        }} />
    );
}
