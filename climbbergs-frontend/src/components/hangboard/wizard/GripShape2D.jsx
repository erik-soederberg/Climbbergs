// Simple 2D Grip Shape for Wizard
export default function GripShape2D({ grip, isSelected }) {
  const commonStyles = {
    position: 'absolute',
    left: `${grip.x - grip.size / 2}px`,
    top: `${grip.y - grip.size / 2}px`,
    transform: `rotate(${grip.rotation || 0}deg)`,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const getGripShape = () => {
    const size = grip.size || 40;
    const depth = grip.depth || 15;
    
    switch (grip.type) {
      case 'Jug':
        return (
          <div style={{
            ...commonStyles,
            width: `${size * 1.6}px`,
            height: `${size * 0.6}px`,
            borderRadius: '30px',
            background: '#B8956A',
            border: isSelected ? '3px solid #FFC107' : '2px solid #6B5437',
            boxShadow: isSelected 
              ? '0 0 0 4px rgba(255, 193, 7, 0.3), inset 0 -5px 10px rgba(0,0,0,0.4)'
              : 'inset 0 -5px 10px rgba(0,0,0,0.4)',
          }} />
        );

      case 'Crimp':
        return (
          <div style={{
            ...commonStyles,
            width: `${size * 1.4}px`,
            height: `${size * 0.4}px`,
            borderRadius: '8px',
            background: '#B8956A',
            border: isSelected ? '3px solid #FFC107' : '2px solid #6B5437',
            boxShadow: isSelected 
              ? '0 0 0 4px rgba(255, 193, 7, 0.3), inset 0 -3px 6px rgba(0,0,0,0.4)'
              : 'inset 0 -3px 6px rgba(0,0,0,0.4)',
          }} />
        );

      case 'Sloper':
        return (
          <div style={{
            ...commonStyles,
            width: `${size}px`,
            height: `${size * 0.75}px`,
            borderRadius: '50% 50% 38% 38%',
            background: '#B8956A',
            border: isSelected ? '3px solid #FFC107' : '2px solid #6B5437',
            boxShadow: isSelected 
              ? '0 0 0 4px rgba(255, 193, 7, 0.3), inset 0 -4px 8px rgba(0,0,0,0.3)'
              : 'inset 0 -4px 8px rgba(0,0,0,0.3)',
          }} />
        );

      case 'Pocket':
        return (
          <div style={{
            ...commonStyles,
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            background: '#B8956A',
            border: isSelected ? '3px solid #FFC107' : '2px solid #6B5437',
            boxShadow: isSelected 
              ? '0 0 0 4px rgba(255, 193, 7, 0.3), inset 0 0 15px rgba(0,0,0,0.6)'
              : 'inset 0 0 15px rgba(0,0,0,0.6)',
          }}>
            {/* Hole */}
            <div style={{
              position: 'absolute',
              top: '25%',
              left: '25%',
              width: '50%',
              height: '50%',
              borderRadius: '50%',
              background: '#1a1410',
              boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.8)',
            }} />
          </div>
        );

      case 'Pinch':
        return (
          <div style={{
            ...commonStyles,
            width: `${size * 0.6}px`,
            height: `${size * 1.3}px`,
            borderRadius: `${size * 0.3}px`,
            background: '#B8956A',
            border: isSelected ? '3px solid #FFC107' : '2px solid #6B5437',
            boxShadow: isSelected 
              ? '0 0 0 4px rgba(255, 193, 7, 0.3), inset 3px 0 6px rgba(0,0,0,0.3), inset -3px 0 6px rgba(0,0,0,0.3)'
              : 'inset 3px 0 6px rgba(0,0,0,0.3), inset -3px 0 6px rgba(0,0,0,0.3)',
          }} />
        );

      case 'Edge':
        return (
          <div style={{
            ...commonStyles,
            width: `${size * 1.5}px`,
            height: `${size * 0.5}px`,
            borderRadius: '8px',
            background: '#B8956A',
            border: isSelected ? '3px solid #FFC107' : '2px solid #6B5437',
            boxShadow: isSelected 
              ? '0 0 0 4px rgba(255, 193, 7, 0.3), inset 0 -3px 6px rgba(0,0,0,0.4)'
              : 'inset 0 -3px 6px rgba(0,0,0,0.4)',
          }} />
        );

      default:
        return (
          <div style={{
            ...commonStyles,
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            background: '#B8956A',
            border: isSelected ? '3px solid #FFC107' : '2px solid #6B5437',
            boxShadow: isSelected 
              ? '0 0 0 4px rgba(255, 193, 7, 0.3)'
              : 'none',
          }} />
        );
    }
  };

  return getGripShape();
}