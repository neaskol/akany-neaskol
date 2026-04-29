interface ImagePlaceholderProps {
  label: string
  variant?: 'default' | 'dark' | 'flame'
  grain?: boolean
  style?: React.CSSProperties
  className?: string
  role?: string
  'aria-label'?: string
}

export default function ImagePlaceholder({
  label,
  variant = 'default',
  grain = false,
  style,
  className,
  role = 'img',
  'aria-label': ariaLabel,
}: ImagePlaceholderProps) {
  return (
    <div
      role={role}
      aria-label={ariaLabel ?? label}
      className={`placeholder${variant !== 'default' ? ` ${variant}` : ''}${grain ? ' grain' : ''}${className ? ` ${className}` : ''}`}
      style={style}
    >
      <span aria-hidden="true">{label}</span>
    </div>
  )
}
