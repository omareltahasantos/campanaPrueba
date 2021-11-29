import React, { Fragment, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { FormAñadir } from './FormAñadir';
export function Añadir({show, setShow, handleClose, handleShow, getNewHousing}) {

   


    return (
        <Fragment>
            
            <Modal show={show} centered onHide={handleClose} style={{top: '5%', left: '15%'}} size='lg'>
                <Modal.Header >
                <Modal.Title className='mx-auto'>Añadir vivienda</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <FormAñadir handleClose={handleClose} getNewHousing={getNewHousing}></FormAñadir>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}
