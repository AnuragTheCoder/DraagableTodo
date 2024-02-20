import React, { useState } from 'react'
import { v4 as uuid } from "uuid";
import IconAdd from './Icons/Icon1';
import toast, { Toaster } from 'react-hot-toast'
// import 'react-toastify/dist/ReactToastify.css';
const CreateList = ({ tasks, setTasks }) => {
    // let notify = () => toast("Task created Successfully");
    const [task, setTask] = useState({
        name: "",
        id: 123,
        cat: "todo",
    })
    const id = uuid();
    const [input, setInput] = useState("");
    const createFunc = (e) => {
        e.preventDefault();
        console.log(task.name);
        if (task.name.length <= 3) {
            return toast.error("A task should have more than 3 letters")

        }

        if (task.name.length >= 100) {
            return toast.error("A task should not have more than 100 letters")

        }
        setTasks(prev => {
            let list;
            if (prev == null) {
                list = [task]
            }
            else {
                list = [...prev, task];
            }
            localStorage.setItem("tasks", JSON.stringify(list));
            return list
        });
        console.log(task);
        console.log(tasks);


        setTask({ ...task, name: "" })
        toast.success("🎉 Task created Successfully")
    }






    return (
        <>
            <div>
                <form className='px-2 mx-2 flex   ' onSubmit={createFunc}>
                    <input type="text" className='border-2 border-white font-serif mx-3 rounded w-80 bg-slate-300' value={task.name} onChange={(e) => setTask({ ...task, id: uuid(), name: e.target.value })} />
                    <button className='rounded-2xl flex border-2 border-white p-3 font-serif   bg-green-400' type='submit'><span>Create</span> <span><IconAdd className='mx-1 mt-[5.5px]' /></span></button>
                    <Toaster
                        position="bottom-center"
                        reverseOrder={false}
                    />
                </form>
            </div>
        </>
    )
}

export default CreateList