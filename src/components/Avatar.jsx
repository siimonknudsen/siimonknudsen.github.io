function Avatar({ name, title, size = 'small' }) {
  const isLarge = size === 'large'
  const avatarSize = isLarge ? 'w-[148px] h-[148px]' : 'w-[42px] h-[42px]'
  const gap = isLarge ? 'gap-6' : 'gap-3'
  const layout = isLarge ? 'flex-col items-center' : 'flex-row items-center'

  return (
    <div className={`flex ${layout} ${gap}`}>
      <div className={`${avatarSize} rounded-full overflow-hidden flex-shrink-0 bg-surface-color-tertiary`}>
        <img
          src={`${import.meta.env.BASE_URL}simon-virtual.png`}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-0">
        <span className={`${isLarge ? 'type-heading-sm' : 'type-label'} text-color-primary`}>{name}</span>
        <span className={`${isLarge ? 'type-display' : 'type-caption'} text-color-secondary`}>{title}</span>
      </div>
    </div>
  )
}

export default Avatar
