import React from 'react'
import {
    Table,
    Button,
    Row,
} from "reactstrap";
export default function CsList(props) {
    const {menu,onOpenDelModalDel,onEdit} = props;
    return (
        <Row>
                <div className="col-md-12">
                    <Table className="table table-striped table-hover table-sm table-responsive-lg ">
                        <thead>
                            <tr>
                                <th scope="col">Menu Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Active</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menu.map((row) => {
                                return (
                                    <tr key={row.id}>
                                        <th>{row.menu_title}</th>
                                        <th>{row.description}</th>
                                        <th>
                                            <i
                                                className={
                                                    row.is_active == 1
                                                        ? "fas fa-check-circle"
                                                        : "far fa-circle"
                                                }
                                            ></i>
                                        </th>
                                        <th>
                                            <Button
                                                color="success"
                                                size="sm"
                                                className="mr-1"
                                                onClick={() => {
                                                    onEdit(row);
                                                }}
                                            >
                                                <i className="ti-pencil"></i>{" "}
                                                Edit
                                            </Button>
                                            |{" "}
                                            <Button
                                                color="danger"
                                                size="sm"
                                                className="ml"
                                                onClick={() => {
                                                    onOpenDelModalDel(row);
                                                }}
                                            >
                                                <i className="ti-trash"></i>
                                                Remove
                                            </Button>
                                        </th>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </Row>
    )
}
