import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../../actions/user/fetchUsers";
import { changePermissions } from "../../actions/user/changePermissions";
import { deleteAccount } from "../../actions/user/deleteAccount";
import {
  Wrapper,
  Select,
  Input,
  Form,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  RemoveBtn
} from "./style";

class Users extends React.Component {
  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers();
  }

  handleChange = (e, user) => {
    const { changePermissions } = this.props;
    const status = e.target.value === "Admin" ? true : false;
    changePermissions(status, user.id);
  };

  removeUser = id => {
    console.log(id);
    const { deleteAccount } = this.props;
    deleteAccount(id);
  };

  render() {
    const { users } = this.props;
    console.log(users);
    return (
      <Wrapper>
        <Form>
          <Input
            onChange={this.handleChange}
            type="text"
            name="city"
            placeholder="search user"
          />
        </Form>
        <TableContainer>
          <Table>
            <Thead>
              <tr>
                <Th>id</Th>
                <Th>name</Th>
                <Th>change status</Th>
                <Th>remove</Th>
              </tr>
            </Thead>
            <Tbody>
              {users.map((user, id) => {
                return (
                  <Tr key={user.id}>
                    <Td>{id + 1}</Td>
                    <Td>{user.login}</Td>
                    <Td>
                      {user.id === 1 ? (
                        "Admin"
                      ) : (
                        <Select onChange={e => this.handleChange(e, user)}>
                          <option key={id}>
                            {user.isAdmin ? "Admin" : "User"}
                          </option>
                          <option key={id + 1}>
                            {user.isAdmin ? "User" : "Admin"}
                          </option>
                        </Select>
                      )}
                    </Td>
                    <Td>
                      {user.id !== 1 && (
                        <RemoveBtn
                          onClick={id => this.removeUser(user.id)}
                          src={"delete.png"}
                          width={32}
                          height={32}
                        />
                      )}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = {
  fetchUsers,
  changePermissions,
  deleteAccount
};

const mapStateToProps = state => ({
  users: state.user.users
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
