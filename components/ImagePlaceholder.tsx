interface ImagePlaceholderProps {
  label: string
  variant?: 'default' | 'dark' | 'flame'
  grain?: boolean
  style?: React.CSSProperties
  className?: string
}

export default function ImagePlaceholder({
  label,
  variant = 'default',
  grain = false,
  style,
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={`placeholder${variant !== 'default' ? ` ${variant}` : ''}${grain ? ' grain' : ''}${className ? ` ${className}` : ''}`}
      style={style}
    >
      {label}
    </div>
  )
}
