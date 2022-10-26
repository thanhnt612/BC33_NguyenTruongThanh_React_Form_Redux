import React, { Component } from "react";
import { connect } from "react-redux";
import {
  studentNew,
  studentSearch,
  studentUpdate,
} from "../redux/reducer/svReducer";
import Table from "./Table";
class ReactForm extends Component {
  state = {
    values: {
      id: "",
      name: "",
      phone: "",
      email: "",
    },
    errors: {
      id: "",
      name: "",
      phone: "",
      email: "",
    },
    isSubmit: true,
    keyWord: "",
  };
  handleChangeInput = (e) => {
    let { value, id } = e.target;
    let newValues = { ...this.state.values };
    newValues[id] = value;
    let newErrors = { ...this.state.errors };
    let messError = "";
    if (value.trim() == "") {
      messError = id + " không được bỏ trống !";
    } else {
      let dataType = e.target.getAttribute("data-type");
      if (dataType === "number") {
        let regexNumber = /^\d+$/;
        if (!regexNumber.test(value)) {
          messError = id + " phải nhập số!";
        }
      }
      if (dataType == "email") {
        let regexEmail =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regexEmail.test(value)) {
          messError = id + " không đúng định dạng!";
        }
      }
    }
    newErrors[id] = messError;
    let submit = false;
    for (let key in newValues) {
      if (newValues[key].toString().trim() === "") {
        submit = true;
      }
    }
    this.setState({
      values: newValues,
      errors: newErrors,
      isSubmit: submit,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let { errors } = this.state;
    for (let key in errors) {
      if (errors[key] !== "") {
        alert("Dữ liệu không hợp lệ !");
        return;
      }
    }
    let newSV = { ...this.state.values };
    console.log(newSV);
    const action = studentNew(newSV);
    this.props.dispatch(action);
  };
  handleUpdate = () => {
    const action = studentUpdate(this.state.values);
    this.props.dispatch(action);
  };
  handleSearch = (e) => {
    e.preventDefault();
    const action = studentSearch(this.state.keyWord);
    this.props.dispatch(action);
  };
  handleChangeSearch = (e) => {
    const { value } = e.target;
    this.setState(
      {
        keyWord: value,
      },
      () => {
        console.log(value);
      }
    );
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.arrEdit.id !== this.props.arrEdit.id) {
      console.log(prevProps.arrEdit.id);
      console.log(this.props.arrEdit.id);
      this.setState({
        values: this.props.arrEdit,
      });
    }
  }
  render() {
    let { id, name, phone, email } = this.state.values;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3 className="text-white bg-dark p-3 fs-4">Thông tin sinh viên</h3>
          <div className="row">
            <div className="col-6">
              <div className="form-group mb-3">
                <span>Mã sinh viên</span>
                <input
                  data-type="number"
                  className="form-control"
                  id="id"
                  name="id"
                  value={id}
                  placeholder="Nhập mã số sinh viên . . ."
                  onInput={this.handleChangeInput}
                />
                <p className="text text-danger">{this.state.errors.id}</p>
              </div>
              <div className="form-group">
                <span>Số điện thoại</span>
                <input
                  data-type="number"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={phone}
                  placeholder="Nhập số điện thoại . . ."
                  onInput={this.handleChangeInput}
                />
                <p className="text-danger">{this.state.errors.phone}</p>
              </div>
              <button
                className="btn btn-success mt-3"
                type="submit"
                disabled={this.state.isSubmit}
              >
                Thêm sinh viên
              </button>
              <button
                className="btn btn-primary mt-3 mx-3"
                type="button"
                disabled={this.state.isSubmit}
                onClick={this.handleUpdate}
              >
                Cập nhật
              </button>
            </div>
            <div className="col-6">
              <div className="form-group mb-3">
                <span>Họ và tên</span>
                <input
                  className="form-control"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="Nhập họ và tên . . ."
                  onInput={this.handleChangeInput}
                />
                <p className="text text-danger">{this.state.errors.name}</p>
              </div>
              <div className="form-group">
                <span>Email</span>
                <input
                  data-type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="example@gmail.com"
                  onInput={this.handleChangeInput}
                />
                <p className="text-danger">{this.state.errors.email}</p>
              </div>
            </div>
          </div>
          <div className="my-3 p-2 border border-dark">
            <h3>Tìm kiếm</h3>
            <input
              type="text"
              className="form-control"
              id="search"
              name="search"
              placeholder="Nhập thông tin tìm kiếm . . ."
              onInput={this.handleChangeSearch}
            />
            <button
              type="button"
              className="btn btn-success mt-2"
              onClick={this.handleSearch}
            >
              Search
            </button>
            {this.props.arrSearch.map((sv, index) => {
              return (
                <table className="table">
                  <thead className="bg-warning text-danger">
                    <tr>
                      <th>Mã SV</th>
                      <th>Họ tên</th>
                      <th>Số điện thoại</th>
                      <th>Email</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={index}>
                      <td>{sv.id}</td>
                      <td>{sv.name}</td>
                      <td>{sv.phone}</td>
                      <td>{sv.email}</td>
                    </tr>
                  </tbody>
                </table>
              );
            })}
          </div>
        </form>
        <Table />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  arrList: state.svReducer.arrList,
  arrEdit: state.svReducer.arrEdit,
  arrSearch: state.svReducer.arrSearch,
});
export default connect(mapStateToProps)(ReactForm);