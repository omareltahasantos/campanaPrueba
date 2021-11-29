import React, { Fragment, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { FormEditar } from './FormEditar';
export function Editar( {result, changeArrayEditar}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    return (
        <Fragment>
            
            <IconButton aria-label="delete" onClick={handleShow} color='success'>
                 <EditIcon />
            </IconButton>
            
            
            <Modal show={show} centered onHide={handleClose} size='lg' style={{top: '5%', left: '15%'}}>
                <Modal.Header >
                <Modal.Title className='mx-auto'>Editar vivienda</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormEditar result = {result} handleClose = {handleClose} changeArrayEditar={changeArrayEditar}></FormEditar>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}
