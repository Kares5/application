import styles from './footer.module.css'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className={styles.footer}  >
      <h3>Contact Us :</h3>
      <Link>
      <i class="bi bi-twitter"></i>
      </Link>
      <Link>
      <i class="bi bi-facebook"></i>
      </Link>
      <Link>
      <i class="bi bi-instagram"></i>
      </Link>
      <Link>
        <i class="bi bi-whatsapp"></i>
      </Link>
    </div>
  )
}

export default Footer
