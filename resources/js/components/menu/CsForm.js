import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
    Label,
    Input,
    FormGroup,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Modal,
    Table,
    Button,
    Row,
    Col,
} from "reactstrap";

export default function csform(props) {
    const {
        onSave,
        isOpenModal,
        toggleModal,
        appItemName,
        appId,
        isEdit,
        form,
        menu,
        togglePermissionValue,
        setForm,
    } = props;

    return (
        <Modal isOpen={isOpenModal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>
                {isEdit ? "Edit" : "Add"} Menu to {appItemName}
                <Label for="exampleEmail" hidden>
                    id
                </Label>
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col>
                        <Row>
                            <FormGroup className="col-md-6">
                                <Label for="Menu Code">app_id</Label>
                                <Input
                                    id="app_id"
                                    value={form.app_id}
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            app_id: appId,
                                        });
                                    }}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label for="Menu Code">Menu Code</Label>
                                <Input
                                    id="menu_code"
                                    value={form.menu_code}
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            menu_code: e.target.value,
                                        });
                                    }}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label for="menu_title">Menu Title</Label>
                                <Input
                                    id="menu_title"
                                    value={form.menu_title}
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            menu_title: e.target.value,
                                        });
                                    }}
                                />
                            </FormGroup>
                        </Row>

                        <FormGroup>
                            <Label for="Description">Description</Label>
                            <Input
                                id="description"
                                value={form.description}
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        description: e.target.value,
                                    });
                                }}
                            />
                        </FormGroup>
                        <Row>
                            <FormGroup className="col-md-6">
                                <Label for="parent_id">Parent Menu</Label>
                                <select
                                    className="form-control"
                                    aria-label="Default select example"
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            parent_id: e.target.value,
                                        });
                                    }}
                                >
                                    {/* <option value={0}></option> */}
                                    <option value={0}>As Parent</option>
                                    {menu.map((row) => (
                                        <option value={row.id} key={row.id}>
                                            {row.menu_title}
                                        </option>
                                    ))}
                                </select>
                                {form.parent_id}
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label for="menu_icon">Menu Icon</Label>
                                <Input
                                    id="menu_icon"
                                    value={form.menu_icon}
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            menu_icon: e.target.value,
                                        });
                                    }}
                                />
                            </FormGroup>
                        </Row>

                        <Row>
                            <FormGroup className="col-md-6">
                                <Label for="menu_route">Menu Route</Label>
                                <Input
                                    id="menu_route"
                                    value={form.menu_route}
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            menu_route: e.target.value,
                                        });
                                    }}
                                />
                            </FormGroup>

                            <FormGroup className="col-md-6">
                                <Label for="sort_order">Sort Order</Label>
                                <Input
                                    id="sort_order"
                                    value={form.sort_order}
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            sort_order: e.target.value,
                                        });
                                    }}
                                />
                            </FormGroup>
                        </Row>
                        <FormGroup check>
                            <Label check>
                                <Input
                                    id="is_active"
                                    type="checkbox"
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            is_active: e.target.value ? 1 : 0,
                                        });
                                    }}
                                    checked={form.is_active}
                                />{" "}
                                is Active
                            </Label>
                        </FormGroup>
                        <br />
                        {/* {console.log(props.form.permissions)} */}

                        <Row className="d-flex justify-content-between">
                            <Col className="col-sm-3 ">
                                <label>Permission: </label>
                            </Col>
                            <Col className="col-md-6 ">
                                <label className="checkbox-inline">
                                    <input
                                        type="checkbox"
                                        defaultChecked={
                                            props.form.permissions[0].value
                                        }
                                        onChange={(e) =>
                                            togglePermissionValue("Add")
                                        }
                                    />
                                    Add &nbsp;
                                </label>
                                <label className="checkbox-inline">
                                    <input
                                        type="checkbox"
                                        defaultChecked={
                                            props.form.permissions[1].value
                                        }
                                        onChange={(e) =>
                                            togglePermissionValue("Edit")
                                        }
                                    />
                                    Edit &nbsp;
                                </label>
                                <label className="checkbox-inline">
                                    <input
                                        type="checkbox"
                                        defaultChecked={
                                            props.form.permissions[2].value
                                        }
                                        onChange={(e) =>
                                            togglePermissionValue("Delete")
                                        }
                                    />
                                    Delete &nbsp;
                                </label>
                                <label className="checkbox-inline">
                                    <input
                                        type="checkbox"
                                        defaultChecked={
                                            props.form.permissions[3].value
                                        }
                                        onChange={(e) =>
                                            togglePermissionValue("View")
                                        }
                                    />
                                    View &nbsp;
                                </label>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={onSave}>
                    {isEdit ? "Edit" : "Add"} Menu
                </Button>
                <Button color="secondary" onClick={toggleModal}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}
