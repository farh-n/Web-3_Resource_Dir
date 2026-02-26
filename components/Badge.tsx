type BadgeProps = {
  label: string
  variant: 'category' | 'difficulty'
}

const difficultyStyles: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

export default function Badge({ label, variant }: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium'

  const variantStyles =
    variant === 'difficulty'
      ? difficultyStyles[label] ?? 'bg-gray-100 text-gray-600'
      : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'

  return <span className={`${baseStyles} ${variantStyles}`}>{label}</span>
}