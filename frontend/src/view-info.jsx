import { format } from 'date-fns';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const ViewInfo = () => {
    const { id } = useParams(); 
    const [person, setPerson] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const response = await fetch(
                  `http://localhost:5000/users/view/${id}`
                );
                if (!response.ok) {
                    throw new Error("No user found");
                }
                const data = await response.json();
                setPerson(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchPerson();
    }, [id]);

    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!person) return <p>No data found</p>;

    return (
      <div className="viewUser">
        <table border="1" cellPadding="10" cellSpacing="0">
          <tbody>
            <tr>
              <td>
                <strong>Full name</strong>
              </td>
              <td>
                {person.firstName} {person.lastName}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Email</strong>
              </td>
              <td>{person.email}</td>
            </tr>
            <tr>
              <td>
                <strong>Telephone</strong>
              </td>
              <td>{person.telephone}</td>
            </tr>
            <tr>
              <td>
                <strong>Age</strong>
              </td>
              <td>{person.age}</td>
            </tr>
            <tr>
              <td>
                <strong>Country</strong>
              </td>
              <td>{person.country}</td>
            </tr>
            <tr>
              <td>
                <strong>Gender</strong>
              </td>
              <td>{person.gender}</td>
            </tr>
            <tr>
              <td>
                <strong>Last update</strong>
              </td>
              <td>{format(new Date(person.updatedAt), "MM-dd | HH:mm")}</td>
            </tr>
            <tr>
              <td>
                <strong>Date created</strong>
              </td>
              <td>{format(new Date(person.createdAt), "MM-dd | HH:mm")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
};

export default ViewInfo;
