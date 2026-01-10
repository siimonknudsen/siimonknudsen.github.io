function Avatar({ name, title, size = 'small' }) {
  const avatarSize = size === 'large' ? 'w-[148px] h-[148px]' : 'w-[42px] h-[42px]';
  const nameSize = size === 'large' ? 'text-2xl' : 'text-[15px]';
  const titleSize = size === 'large' ? 'text-5xl' : 'text-[13px]';
  const gap = size === 'large' ? 'gap-6' : 'gap-3';
  const layout = size === 'large' ? 'flex-col items-center' : 'flex-row items-center';

  return (
    <div className={`flex ${layout} ${gap}`}>
      <div className={`${avatarSize} rounded-full overflow-hidden flex-shrink-0 bg-neutral-800`}>
        <img 
          src={`${import.meta.env.BASE_URL}simon-virtual.png`} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-0">
        <span className={`${nameSize} font-normal text-color-primary leading-[1.3] tracking-tight`}>{name}</span>
        <span className={`${titleSize} font-normal text-color-secondary leading-[1.3] tracking-tight`}>{title}</span>
      </div>
    </div>
  )
}

export default Avatar

