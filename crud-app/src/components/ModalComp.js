import React from 'react'
import { Modal, Header, Image, Button } from 'semantic-ui-react'

const ModalComp = ({
    open,
    setOpen,
    img,
    name,
    info,
    email,
    contact,
    id,
    handleDelete
}) => 


// const handleDelete = async (id)=>{

// }


    {
     return (
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}>
                <Modal.Header>User Detail</Modal.Header>
                <Modal.Content>
                    <Image size='medium' src={img} />
                    <Modal.Description>
                        <Header>{name}</Header>
                        <p>{email}</p>
                        <p>{info}</p>
                        <p>{contact}</p>
                    </Modal.Description>
                </Modal.Content>

                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>
                        Cancel
                    </Button>

                    <Button content="Delete"
                        onClick={() => handleDelete(id)}
                    />

                </Modal.Actions>

            </Modal>
        )
    }

    export default ModalComp