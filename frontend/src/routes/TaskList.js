import axios from "axios";
import React, { useEffect, useState } from "react";

function TaskList() {
    const [items, setitems] = useState([]);
    const [editTask, setEditTask] = useState({
        editedId: null,
        editedTask: "",
        editedStatus: "",
        editedDeadLine: ""
    })
    const [taskData, setTaskData] = useState({
        task: "",
        status: "",
        deadline: ""
    })
    const [err, setErr] = useState("");
    function handleChange(e) {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value
        })
    }
    async function handleSubmit() {
        setErr("");
        try {
            const respone = await axios.post(process.env.REACT_APP_URL + "/addTask", taskData);
            console.log(respone.data);

            if (respone.data.succuess) {
                const newTask = respone.data.data;
                setitems((prevItems) => [...prevItems, newTask]);
                setTaskData({
                    task: "",
                    status: "",
                    deadline: "",
                });
            } else {
                alert("task is not added");
            }
        } catch (err) {
            console.log(err)
            setErr("Error")
        }
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(process.env.REACT_APP_URL);
                console.log("API Result:", result.data.data);
                setitems(result.data.data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [])

    function toggleEditTask(id) {
        const row = items.find((data) => data._id === id);
        if (row) {
            setEditTask({
                editedId: id,
                editedTask: row.task,
                editedStatus: row.status,
                editedDeadLine: row.deadline
            })
        }
    }
    async function saveEditedTask(id) {
        try {
            const updatedData = {
                task: editTask.editedTask,
                status: editTask.editedStatus,
                deadline: editTask.editedDeadLine
            }
            console.log(id);

            await axios.put(`${process.env.REACT_APP_URL}/${id}`, updatedData);
            setitems(prev =>
                prev.map((item) =>
                    item._id === id ?
                        { ...item, ...updatedData }
                        :
                        item
                )
            )
            setEditTask({
                editedId: null,
                editedTask: "",
                editedStatus: "",
                editedDeadLine: ""
            })

        } catch (err) {
            console.log(err);
        }
    }

    async function deleteTask(id) {
        try {
            await axios.delete(`${process.env.REACT_APP_URL}/${id}`);
            setitems(prev => prev.filter(item => (item._id !== id)))
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="App">
        <div>
            <h1>TO-DO list</h1>
            {items.length > 0 ?
                (<table>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Status</th>
                            <th>Dead Line</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((itms) => (
                            <tr key={itms._id}>
                                <td>
                                    {(editTask.editedId === itms._id) ?
                                        <input type="text" value={editTask.editedTask} onChange={(e) => setEditTask({
                                            ...editTask,
                                            editedTask: e.target.value
                                        })} />
                                        :
                                        (itms.task)
                                    }
                                </td>
                                <td>
                                    {(editTask.editedId === itms._id) ?
                                        <input type="text" value={editTask.editedStatus} onChange={(e) => setEditTask({
                                            ...editTask,
                                            editedStatus: e.target.value
                                        })} />
                                        :
                                        (itms.status)
                                    }
                                </td>
                                <td>
                                    {(editTask.editedId === itms._id) ?
                                        <input type="date" value={editTask.editedDeadLine} onChange={(e) => setEditTask({
                                            ...editTask,
                                            editedDeadLine: e.target.value
                                        })} />
                                        :
                                        (itms.deadline ? new Date(itms.deadline).toLocaleString() : '')
                                    }
                                </td>
                                <td>
                                    {(editTask.editedId === itms._id) ?
                                        <button onClick={() => saveEditedTask(itms._id)}>Save</button>
                                        :
                                        <button onClick={() => toggleEditTask(itms._id)}>Edit</button>
                                    }
                                    <button onClick={() => deleteTask(itms._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>) :
                <h1>No tasks in TO_DO list</h1>
            }
            </div>
            <div>
                <h1>ADD TASK</h1>
                <label>Task</label>
                <input type="text" name="task" value={taskData.task} onChange={handleChange} />
                <label>Status</label>
                <input type="text" name="status" value={taskData.status} onChange={handleChange} />
                <label>Daedline</label>
                <input type="datetime-local" name="deadline" value={taskData.deadline} onChange={handleChange} />
                <button onClick={handleSubmit}>Add Task</button>
                {err && <h1 style={{ color: "red" }}>{err}</h1>}
            </div>
        </div>
    )
}

export default TaskList;