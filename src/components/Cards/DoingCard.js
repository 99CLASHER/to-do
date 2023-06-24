import { Droppable, Draggable } from 'react-beautiful-dnd';

const DoingCard = (props) => {
    return(
        <div className='card'>
            <div className='card-header'>
            <div>
                <h3 className='doing'>Doing</h3>
                <span>{props.taskLength}</span>
            </div>
            </div>
            <div className='card-body'>  
            <Droppable droppableId='doing'>
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
        </div>
    )
}
export default DoingCard