import React from 'react'
import {
    Label,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Modal,
    Button,
    Row
} from "reactstrap";
export default function CsModalDelete(props) {
    const {isOpenModalDel,toggleModalDel,form,onDelete} = props;
    return (
        <Modal
        isOpen={isOpenModalDel}
        toggle={toggleModalDel}
        className="fades"
    >
        <ModalHeader toggle={toggleModalDel}>
            Delete Application
        </ModalHeader>
        <ModalBody>
            <Row>
                <Label className="ml-3">
                    Are you sure you wish to delete this item?{" "}
                    {form.menu_title}
                </Label>
            </Row>
        </ModalBody>
        <ModalFooter>
            <Button
                color="primary"
                onClick={() => {
                    onDelete(form.id);
                }}
            >
                Delete
            </Button>
            <Button color="secondary" onClick={toggleModalDel}>
                Cancel
            </Button>
        </ModalFooter>
    </Modal>
    )
}
