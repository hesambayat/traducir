interface KeyProps {
  label: string;
  selected?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  onMove?: () => void;
}

export const Key = ({ label, selected, onStart, onEnd, onMove }: KeyProps) => 
  <button
    data-testid="key"
    className={selected ? 'key key--selected' : 'key'}
    onMouseDown={onStart}
    onMouseUp={onEnd} 
    onMouseMove={onMove}>{label}</button>

export default Key
