interface ButtonProps {
  disabled?: boolean;
  label: string;
  onClick?: () => void;
}

export const Button = ({ label, onClick, disabled = false }: ButtonProps) => 
  <button
    data-testid="button"
    className="button"
    disabled={disabled}
    onClick={onClick}>{label}</button>

export default Button
