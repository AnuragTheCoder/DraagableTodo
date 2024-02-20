import React from 'react'
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast'
import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';
import ArrowDown from './Icons/ArrowDown';
import ArrowUp from './Icons/icon2';

const ListTasks = ({ tasks, setTasks }) => {
    const [todos, setTodos] = useState([]);
    const [inProgress, setProgress] = useState([]);
    const [closed, setClosed] = useState([]);

    useEffect(() => {

        const fTodos = tasks.filter((task) => task.cat === "todo")
        const fProgress = tasks.filter((task) => task.cat === "inprogress")
        const fClosed = tasks.filter((task) => task.cat === "closed")


        setTodos(fTodos)
        setClosed(fClosed)
        setProgress(fProgress)


    }, [tasks])
    // console.log(todos);

    const statuses = ["todo", "inprogress", "closed"]






    return (
        <div className='flex'>
            {statuses.map((cat, index) => <Section tasks={tasks} todos={todos} setTasks={setTasks} inProgress={inProgress} closed={closed} key={index} cat={cat} />)}

        </div>
    )
}

export default ListTasks

const Section = ({ cat, tasks, setTasks, todos, inProgress, closed }) => {

    let text = "Todo";
    let bg = "bg-slate-500";
    let tasksTomap = todos;


    if (cat === 'inprogress') {
        text = "In Progress"
        bg = "bg-purple-500"
        tasksTomap = inProgress
    }
    if (cat === "closed") {
        text = "Closed"
        bg = "bg-green-500"
        tasksTomap = closed
    }

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => addItemToSection(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    const addItemToSection = (id) => {
        // console.log("dropped", id, cat)
        setTasks(prev => {
            // console.log("prev",prev)
            const mTasks = prev.map(t => {
                if (t.id === id) {
                    return { ...t, cat: cat }
                }
                else {
                    return t
                }
            })

            localStorage.setItem("tasks", JSON.stringify(mTasks));
            toast("Task changed Successfully", { icon: "🔥" })
            return mTasks
        })
    }

    return (
        <div ref={drop} className={`w-64 rounded-md p-2  ${isOver ? "bg-slate-200" : ""}`}>
            < Header text={text} bg={bg} count={tasksTomap.length} />
            {tasksTomap.map((task) => {
                return <Task key={task.id} setTasks={setTasks} tasks={tasks} task={task} />
            })}
        </div>
    )
}


const Header = ({ text, bg, count }) => {
    return (
        <div className={`${bg} mx-4 flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
            {text}{" "}
            <div className='ml-2 p-1 mr-2 bg-white -5 h-5 rounded-full flex items-center justify-center text-black'>{count}</div>
        </div>
    )
}


const Task = ({ task, tasks, setTasks }) => {

    const [isOpen, setIsOpen] = useState(false);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))


    const handleRemove = (id) => {
        const newTasks = tasks.filter((t) => t.id !== id)
        setTasks(newTasks);
        return toast.success("Task deleted SuccessFully 🚬")


    }
    let str = task.description
    const [val, setVal] = useState(str);
    const handleInput = (id, e) => {
        e.preventDefault()
        console.log(id)
        const myTasks = tasks.map((t) => {
            if (t.id === id) {
                return { ...t, description: val }
            }
            else {
                return t;
            }
        })

        setTasks(myTasks);
        localStorage.setItem("tasks", JSON.stringify(myTasks));


    }
    return (
        <div className='relative'>
            <div ref={drag} className={`relative ${isDragging ? "opacity-25" : ""} bg-white ${isOpen ? "flex-col" : ""} justify-center items-stretch p-4 mt-8 shadow-md flex rounded cursor-grab`}>
                <div>{task.name}</div>
                <button onClick={() => handleRemove(task.id)} className='absolute bottom-3 text-slate-400 right-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>



                </button>
                <button className='ml-20' onClick={() => { setIsOpen((prev) => !prev) }}>
                    {
                        !isOpen ? (
                            <ArrowDown />
                        ) : (
                            <ArrowUp />
                        )
                    }
                </button>
                {isOpen && <form onSubmit={(e) => handleInput(task.id, e)}><input type="text" value={val} onChange={(e) => setVal(e.target.value)} className='bg-blue-400 right-0 top-20  flex  w-[70%] overflow-auto h-36  p-2  flex-col items-start rounded-lg  ' /></form>}
                <Toaster
                    position='bottom-center'
                    reverseOrder={false}
                />
            </div>
        </div>
    )
}