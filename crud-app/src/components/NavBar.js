import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Menu, Container, Image } from 'semantic-ui-react'


const NavBar = () => {
    const navigate = useNavigate()
    return (
        <Menu inverted borderless style={{ padding: '.3rem', marginBottom: '20px' }}>
            <Container>
                <Menu.Item>
                    <Link to='/'>
                        <Image size="mini" src='' alt='logo' />
                    </Link>
                </Menu.Item>
                <Menu.Item>
                  <h2>React Fireabse CRUD with upload image</h2>
                </Menu.Item>
                <Menu.Item>
                  <Button size='mini' primary onClick={()=>navigate('/add')}>
                    Add User
                  </Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default NavBar