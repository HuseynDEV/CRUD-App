import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { Button, Card, Grid, Container, Image } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { collection, deleteDoc, onSnapshot, doc, getDoc } from 'firebase/firestore'
import ModalComp from '../components/ModalComp'
import Spinner from '../components/Spinner'

const Home = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState({})
    const navigate = useNavigate()


    useEffect(() => {
        setLoading(true)

        const unsub = onSnapshot(collection(db, 'users'), snapshot => {
            let list = []
            snapshot.docs.forEach(doc => {
                list.push({ id: doc.id, ...doc.data() })
            })
            setUsers(list)
            console.log(users)
            setLoading(false)
        }, (error) => {
            console.log(error)
        })

        return () => {
            unsub()
        }

    }, [])


    if (loading) {
        return <Spinner />
    }

    const handleModal = (item) => {
        setOpen(true)
        setUser(item)
    }


    const handleDelete = async (id) => {
        if (window.confirm("Are you sure to delete that user ?")) {
            try {
                setOpen(false)
                await deleteDoc(doc(db, 'users', id))
                setUsers(users.filter(user => user.id !== id))
            }
            catch (err) {
                console.log(err)
            }
            console.log('asdas')
        }

    }



  
    return (
        <Container>
            <Card.Group>
                <Grid columns={3} stackable>
                    {
                        users && users.map(item => (
                            <Grid.Column>
                                <Card>
                                    <Card.Content>
                                        <Image src={item.img}
                                            style={{ width: "100px", height: "100px" }} />

                                        <Card.Header>
                                            {item.name}
                                        </Card.Header>
                                        <Card.Description>
                                            {item.info}
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content>
                                        <Button onClick={() => navigate(`/update/${item.id}`)}>Update</Button>
                                        <Button onClick={() => handleModal(item)} >View</Button>

                                        {
                                            open && (
                                                <ModalComp
                                                    open={open}
                                                    setOpen={setOpen}
                                                    handleDelete={handleDelete}
                                                    {...user}
                                                />
                                            )
                                        }

                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        ))
                    }

                </Grid>
            </Card.Group>
        </Container>
    )
}

export default Home