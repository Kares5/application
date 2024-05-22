import Header from './header/Header';
import Footer from './footer/Footer';
import {Helmet} from 'react-helmet'
import {ToastContainer} from 'react-toastify'

const Layout = ({children , title = 'Delivery Restaurant' , description = "The Best Restaurant " , keywords = 'food,pizza,buger' , author = 'KARES'}) => {
  return (
    <div>
      <Helmet >
        <meta charSet='utf8' />
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta name='author' content={author} />
        <title >{title}</title>
      </Helmet>
      <Header />
      <main style={{minHeight : "74vh"}}>
          {children}   
      </main>
      <Footer />
    </div>
  )
}


export default Layout
