import { useMemo } from 'react'

interface ButtonProps {
  icon?: string
  disabled?: boolean
  label: string
  onClick?: () => void
}

export const Button = ({ label, onClick, icon = '', disabled = false }: ButtonProps) => {
  const attributes = useMemo(() => {
    const attr: { 'data-icon'?: string } = {}
    if (icon) {
      attr['data-icon'] = icon
    }

    return attr
  }, [icon])

  return <button
    data-testid="button"
    className="button"
    disabled={disabled}
    onClick={onClick}
    {...attributes}>{label}</button>
}

export default Button
