import Head from 'next/head'
import style from '../styles/Home.module.css'
import { connect } from 'react-redux'
import Header from './../components/Header';
import { setInfo } from './../redux/actions/main';
import { useState } from 'react'



function Weather(props) {
    const { userInfo, setInfo } = props
    const [name, setName] = useState('')

    return (


        <div className={style.xcontainer}>
            <Head>
                <title>The weather</title>
            </Head>
            <main>
                <Header />
                <div className={style.main}>
                    <h1 className="title">
                        The Weather Page for {userInfo.name}
                    </h1>
                    <input name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <button onClick={() => setInfo(name)}>Submit</button>
                </div>
            </main>
        </div>


    )
}

const mapStateToProps = state => ({
    userInfo: state.main
})

const mapDispatchToProps = {
    setInfo: setInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather)