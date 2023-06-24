import {AiOutlineClose, AiOutlineClockCircle, AiOutlineDoubleRight} from 'react-icons/ai'
const AddTask = (props) => {
    return (
        <div ref={props.divScreen} className="screen">
          <div className='screen-header'>
            <h2>Add Task</h2>
            <AiOutlineClose className='icon pointer' onClick={props.screen}/>
          </div>
          <div className='screen-body'>
            <form>
              <input className='title-input' ref={props.title} placeholder='Write Your Title Here' /> 
              <button type='button' className='btn' onClick={props.addTask}>Add</button>
              <div className='data'><p><AiOutlineClockCircle className='icon-3'/> Date</p>  <p>{props.date}</p></div>
              <div className='data'><p><AiOutlineDoubleRight className='icon-3'/> Status</p>  <p>To do</p></div>
            </form>
          </div>
        </div>
    )
}
export default AddTask