import './App.css';
import Info from './components/Info'
import { motion } from "framer-motion"
import AddTask from './components/AddTask';
import {TiTickOutline } from 'react-icons/ti'
import {fadeIn} from './components/variants'
import {AiOutlineFileText } from 'react-icons/ai'
import TodoCard from './components/Cards/TodoCard';
import DoneCard from './components/Cards/DoneCard';
import DoingCard from './components/Cards/DoingCard';
import { DragDropContext } from 'react-beautiful-dnd';
import React, {useState , useRef, useEffect} from 'react'

function App() {
  const divScreen = useRef(null)
  const inputTitle = useRef(null)
  const [date, setDate] =useState(0)
  const [screen, setScreen] = useState(false)
  const [progress, setProgress] = useState()
  const [tasks, setTasks] = useState([
    { 'id': 1, 'title': 'Food App', 'date': 'Tue Jun 13 2023', 'status': 'todo' },
    { 'id': 2, 'title': '20 Push Ups', 'date': 'Tue Jun 13 2023', 'status': 'todo' },
    { 'id': 3, 'title': 'ReactJs Course', 'date': 'Tue Jun 13 2023', 'status': 'doing' },
    { 'id': 4, 'title': 'Fyp Complition', 'date': 'Tue Jun 13 2023', 'status': 'todo' },
    { 'id': 5, 'title': 'Etehad Commercial Project', 'date': 'Tue Jun 13 2023', 'status': 'done' },
    { 'id': 6, 'title': 'IncDec App', 'date': 'Tue Jun 13 2023', 'status': 'todo' },
  ])

  useEffect(()=>{
    checkProgress()
  },[tasks])

  const checkProgress = () => {
    const doneTasks = tasks.filter(task => task.status === 'done')
    const percentage = (doneTasks.length / tasks.length) * 100
    setProgress(percentage.toFixed(2))
  }

  const screenHandler = () => {
    var newScreen = !screen
    if(newScreen){
      setScreen(true)
      const currentDate = new Date();
      setDate(currentDate.toDateString())
      divScreen.current.classList.add('slide-up')
    }
    else{
      setScreen(false)
      divScreen.current.classList.remove('slide-up')
    }
  }
  const addTask = () => {
    var task = {
      'id': tasks.length + 1,
      'title': inputTitle.current.value,
      'date' : date,
      'status': 'todo'
    }
    setTasks([...tasks, task])
    screenHandler()
    inputTitle.current.value = ''
  }

  const handleDragEnd = (result) => {
    const {destination, source, draggableId} = result
    if(!destination) return null
    else if(destination.droppableId === source.droppableId && destination.index === source.index) return null
    else if(destination.droppableId === source.droppableId && destination.index !== source.index)
    {
      const items = Array.from(tasks);
      const [reorderedItem] = items.splice(source.index, 1)
      items.splice(destination.index, 0, reorderedItem)
      setTasks(items)
    }
    else if(source.droppableId !== destination.droppableId){
      
      const updatedTasks = tasks.map((task) => {
        if (task.id.toString() === draggableId) {
          return { ...task, status: destination.droppableId }
        }
        return task
      })
      setTasks(updatedTasks)
    }
  }

  return (
    <div className="App">
      <div className='app-content'>
        <motion.div
        variants={fadeIn('right', 0.3)}
        initial='hidden'
        whileInView={"show"}
        viewport={{once: false, amount: 0.3}}
        className='app-header'>
          <h2><TiTickOutline /> Task List</h2>
        </motion.div>
        <div className='app-body'>
          <Info progress={progress}/>
          <motion.div 
          variants={fadeIn('right', 1.5)}
          initial='hidden'
          whileInView={"show"}
          viewport={{once: false, amount: 0.3}}
          className='navbar'>
            <div className='left'><AiOutlineFileText className='icon'/><h2> Board View </h2></div>
            <div className='right'><button onClick={screenHandler} className='btn'>New</button></div>
          </motion.div>
          <motion.div 
          variants={fadeIn('right', 2)}
          initial='hidden'
          whileInView={"show"}
          viewport={{once: false, amount: 0.3}}
          className='content'>
          <DragDropContext onDragEnd={handleDragEnd}>
            <TodoCard 
            screen={screenHandler}
            tasks={tasks.filter((task) => task.status === 'todo')}
            taskLength={tasks.filter(task => task.status === 'todo').length} 
            />
            <DoingCard 
            tasks={tasks.filter((task) => task.status === 'doing')}
            todoLength={tasks.filter(task => task.status === 'doing').length} 
            />
            <DoneCard 
            tasks={tasks.filter((task) => task.status === 'done')}
            todoLength={tasks.filter(task => task.status === 'done').length} 
            />
          </DragDropContext>
          </motion.div>
        </div>
        <AddTask 
        divScreen={divScreen}
        screen={screenHandler}
        title={inputTitle}
        date={date}
        addTask={addTask}
        />
        
      </div>
    </div>
  );
}

export default App;
