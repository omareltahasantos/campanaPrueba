import React, { Fragment, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { FormEditar } from './FormEditar';
export function Editar( {user, changeArrayEditar}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //changeArrayEditar(3, 'afafa', 'rfghwg')
    
    return (
        <Fragment>
            
            <IconButton aria-label="delete" onClick={handleShow} color='success'>
                 <EditIcon />
            </IconButton>
            
            
            <Modal show={show} centered onHide={handleClose} style={{top: '-10%'}}>
                <Modal.Header >
                <Modal.Title className='mx-auto'>Edita el usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormEditar user={user} handleClose={handleClose} changeArrayEditar={changeArrayEditar}></FormEditar>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}
