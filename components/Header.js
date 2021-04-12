import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import Register from './Register';
import Login from './Login';
import { connect } from 'react-redux'
import { userSignUp, userSignIn, signOut, restore } from '../redux/actions/main'


function Header(props) {

    const [show, handleClose] = useState(false)
    const [showSignIn, handleCloseSignIn] = useState(false)
    const [form, setFormValue] = useState({})
    const { userInfo, restore } = props

    const register = () => props.userSignUp(form)
    const signIn = () => props.userSignIn(form)

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user_info'))
        if (userData) {
            restore(userData)
        }
    }, [])


    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
            </Head>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand ><Link href='/'><a className='text-white'>Navbar</a></Link></Navbar.Brand>
                <Nav className="mr-auto">
                    <Link href="/weather"><a className='text-white mr-3'>Weather</a></Link>
                    <Link href="/todo"><a className='text-white mr-3'>TODO</a></Link>
                </Nav>
                {userInfo.token &&
                    <Nav>
                        <NavDropdown title={`Welcome ` + userInfo.name} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => props.signOut()}>Sign Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                }
                {!userInfo.token &&
                    <Nav>
                        <Nav.Link onClick={() => handleCloseSignIn(true)}>Sign In</Nav.Link>
                        <Nav.Link onClick={() => handleClose(true)}>Register</Nav.Link>
                    </Nav>
                }
            </Navbar>
            <Register
                show={show && !userInfo.token}
                setShow={handleClose}
                form={form}
                setFormValue={setFormValue}
                register={register}
                isLoading={props.userInfo.loading}
                error={userInfo.error}
            />
            <Login
                show={showSignIn && !userInfo.token}
                setShow={handleCloseSignIn}
                form={form}
                setFormValue={setFormValue}
                signIn={signIn}
                error={userInfo.error}
                isLoading={props.userInfo.loading}
            />


        </>
    )
}
const mapStateToProps = state => ({
    userInfo: state.main,

})

const mapDispatchToProps = {
    userSignUp, userSignIn, signOut, restore
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)




