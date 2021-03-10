import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>User List | Home</title>
        <meta name="keywords" content="ninjas"/>
      </Head>
      <div>
        <h1 className={styles.title}>Hello!</h1>
        <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, accusamus molestias. Fuga nisi debitis dolorum culpa temporibus! Suscipit fugiat fuga rerum perspiciatis quisquam, obcaecati asperiores neque optio doloribus voluptate odio.</p>
        <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, accusamus molestias. Fuga nisi debitis dolorum culpa temporibus! Suscipit fugiat fuga rerum perspiciatis quisquam, obcaecati asperiores neque optio doloribus voluptate odio.</p>
        <Link href="/users">
          <a className={styles.btn}>See User Listing</a>
        </Link>
      </div>
    </>
  )
}
