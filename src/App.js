import './App.css';
import {useState , useRef} from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {IoCheckmarkDoneCircleSharp} from 'react-icons/io5'
import {TiTickOutline, TiPlusOutline} from 'react-icons/ti'
import {AiOutlineFileText, AiOutlineClose, AiOutlineClockCircle, AiOutlineDoubleRight, AiOutlinePlayCircle, AiOutlineRollback} from 'react-icons/ai'
function App() {
  var [date, setDate] =useState(0)
  const divScreen = useRef(null)
  const inputTitle = useRef(null)
  var [tasks, setTasks] = useState([
    { 'id': 1, 'title': 'Fyp Complition', 'date': 'Tue Jun 13 2023', 'status': 'to-do' },
    { 'id': 2, 'title': 'Etehad Commercial Project', 'date': 'Tue Jun 13 2023', 'status': 'doing' },
    { 'id': 3, 'title': 'Food App', 'date': 'Tue Jun 13 2023', 'status': 'to-do' },
    { 'id': 4, 'title': 'ReactJs Course', 'date': 'Tue Jun 13 2023', 'status': 'to-do' },
    { 'id': 5, 'title': 'IncDec App', 'date': 'Tue Jun 13 2023', 'status': 'done' },
    { 'id': 6, 'title': '20 Push Ups', 'date': 'Tue Jun 13 2023', 'status': 'to-do' },
  ])
  const todoTasks = tasks.filter(item => item.status === 'to-do')
  const doingTasks = tasks.filter(item => item.status === 'doing')
  const doneTasks = tasks.filter(item => item.status === 'done')
  var [screen, setScreen] = useState(false)
  
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
    if(inputTitle.current.value){
      var newTask = {
        'id': tasks.length + 1,
        'title': inputTitle.current.value,
        'date': new Date().toDateString(),
        'status': 'to-do'
      }
      setTasks([...tasks, newTask])
    }
    screenHandler()
  }
  const handleUpdate = (id, newStatus) => {
    // Find the task with the given ID
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, status: newStatus };
      }
      return task;
    });

    // Update the tasks array with the modified task
    setTasks(updatedTasks);
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
            <div className='card'>
              <div className='card-header'>
                <div>
                  <h3 className='to-do'>To Do</h3>
                  <span>2</span>
                </div>
                <TiPlusOutline className='icon-2 pointer' onClick={screenHandler} />
              </div>
              <div className='card-body'>
                <DragDropContext>
                    <Droppable droppableId='todo-tasks'>
                      {(provided)=>(
                      <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {todoTasks.map(({id, title}, index) => (
                        <Draggable draggableId={id.toString()} key={id.toString()} index={index}>
                        {(provided) => (
                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <p>{title}</p>
                            <AiOutlinePlayCircle onClick={() => { handleUpdate(id, 'doing') }} className="icon-2 pointer"></AiOutlinePlayCircle>
                          </li>
                        )}
                      </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                      )}
                    </Droppable>
                </DragDropContext>
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
                <ul>
                  {doingTasks.map(item => (
                  <li key={item.id}>
                    <p>{item.title}</p>
                    <div>
                      <IoCheckmarkDoneCircleSharp onClick={()=>{handleUpdate(item.id, 'done')}} className='icon-2 pointer'/>
                      <AiOutlineRollback onClick={()=>{handleUpdate(item.id, 'to-do')}} className='icon-2 pointer'></AiOutlineRollback>
                    </div>
                  </li>))}
                </ul>
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
                <ul>
                  {doneTasks.map(item=>(
                    <li key={item.id}>
                      <p>{item.title}</p>
                      <AiOutlineRollback onClick={()=>{handleUpdate(item.id, 'doing')}} className='icon-2 pointer'></AiOutlineRollback>
                    </li>
                    ))}
                </ul>
              </div>
            </div>
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
