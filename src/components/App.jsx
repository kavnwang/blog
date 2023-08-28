import styles from '../styles/App.module.css'
import Nav from './Nav';
import RecentPostDisplay from './RecentPostDisplay';
import Hero from './Hero';
import Footer from './Footer';
import Current from './Current';
import SubscribeForm from './SubscribeForm';
import RecentPosts from './RecentPosts';

function App() {

  return (
    <div>
      <Nav />
      <Hero />
<div className={styles.recentWrapper}>
<RecentPostDisplay className={styles.recentPost} />
<Current className={styles.current} />
</div>
<RecentPosts num={3} />
<SubscribeForm />
<Footer />
    </div>
  )
}

export default App;