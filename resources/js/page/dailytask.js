import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient();
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
    Container,
    Col,
} from "reactstrap";

function DailyTaskList() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalDel, setIsOpenModalDel] = useState(false);
    const toggleModal = () => setIsOpenModal(!isOpenModal);
    const toggleModalDel = () => setIsOpenModalDel(!isOpenModalDel);
    const [isConfirmEditModal, setIsConfirmEditModal] = useState(false);
    const [applicaton, setApplication] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [form, setForm] = useState({
        id: "",
        user_id: "",
        week: "",
        site: "",
        ticket: 0,
        type: "",
        subject: "",
        reaisedby: "",
        position: "",
        department: "",
        day: 0,
        hitmiss: false,
        status: false,
        sla: false,
        remark: "",
        created_by: "",
        update_by: "",
    });

    const _isrefreshList = () => {
        axios
            .get("/core/dailytasklist")
            .then((response) => {
                setApplication(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    function clearform() {
        setForm({
            ...form,
            app_code: "",
            id: "",
            app_name: "",
            description: "",
            app_icon: "",
            status: "",
            status_message: "",
        });
    }
    const AddOpenModal = () => {
        setIsOpenModal(true);
        setIsEdit(false);
        clearform();
    };

    const onEditModal = (item) => {
        setForm(item);
        setIsOpenModal(true);
        setIsEdit(true);
    };

    const onOpenDelModal = (item) => {
        setForm(item);
        setIsOpenModalDel(true);
    };

    const onDelete = (item) => {
        axios.delete("/core/dailytask-delete/" + item).then((response) => {
            setForm({});
            setIsOpenModalDel(false);
            _isrefreshList();
        });
    };
    const onSave = () => {
        if (isEdit == false) {
            axios
                .post("/core/dailytas-store", form)
                .then(() => {
                    setForm({});
                    setIsOpenModal(false);
                    _isrefreshList();
                })
                .catch((err) => {
                    console.log(err.data);
                });
        } else {
            axios
                .put("/core/dailytas-update/" + form.id, form)
                .then(() => {
                    setForm({});
                    setIsOpenModal(false);
                    _isrefreshList();
                })
                .catch((err) => {
                    console.log(err.data);
                });
        }
    };
    //get week of the month
    function getWeekNumber(d) {
        // Copy date so don't modify original
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        // Get first day of year
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
        // Return array of year and week number
        return [d.getUTCFullYear(), weekNo];
    }

    const result = getWeekNumber(new Date());
    //end get week by month
    const { isLoading, error, data } = useQuery("repsData", _isrefreshList, {
        onSuccess: () => console.log("fetch ok"),
    });
    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;
    return (
        <div className="container mt-2">
            {/* modal */}
            <Modal isOpen={isOpenModal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                    {isEdit ? "Edit" : "Add"} Ticket In Week's {result[1]}
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <Row>
                                <FormGroup className="col-md-6 ">
                                    <Label for="Site">Site*</Label>
                                    <Input
                                        id="site"
                                        value={form.site}
                                        onChange={(e) => {
                                            setForm({
                                                ...form,
                                                site: e.target.value,
                                            });
                                        }}
                                    />
                                </FormGroup>
                                <FormGroup className="col-md-6 ">
                                    <Label for="Ticket">Ticket*</Label>
                                    <Input
                                        id="ticket"
                                        value={form.ticket}
                                        onChange={(e) => {
                                            setForm({
                                                ...form,
                                                ticket: e.target.value,
                                            });
                                        }}
                                    />
                                </FormGroup>
                            </Row>
                            <FormGroup>
                                <Label for="type">Type</Label>
                                <Input
                                    type="select"
                                    name="select"
                                    id="type"
                                    value={form.type}
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            type: e.target.value,
                                        });
                                    }}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">inactive</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="subject">Subject</Label>
                                <Input
                                    id="subject"
                                    value={form.subject}
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            subject: e.target.value,
                                        });
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Status">tatus</Label>
                                <Input
                                    type="select"
                                    name="select"
                                    id="status"
                                    value={form.status}
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            status: e.target.value,
                                        });
                                    }}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">inactive</option>
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="Raised by">Raised by</Label>
                                <Input
                                    id="raisedby"
                                    value={form.raisedby}
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            raisedby: e.target.value,
                                        });
                                    }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onSave}>
                        {isEdit ? "Edit" : "Add"} Ticket
                    </Button>
                    <Button color="secondary" onClick={toggleModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            {/* end modal */}

            {/* delete modal */}
            <Modal
                isOpen={isOpenModalDel}
                toggle={toggleModalDel}
                className="fades"
            >
                <ModalHeader toggle={toggleModalDel}>Delete Ticket</ModalHeader>
                <ModalBody>
                    <Row>
                        <Label className="ml-3">
                            Are you sure you wish to delete this item?{" "}
                            {form.app_name}
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
            {/* end delete modal */}
            <Button
                color="primary"
                size="sm"
                className="mr-2 mb-2"
                onClick={AddOpenModal}
            >
                Add Ticket
            </Button>
            {/* <td className="pull-right" style="margin-top: -58px;">
                <div className="row">
                    <div className="col"></div>&nbsp;
                    <div className="col-md-2">
                        <i className="fa fa-lg fa-filter clickable"></i>
                    </div>
                </div>
            </td> */}

            <Row>
                <div className="col-md-12">
                    <Table className="table table-striped table-hover table-sm table-responsive-lg">
                        <thead>
                            <tr>
                                <th scope="col">Week</th>
                                <th scope="col">Type</th>
                                <th scope="col">Site</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Raised By</th>
                                <th scope="col">Status</th>
                                <th scope="col">action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applicaton.map((row) => {
                                return (
                                    <tr key={row.id}>
                                        <th>{row.week}</th>
                                        <th>{row.type}</th>
                                        <th>{row.site}</th>
                                        <th>{row.subject}</th>
                                        <th>{row.raisedby}</th>
                                        <th>
                                            {row.status == 1 ? "Close" : "Open"}
                                        </th>
                                        <th>
                                            <Button
                                                color="success"
                                                size="sm"
                                                className="mr-1"
                                                onClick={() => {
                                                    onEditModal(row);
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
                                                    onOpenDelModal(row);
                                                }}
                                            >
                                                <i className="ti-trash"></i>
                                                Delete
                                            </Button>
                                            |{" "}
                                            <Button
                                                color="primary"
                                                size="sm"
                                                className="ml"
                                                onClick={{}}
                                            >
                                                <i className="ti-new-window"></i>
                                                Publish
                                            </Button>
                                        </th>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </Row>
        </div>
    );
}
const DailyTask = () => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <DailyTaskList />
            </QueryClientProvider>
        </>
    );
};

export default DailyTask;

if (document.getElementById("apps")) {
    ReactDOM.render(<DailyTask />, document.getElementById("apps"));
}
