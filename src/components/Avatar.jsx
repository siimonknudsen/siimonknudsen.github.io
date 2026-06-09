import { AVATAR_SRC, onAvatarError } from '../lib/avatar'
import styles from './Avatar.module.css'

function Avatar({ name, title, size = 'small' }) {
  const isLarge = size === 'large'

  return (
    <div className={`${styles.root} ${isLarge ? styles.large : ''}`}>
      <div className={`${styles.thumb} bg-surface-color-tertiary`}>
        <img
          src={AVATAR_SRC}
          onError={onAvatarError}
          alt={name}
          className={styles.image}
        />
      </div>
      <div className={styles.meta}>
        <span className={`${isLarge ? 'type-heading-sm' : 'type-label'} text-color-primary`}>{name}</span>
        <span className={`${isLarge ? 'type-display' : 'type-caption'} text-color-secondary`}>{title}</span>
      </div>
    </div>
  )
}

export default Avatar
