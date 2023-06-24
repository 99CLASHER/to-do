import {TiPlusOutline} from 'react-icons/ti'
import { Droppable, Draggable } from 'react-beautiful-dnd';

const TodoCard = (props) => {
    return(
        <div className='card'>
            <div className='card-header'>
            <div>
                <h3 className='to-do'>To Do</h3>
                <span>{props.taskLength}</span>
            </div>
            <TiPlusOutline className='icon-2 pointer' onClick={props.screen} />
            </div>
            <div className='card-body'>
            <Droppable droppableId='todo'>
                {(provided)=>(
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                {props.tasks
                .map(({id, title}, index) => (
                
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
            <div className='new-item' onClick={props.screen}>NEW +</div>
        </div>
    )
}
export default TodoCard