import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import configureStore from "redux-mock-store";
import { Users } from "./Users";

describe("user component", () => {
  let wrapper;

  it("passess all props to users component", () => {
    const fetchUsers = jest.fn();
    const changePermissions = jest.fn();
    const deleteAccount = jest.fn();
    const users = [
      {
        id: 1,
        isAdmin: true,
        login: "user1",
        password: "$2b$10$4YBAEGFh9uAbQBBS1INaSuY3vS9yMuaxQaQ2oBaDu1IpWmNrMkYYK"
      },
      {
        id: 2,
        isAdmin: false,
        login: "user2",
        password: "$2b$10$4YBAEGFh9uAbQBBS1INaSuY3vS9yMuaxQaQ2oBaDu1IpWmNrMkYYK"
      }
    ];

    wrapper = shallow(
      <Users
        fetchUsers={fetchUsers}
        changePermissions={changePermissions}
        deleteAccount={deleteAccount}
        users={users}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("componentDidMount", () => {
    const fetchUsers = jest.fn();
    const changePermissions = jest.fn();
    const deleteAccount = jest.fn();
    const users = [
      {
        id: 1,
        isAdmin: true,
        login: "user1",
        password: "$2b$10$4YBAEGFh9uAbQBBS1INaSuY3vS9yMuaxQaQ2oBaDu1IpWmNrMkYYK"
      },
      {
        id: 2,
        isAdmin: false,
        login: "user2",
        password: "$2b$10$4YBAEGFh9uAbQBBS1INaSuY3vS9yMuaxQaQ2oBaDu1IpWmNrMkYYK"
      }
    ];

    wrapper = shallow(
      <Users
        fetchUsers={fetchUsers}
        changePermissions={changePermissions}
        deleteAccount={deleteAccount}
        users={users}
      />
    );

    expect(fetchUsers).toHaveBeenCalledTimes(1);
  });

  it("handle change status - from user to admin", () => {
    const fetchUsers = jest.fn();
    const changePermissions = jest.fn();
    const deleteAccount = jest.fn();
    const users = [
      {
        id: 1,
        isAdmin: true,
        login: "user1",
        password: "$2b$10$4YBAEGFh9uAbQBBS1INaSuY3vS9yMuaxQaQ2oBaDu1IpWmNrMkYYK"
      },
      {
        id: 2,
        isAdmin: false,
        login: "user2",
        password: "$2b$10$4YBAEGFh9uAbQBBS1INaSuY3vS9yMuaxQaQ2oBaDu1IpWmNrMkYYK"
      }
    ];

    wrapper = shallow(
      <Users
        fetchUsers={fetchUsers}
        changePermissions={changePermissions}
        deleteAccount={deleteAccount}
        users={users}
      />
    );

    const select = wrapper.find("select");

    select.simulate("change", {
      target: {
        name: "user",
        value: "Admin"
      }
    });

    expect(changePermissions).toHaveBeenCalledTimes(1);
    expect(changePermissions).toHaveBeenCalledWith(true, 2);
  });

  it("handle change status - from admin to user", () => {
    const fetchUsers = jest.fn();
    const changePermissions = jest.fn();
    const deleteAccount = jest.fn();
    const users = [
      {
        id: 1,
        isAdmin: true,
        login: "user1",
        password: "$2b$10$4YBAEGFh9uAbQBBS1INaSuY3vS9yMuaxQaQ2oBaDu1IpWmNrMkYYK"
      },
      {
        id: 2,
        isAdmin: true,
        login: "user2",
        password: "$2b$10$4YBAEGFh9uAbQBBS1INaSuY3vS9yMuaxQaQ2oBaDu1IpWmNrMkYYK"
      }
    ];

    wrapper = shallow(
      <Users
        fetchUsers={fetchUsers}
        changePermissions={changePermissions}
        deleteAccount={deleteAccount}
        users={users}
      />
    );

    const select = wrapper.find("select");

    select.simulate("change", {
      target: {
        name: "user",
        value: "User"
      }
    });

    expect(changePermissions).toHaveBeenCalledTimes(1);
    expect(changePermissions).toHaveBeenCalledWith(false, 2);
  });

  it("handle change user - change state", () => {
    const fetchUsers = jest.fn();
    const changePermissions = jest.fn();
    const deleteAccount = jest.fn();
    const users = [
      {
        id: 1,
        isAdmin: true,
        login: "user1",
        password: "$2b$10$4YBAEGFh9uAbQBBS1INaSuY3vS9yMuaxQaQ2oBaDu1IpWmNrMkYYK"
      },
      {
        id: 2,
        isAdmin: true,
        login: "user2",
        password: "$2b$10$4YBAEGFh9uAbQBBS1INaSuY3vS9yMuaxQaQ2oBaDu1IpWmNrMkYYK"
      }
    ];

    wrapper = shallow(
      <Users
        fetchUsers={fetchUsers}
        changePermissions={changePermissions}
        deleteAccount={deleteAccount}
        users={users}
      />
    );

    const input = wrapper.find("input");

    input.simulate("change", {
      target: {
        name: "user",
        value: "user2"
      }
    });

    expect(wrapper.state().login).toBe("user2");
  });

  it("handle change user - change state", () => {
    const fetchUsers = jest.fn();
    const changePermissions = jest.fn();
    const deleteAccount = jest.fn();
    const users = [
      {
        id: 1,
        isAdmin: true,
        login: "user1",
        password: "$2b$10$4YBAEGFh9uAbQBBS1INaSuY3vS9yMuaxQaQ2oBaDu1IpWmNrMkYYK"
      },
      {
        id: 2,
        isAdmin: true,
        login: "user2",
        password: "$2b$10$4YBAEGFh9uAbQBBS1INaSuY3vS9yMuaxQaQ2oBaDu1IpWmNrMkYYK"
      }
    ];

    wrapper = shallow(
      <Users
        fetchUsers={fetchUsers}
        changePermissions={changePermissions}
        deleteAccount={deleteAccount}
        users={users}
      />
    );

    const removeBtn = wrapper.find("img");
    removeBtn.simulate("click", 2);
    expect(deleteAccount).toHaveBeenCalledTimes(1);
    expect(deleteAccount).toHaveBeenCalledWith(2);
  });

  it("map and filter users", () => {
    const fetchUsers = jest.fn();
    const changePermissions = jest.fn();
    const deleteAccount = jest.fn();
    const users = [
      {
        id: 1,
        isAdmin: true,
        login: "user1",
        password: "$2b$10$4YBAEGFh9uAbQBBS1INaSuY3vS9yMuaxQaQ2oBaDu1IpWmNrMkYYK"
      },
      {
        id: 2,
        isAdmin: true,
        login: "user2",
        password: "$2b$10$4YBAEGFh9uAbQBBS1INaSuY3vS9yMuaxQaQ2oBaDu1IpWmNrMkYYK"
      }
    ];

    wrapper = shallow(
      <Users
        fetchUsers={fetchUsers}
        changePermissions={changePermissions}
        deleteAccount={deleteAccount}
        users={users}
      />
    );

    const tbody = wrapper.find("tbody");
    console.log(tbody.html());

    wrapper.setState({
      login: "user1"
    });

    const filteredTr = tbody.children().filterWhere(tr => {
      return (
        tr
          .childAt(1)
          .children()
          .text() === wrapper.instance().state.login
      );
    });

    expect(filteredTr.length).toBe(1);
  });
});
