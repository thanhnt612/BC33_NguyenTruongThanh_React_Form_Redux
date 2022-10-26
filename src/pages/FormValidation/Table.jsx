import React, { Component } from "react";
import { connect } from "react-redux";
import { studentDel, studentEdit } from "../../redux/reducer/svReducer";
class Table extends Component {
  render() {
    return (
      <div>
        <h3 className="text-center bg-primary text-white m-0 p-3">Danh sách sinh viên</h3>
        <table className="table">
          <thead className="bg-dark text-white">
            <tr>
              <th>Mã SV</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.arrList.map((sv, index) => {
              return (
                <tr key={index}>
                  <td>{sv.id}</td>
                  <td>{sv.name}</td>
                  <td>{sv.phone}</td>
                  <td>{sv.email}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        const action = studentDel(sv.id);
                        this.props.dispatch(action);
                      }}
                    >
                      Xóa
                    </button>
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => {
                        const action = studentEdit(sv);
                        this.props.dispatch(action);
                      }}
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  arrList: state.svReducer.arrList,
});
export default connect(mapStateToProps)(Table);
