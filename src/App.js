import './App.css';
import React, {useState , useRef} from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {IoCheckmarkDoneCircleSharp} from 'react-icons/io5'
import {TiTickOutline, TiPlusOutline} from 'react-icons/ti'
import {AiOutlineFileText, AiOutlineClose, AiOutlineClockCircle, AiOutlineDoubleRight, AiOutlinePlayCircle, AiOutlineRollback} from 'react-icons/ai'
function App() {
  var [date, setDate] =useState(0)
  var [screen, setScreen] = useState(false)
  const divScreen = useRef(null)
  const inputTitle = useRef(null)
  
  const [tasks, setTasks] = useState([
    { 'id': 1, 'title': 'Food App', 'date': 'Tue Jun 13 2023', 'status': 'todo' },
    { 'id': 2, 'title': '20 Push Ups', 'date': 'Tue Jun 13 2023', 'status': 'todo' },
    { 'id': 3, 'title': 'ReactJs Course', 'date': 'Tue Jun 13 2023', 'status': 'todo' },
    { 'id': 4, 'title': 'Fyp Complition', 'date': 'Tue Jun 13 2023', 'status': 'todo' },
    { 'id': 5, 'title': 'Etehad Commercial Project', 'date': 'Tue Jun 13 2023', 'status': 'todo' },
    { 'id': 6, 'title': 'IncDec App', 'date': 'Tue Jun 13 2023', 'status': 'todo' },
  ])
  
  
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
  }

  const handleDragEnd = (result) => {
    const {destination, source, draggableId} = result
    if(!destination) return null
    else if(destination.droppableId === source.droppableId && destination.index === source.index) return null
    else if(destination.droppableId === source.droppableId && destination.index !== source.index)
    {
      const items = Array.from(tasks);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setTasks(items);
    }
    else if(source.droppableId !== destination.droppableId){
      
      const updatedTasks = tasks.map((task) => {
        if (task.id.toString() === result.draggableId) {
          return { ...task, status: destination.droppableId };
        }
        return task;
      });
    
      setTasks(updatedTasks);
    }

  }
  return (
    <div className="App">
      <div className='app-content'>
        <div className='app-header'>
          <h2><TiTickOutline /> Task List</h2>
        </div>
        <div className='app-body'>
          <div className='info'>
            <h1><TiTickOutline /> Task List</h1>
            <p>Use this template to track your personal tasks.</p>
            <p>Click <span>+ New</span> to create a new task directly on this  board.</p>
            <p>Click an existing task to add additional context or subtasks.</p>
          </div>
          <div className='navbar'>
            <div className='left'><AiOutlineFileText className='icon'/><h2> Board View </h2></div>
            <div className='right'><button onClick={screenHandler} className='btn'>New</button></div>
          </div>
          <div className='content'>
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className='card'>
              <div className='card-header'>
                <div>
                  <h3 className='to-do'>To Do</h3>
                  <span>2</span>
                </div>
                <TiPlusOutline className='icon-2 pointer' onClick={screenHandler} />
              </div>
              <div className='card-body'>
                <Droppable droppableId='todo'>
                  {(provided)=>(
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks
                  .filter((task) => task.status === 'todo')
                  .map(({id, title, status}, index) => (
                    
                    <Draggable draggableId={id.toString()} key={id.toString()} index={index}>
                    {(provided) => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <p> {title}</p>
                      </li>
                    )}
                    </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                  )}
                </Droppable>
              </div>
              <div className='new-item' onClick={screenHandler}>NEW +</div>
            </div>
            <div className='card'>
              <div className='card-header'>
                <div>
                  <h3 className='doing'>Doing</h3>
                  <span>2</span>
                </div>
              </div>
              <div className='card-body'>  
                <Droppable droppableId='doing'>
                    {(provided)=>(
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {tasks
                      .filter((task) => task.status === 'doing')
                      .map(({id, title, status}, index) => (
                      <Draggable draggableId={id.toString()} key={id.toString()} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <p> {title}</p>
                        </li>
                      )}
                      </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                    )}
                  </Droppable>
              </div>
            </div>
            <div className='card'>
              <div className='card-header'>
                <div>
                  <h3 className='done'>Done</h3>
                  <span>2</span>
                </div>
              </div>
              <div className='card-body'>  
                <Droppable droppableId='done'>
                  {(provided)=>(
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks
                    .filter((task) => task.status === 'done')
                    .map(({id, title, status}, index) => (
                    <Draggable draggableId={id.toString()} key={id.toString()} index={index}>
                    {(provided) => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <p> {title}</p>
                      </li>
                    )}
                    </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                  )}
                </Droppable>
              </div>
            </div>
          </DragDropContext>
          </div>
        </div>
        <div ref={divScreen} className="screen">
          <div className='screen-header'>
            <h2>Add Task</h2>
            <AiOutlineClose className='icon pointer' onClick={screenHandler}/>
          </div>
          <div className='screen-body'>
            <form>
              <input className='title-input' ref={inputTitle} placeholder='Write Your Title Here' /> <button type='button' className='btn' onClick={addTask}>Add</button>
              <div className='data'><p><AiOutlineClockCircle className='icon-3'/> Date</p>  <p>{date}</p></div>
              <div className='data'><p><AiOutlineDoubleRight className='icon-3'/> Status</p>  <p>To do</p></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
