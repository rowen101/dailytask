import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
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
    Alert,
    Badge,
} from "reactstrap";

function DailyTaskList() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalDel, setIsOpenModalDel] = useState(false);
    const [isOpenModalPub, setIsOpenModalPub] = useState(false);
    const toggleModal = () => setIsOpenModal(!isOpenModal);
    const toggleModalDel = () => setIsOpenModalDel(!isOpenModalDel);
    const toggleModalPub = () => setIsOpenModalPub(!isOpenModalPub);
    const [applicaton, setApplication] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [isoption, setIs0ption] = useState([]);
    const [checkedstatus, setcheckedstatus] = useState(false);
    const [checkedhitmiss, setcheckedhitmiss] = useState(false);
    const [checkedsla, setcheckedsla] = useState(false);
    const [form, setForm] = useState({
        id: "",
        user_id: 1,
        week: "",
        site: "",
        ticket: "",
        type: "",
        subject: "",
        reaisedby: "",
        position: "",
        department: "",
        day: "",
        hitmiss: false,
        status: false,
        sla: false,
        remark: "",
        publish: false,
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
            id: "",
            week: result[1],
            district: "",
            site: "",
            ticket: "",
            type: "",
            subject: "",
            reaisedby: "",
            position: "",
            department: "",
            day: "",
            status: 0 ? setcheckedstatus(false) : "",
            hitmiss: 0 ? setcheckedhitmiss(false) : "",
            sla: 0 ? setcheckedsla(false) : "",
        });
    }
    function IsCheckbox(item) {
        if (item.status == 0) {
            setcheckedstatus(false);
        } else {
            setcheckedstatus(true);
        }
        if (item.hitmiss == 0) {
            setcheckedhitmiss(false);
        } else {
            setcheckedhitmiss(true);
        }
        if (item.sla == 0) {
            setcheckedsla(false);
        } else {
            setcheckedsla(true);
        }
    }

    const AddOpenModal = () => {
        setIsOpenModal(true);
        setIsEdit(false);
        clearform();

        _isrefreshListOption();
    };

    const onEditModal = (item) => {
        setForm(item);
        setIsOpenModal(true);
        setIsEdit(true);
        IsCheckbox(item);
        _isrefreshListOption();
    };

    const onOpenDelModal = (item) => {
        setForm(item);
        setIsOpenModalDel(true);
        setIsOpenModal(false);
        _isrefreshListOption();
    };

    const onDelete = (item) => {
        axios.delete("/core/dailytask-delete/" + item).then((response) => {
            setForm({});
            setIsOpenModalDel(false);
            _isrefreshList();
        });
    };
    const ondeltoggle = () => {
        setIsOpenModalDel(false);
        //setIsOpenModal(true);
    };
    const onSave = () => {
        if (isEdit == false) {
            axios
                .post("/core/dailytask-store", form)
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
                .put("/core/dailytask-update/" + form.id, form)
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
    //begin checkbox
    const togglestatus = () => {
        setcheckedstatus(!checkedstatus);
        setForm({
            ...form,
            status: checkedstatus ? 0 : 1,
        });
    };
    const togglehitmiss = () => {
        setcheckedhitmiss(!checkedhitmiss);
        setForm({
            ...form,
            hitmiss: checkedhitmiss ? 0 : 1,
        });
    };
    const togglesla = () => {
        setcheckedsla(!checkedsla);
        setForm({
            ...form,
            sla: checkedsla ? 0 : 1,
        });
    };
    //end checkbox

    //publish button

    const onOpenPubModal = (item) => {
        setForm(item);
        setIsOpenModalPub(true);
        _isrefreshListOption();
    };
    const onPublish = (item) => {
        form.publish = true;
        axios
            .put("/core/ticket-publish/" + item, form)
            .then((response) => {
                setForm({});
                setIsOpenModalPub(false);
                _isrefreshList();
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const _isrefreshListOption = () => {
        axios
            .get("/core/ticket-type")
            .then((response) => {
                setIs0ption(response.data);
                // onfilter(1);
            })
            .catch((err) => {
                console.log(err);
            });
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
                                    <Label for="Site">District*</Label>
                                    <Input
                                        id="site"
                                        value={form.district}
                                        onChange={(e) => {
                                            setForm({
                                                ...form,
                                                district: e.target.value,
                                            });
                                        }}
                                    />
                                </FormGroup>
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
                            </Row>
                            <Row>
                                <FormGroup className="col-md-6">
                                    <Label for="parent_id">Type</Label>
                                    <select
                                        className="form-control"
                                        aria-label="Default select example"
                                        onChange={(e) => {
                                            setForm({
                                                ...form,
                                                type: e.target.value,
                                            });
                                        }}
                                    >
                                        {/* <option value={0}></option> */}
                                        <option value={0}>Type</option>
                                        {isoption.map((row) => (
                                            <option value={row.id} key={row.id}>
                                                {row.name}
                                            </option>
                                        ))}
                                    </select>
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
                            <Row>
                                <FormGroup className="col-md-6">
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
                                <FormGroup className="col-md-6">
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
                            </Row>
                            <Row>
                                <FormGroup className="col-md-6">
                                    <Label for="Raised by">Position</Label>
                                    <Input
                                        id="position"
                                        value={form.position}
                                        onChange={(e) => {
                                            setForm({
                                                ...form,
                                                position: e.target.value,
                                            });
                                        }}
                                    />
                                </FormGroup>
                                <FormGroup className="col-md-6">
                                    <Label for="Raised by">Department</Label>
                                    <Input
                                        id="department"
                                        value={form.department}
                                        onChange={(e) => {
                                            setForm({
                                                ...form,
                                                department: e.target.value,
                                            });
                                        }}
                                    />
                                </FormGroup>
                            </Row>
                            <FormGroup>
                                <Label for="Raised by">Remarks</Label>

                                <Input
                                    id="remark"
                                    value={form.remark}
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            remark: e.target.value,
                                        });
                                    }}
                                    type="textarea"
                                />
                            </FormGroup>
                            <Row>
                                <FormGroup check className="ml-3">
                                    <Label check>
                                        <Input
                                            onChange={togglestatus}
                                            id="status"
                                            type="checkbox"
                                            value={checkedstatus ? 1 : 0}
                                            checked={checkedstatus}
                                        />{" "}
                                        Status
                                    </Label>
                                </FormGroup>
                                <FormGroup check className="ml-3">
                                    <Label check>
                                        <Input
                                            onChange={togglehitmiss}
                                            id="hitmiss"
                                            type="checkbox"
                                            value={checkedhitmiss ? 1 : 0}
                                            checked={checkedhitmiss}
                                        />{" "}
                                        Hit/Miss
                                    </Label>
                                </FormGroup>
                                <FormGroup check className="ml-3">
                                    <Label check>
                                        <Input
                                            onChange={togglesla}
                                            id="sla"
                                            type="checkbox"
                                            value={checkedsla ? 1 : 0}
                                            checked={checkedsla}
                                        />{" "}
                                        SLA
                                    </Label>
                                </FormGroup>
                            </Row>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    {isEdit == true ? (
                        <>
                            <Button
                                color="danger"
                                onClick={() => {
                                    onOpenDelModal(form);
                                }}
                            >
                                <i className="ti-trash"></i>
                            </Button>
                        </>
                    ) : (
                        <></>
                    )}

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
                isOpen={isOpenModalPub}
                toggle={toggleModalPub}
                className="fades"
            >
                <ModalHeader toggle={toggleModalPub}>
                    Publish Ticket
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Label className="ml-3">
                            Are you sure you wish to Publish this item?{" "}
                        </Label>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            onPublish(form.id);
                        }}
                    >
                        Publish
                    </Button>
                    <Button color="secondary" onClick={toggleModalPub}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            {/* end publish modal */}
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
                            Are you sure you wish to delete this item? {form.id}
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
                    <Button color="secondary" onClick={ondeltoggle}>
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

            <Row>
                <div className="col-md-12">
                    <Table className="table  table-striped table-hover table-sm table-responsive-lg">
                        <thead>
                            <tr>
                                <th scope="col">Week</th>
                                <th scope="col">Type</th>
                                <th scope="col">Site</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Raised By</th>
                                <th scope="col">Status</th>
                                <th scope="col">Hit/Miss</th>
                                <th scope="col">SLA</th>
                                <th scope="col">action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applicaton.map((row) => {
                                return (
                                    <tr key={row.id}>
                                        <th>W{row.week}</th>
                                        <th>{row.name}</th>
                                        <th>{row.site}</th>
                                        <th>{row.subject}</th>
                                        <th>{row.raisedby}</th>
                                        <th>
                                            {row.status == 1 ? (
                                                <Badge color="success" pill>
                                                    Close
                                                </Badge>
                                            ) : (
                                                <Badge color="danger" pill>
                                                    Miss
                                                </Badge>
                                            )}
                                        </th>
                                        <th>
                                            {row.hitmiss == 1 ? (
                                                <Badge color="success" pill>
                                                    Hit
                                                </Badge>
                                            ) : (
                                                <Badge color="danger" pill>
                                                    Miss
                                                </Badge>
                                            )}
                                        </th>
                                        <th>
                                            {row.sla == 1 ? (
                                                <Badge color="success" pill>
                                                    Hit
                                                </Badge>
                                            ) : (
                                                <Badge color="danger" pill>
                                                    Miss
                                                </Badge>
                                            )}
                                        </th>
                                        <th>
                                            {row.publish == 1 ? (
                                                <Badge color="success" pill>
                                                    Publish
                                                </Badge>
                                            ) : (
                                                <>
                                                    <Button
                                                        color="secondary"
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
                                                    {/* <Button
                                                        color="danger"
                                                        size="sm"
                                                        className="ml"
                                                        onClick={() => {
                                                            onOpenDelModal(row);
                                                        }}
                                                    >
                                                        <i className="ti-trash"></i>
                                                        Delete
                                                    </Button> */}
                                                    <Button
                                                        color="primary"
                                                        size="sm"
                                                        className="ml"
                                                        onClick={() => {
                                                            onOpenPubModal(row);
                                                        }}
                                                    >
                                                        <i className="ti-new-window"></i>
                                                        Publish
                                                    </Button>
                                                </>
                                            )}
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
