import React from 'react'
import { useState } from 'react';
import CreateList from './components/CreateList';
import ListTasks from './components/ListTasks';
import { useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'



const App = () => {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('tasks'));
    setTasks(data);
  }, [])



  return (

    <DndProvider backend={HTML5Backend}>
      <div className='flex flex-col bg-gray-900 items-center pt-9 w-screen h-screen overflow-auto'>

        <CreateList tasks={tasks} setTasks={setTasks} />

        <div className='pt-3 my-5'>
          <ListTasks tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </DndProvider>


  )
}

export default App