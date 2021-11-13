import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient();
import FormMenu from "../components/menu/CsForm";
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
import CsModalDelete from "../components/menu/CsModalDelete";
import CsList from "../components/menu/CsList";
import { forEach } from "react-bootstrap/ElementChildren";

function MenuList() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalDel, setIsOpenModalDel] = useState(false);
    const toggleModal = () => setIsOpenModal(!isOpenModal);
    const toggleModalDel = () => setIsOpenModalDel(!isOpenModalDel);
    const [isConfirmEditModal, setIsConfirmEditModal] = useState(false);
    const [menu, setMenu] = useState([]);
    const [isfilter, setfilter] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [appname, setappname] = useState([]);
    const [appItemName, setappItemName] = useState("");
    const [appId, setappId] = useState("");
    const [checked, setchecked] = useState(false);
    const [form, setForm] = useState({
        id: "",
        uuid: "",
        app_id: "",
        menu_code: "",
        menu_title: "",
        description: "",
        parent_id: "",
        menu_icon: "",
        menu_route: "",
        sort_order: "",
        is_active: "",
        created_by: "",
        updated_by: "",
        permissions: [
            { menu: "Add", value: "false" },
            { name: "Edit", value: "false" },
            { name: "Delete", value: "false" },
            { name: "View", value: "false" },
        ],
    });

    const _isrefreshList = () => {
        axios
            .get("/core/menu/menu-list")
            .then((response) => {
                setappname(response.data);
                onfilter(1);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const onfilter = (app_id) => {
        setfilter(app_id);
        appname.filter((item) => {
            if (item.id == app_id) {
                setMenu(item.menus);
                form.app_id = item.id;
                setappItemName(item.app_name);
                setappId(item.id);
            }
        });
    };

    const clearform = () => {
        setForm({
            ...form,
            id: "",
            uuid: "",
            // app_id: "",
            menu_code: "",
            menu_title: "",
            description: "",
            parent_id: "",
            menu_icon: "",
            menu_route: "",
            sort_order: "",
            is_active: "" ? setchecked(true) : setchecked(false),
            permissions: [
                { name: "Add", value: "false" },
                { name: "Edit", value: "false" },
                { name: "Delete", value: "false" },
                { name: "View", value: "false" },
            ],
        });
    };
    const AddOpenModal = () => {
        if (appItemName == "") {
            alert("Please select application First");
        } else {
            setIsOpenModal(true);
            setIsEdit(false);
            clearform();
        }
    };

    //p1 = type of permission eg. View,Add,Edit,Delete
    //p2 = value of permission eg. true or false
    const togglePermissionValue = (p1) => {
        let perIndex = _.findIndex(form.permissions, { name: p1 });
        form.permissions[perIndex].value = !form.permissions[perIndex].value;
        setForm({
            ...form,
        });
    };

    const transFormEditData = (item) => {
        let permissionObj = [];
        if (!_.isEmpty(item.permissions)) {
            //check if insert permmission is exists
            let insertVal = _.find(item.permissions, {
                permission_code: "insert",
            });
            permissionObj.push({
                name: "Add",
                value: _.isEmpty(insertVal) ? false : true,
            });

            let UpdateVal = _.find(item.permissions, {
                permission_code: "update",
            });
            permissionObj.push({
                name: "Edit",
                value: _.isEmpty(UpdateVal) ? false : true,
            });

            let DelVal = _.find(item.permissions, {
                permission_code: "delete",
            });
            permissionObj.push({
                name: "Delete",
                value: _.isEmpty(DelVal) ? false : true,
            });

            let ViewVal = _.find(item.permissions, {
                permission_code: "view",
            });
            permissionObj.push({
                name: "View",
                value: _.isEmpty(ViewVal) ? false : true,
            });
        }

        setForm({ ...item, permissions: permissionObj });
    };

    const onEdit = (item) => {
        transFormEditData(item);
        setIsOpenModal(true);
        setIsEdit(true);
        if (item.is_active == 0) {
            setchecked(false);
        } else {
            setchecked(true);
        }
    };

    const onDelete = (item) => {
        axios
            .delete("/core/menu/delete/" + item)
            .then(() => {
                setForm({});
                setIsOpenModalDel(false);
                _isrefreshList();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onOpenDelModalDel = (item) => {
        setForm(item);
        setIsOpenModalDel(true);
    };
    //save menu with permission
    const onSave = () => {
        if (isEdit == false) {
            axios
                .all([
                    axios.post("/core/menu/store", form),
                    axios.post(
                        "/core/permission/store",
                        props.form.permissions
                    ),
                ])
                .then(
                    axios
                        .spread((data1, data2) => {
                            // output of req.
                            console.log("data1", data1, "data2", data2);
                        })
                        .catch((err) => {
                            console.log(err.data);
                        })
                );
            // .then((axios.spread((data1, data2) => {
            //     setForm({});
            //     setIsOpenModal(false);
            //     _isrefreshList();
            // })

            // axios
            //     .post("/core/permission/store", form.permissions)
            //     .then(() => {})
            //     .catch((err) => {
            //         console.log(err.data);
            //     });
        } else if (isEdit == true) {
            axios
                .put("/core/menu/update/" + form.id, form)
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
    const toggle = () => {
        setchecked(!checked);
        setForm({
            ...form,
            is_active: checked ? 0 : 1,
        });
    };

    const { isLoading, error, data } = useQuery("repsData", _isrefreshList, {
        onSuccess: () => console.log("fetch ok"),
    });
    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;
    return (
        <div className="container mt-2">
            {/* modal */}
            <FormMenu
                setForm={setForm}
                toggleModal={toggleModal}
                appItemName={appItemName}
                appId={appId}
                isEdit={isEdit}
                isOpenModal={isOpenModal}
                onSave={onSave}
                form={form}
                menu={menu}
                toggle={toggle}
                togglePermissionValue={togglePermissionValue}
            />

            <CsModalDelete
                isOpenModalDe={isOpenModalDel}
                toggleModalDel={toggleModalDel}
                form={form}
                onDelete={onDelete}
            />

            <Row className="d-flex justify-content-between">
                <Col className="col-md-6">
                    <Button
                        color="primary"
                        size="sm"
                        className="mr-2 mb-2"
                        onClick={AddOpenModal}
                    >
                        Add Menu
                    </Button>
                </Col>

                <Col className="col-md-6 ">
                    <FormGroup className="col-md-7 float-right">
                        <Input
                            type="select"
                            name="select"
                            id="app_id"
                            value={isfilter}
                            onChange={(e) => onfilter(e.currentTarget.value)}
                        >
                            {appname.map((row, key) => {
                                return (
                                    <option key={key} value={row.id}>
                                        {row.app_name}
                                    </option>
                                );
                            })}
                        </Input>
                    </FormGroup>
                </Col>
            </Row>

            <CsList
                menu={menu}
                onOpenDelModalDel={onOpenDelModalDel}
                onEdit={onEdit}
            />
        </div>
    );
}
const Menu = () => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <MenuList />
            </QueryClientProvider>
        </>
    );
};

export default Menu;

if (document.getElementById("menu")) {
    ReactDOM.render(<Menu />, document.getElementById("menu"));
}
