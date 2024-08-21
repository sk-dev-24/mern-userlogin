import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';

const UserList = () => {
    const [userlist, setUserlist] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/user')
            .then((res) => {
                setUserlist(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <h4 className='text-center my-5'>User List</h4>
            {userlist.length > 0 && <Table striped bordered hover className='w-75 m-auto'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email ID</th>
                        <th>Mobile</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {userlist.map(dt =>
                        <tr key={dt._id}>
                            <td>{dt.firstname}</td>
                            <td>{dt.lastname}</td>
                            <td>{dt.email}</td>
                            <td>{dt.mobile}</td>
                            <td>{dt.role}</td>
                        </tr>
                    )}
                </tbody>
            </Table>}
        </>
    )
}

export default UserList;