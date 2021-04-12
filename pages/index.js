import Head from 'next/head'
import style from '../styles/Home.module.css'
import Header from './../components/Header';



export default function Home() {
  
  return (
    <div className={style.xcontainer}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main >
        <Header />
        <div className={style.main}>
          <h1 className="title">
            Welcome to My App!
          </h1>
        </div>

      </main>

    </div>
  )
}
