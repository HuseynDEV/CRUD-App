import React, { useState, useEffect } from 'react'
import { Button, Form, Grid, Item, Loader } from 'semantic-ui-react'
import { storage } from '../firebase'
import { useParams, useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, serverTimestamp, doc, getDoc, updateDoc } from 'firebase/firestore'



const inititalState = {
    name: '',
    email: '',
    info: '',
    contact: ''
}

const AddEditUser = () => {

    const [data, setData] = useState(inititalState)
    const { name, email, info, contact } = data
    const [file, setFile] = useState(null)
    const [progress, setProgress] = useState(null)
    const [errors, setErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const navigate = useNavigate()


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name
            const storageRef = ref(storage, file.name)
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(progress)
                switch (snapshot.state) {
                    case "paused":
                        console.log('Upload is Pause');
                        break
                    case "running":
                        console.log('Upload is Running');
                        break
                    default:
                        break
                }
            }, error => {
                console.log(error)
            },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                        setData(prev => ({ ...prev, img: downloadURL }))

                    })
                }
            )
        }
        file && uploadFile()
        console.log(data.img)
    }, [file])


    const validate = () => {

        let errors = {}

        if (!name) {
            errors.name = "Name is Required"
        }
        if (!email) {
            errors.email = "Email is Required"
        }
        if (!info) {
            errors.info = "Info is Required"
        }
        if (!contact) {
            errors.contact = "Contact is Required"
        }

        return errors

    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors = validate()
        if (Object.keys(errors).length) return setErrors(errors)
        setIsSubmit(true)
        if (!id) {
            await addDoc(collection(db, 'users'), {
                ...data,
                timastamp: serverTimestamp(),
            })
        }
        else {
            try {
                await updateDoc(doc(db, 'users', id), {
                    ...data,
                    timestamp: serverTimestamp()
                })
            }
            catch (error) {
                console.log(error)
            }
        }
        navigate('/')
    }



    const { id } = useParams()

    useEffect(() => {
        id && getSingleUSer()
        console.log(id)
    }, [id])


    const getSingleUSer = async () => {
        const docRef = doc(db, 'users', id)
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
            console.log(snapshot.data())
            setData({ ...snapshot.data() })
        }
    }


    return (
        <div>
            <Grid centered verticalAlign='middle' columns='3' style={{ height: '80vh' }}>
                <Grid.Row>
                    <Grid.Column textAlign='center'>
                        <div>
                            {
                                isSubmit ? (
                                    <Loader active inline='centered' size='huge' />
                                ) : (
                                    <>
                                        <h2>{id ? 'Upade USer' : 'Add User'}</h2>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Input label='Name' placeholder="Enter Name" name="name"
                                                error={errors.name ? { content: errors.name } : null}
                                                onChange={handleChange} value={name}></Form.Input>

                                            <Form.Input label='Email' placeholder="Enter Email" name='email'
                                                error={errors.email ? { content: errors.email } : null}
                                                onChange={handleChange} value={email}></Form.Input>

                                            <Form.TextArea label='Info' placeholder="Enter Info" name="info"
                                                error={errors.info ? { content: errors.info } : null}
                                                onChange={handleChange} value={info}></Form.TextArea>

                                            <Form.Input label='Contact' placeholder="Enter Contact" name='contact'
                                                error={errors.contact ? { content: errors.contact } : null}
                                                onChange={handleChange} value={contact}></Form.Input>

                                            <Form.Input label='Upload'
                                                type='file'
                                                onChange={(e) => setFile(e.target.files[0])}>

                                            </Form.Input>
                                            <Button type='submit' disabled={progress !== null && progress < 100 && data.img !== ''}>Submit</Button>
                                        </Form>
                                    </>
                                )
                            }

                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div >
    )
}

export default AddEditUser