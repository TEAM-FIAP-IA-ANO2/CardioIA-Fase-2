import styles from './Button.module.css'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
}) {
  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    isLoading ? styles.loading : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={cls}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? <span className="spinner" /> : children}
    </button>
  )
}
