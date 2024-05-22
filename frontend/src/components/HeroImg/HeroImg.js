import styles from './hero.module.css'

const HeroImg = () => {
  return (
    <div className={styles.container}>
        <img  src='/burger.jpg' alt='burger'/>
        <div className={styles.layer}>
        </div>
    </div>
  )
}

export default HeroImg
