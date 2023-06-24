import React from 'react'
import { motion } from "framer-motion"
import {fadeIn} from './variants'
import { TiTickOutline } from 'react-icons/ti'
import { CircleProgress  } from 'react-progress-component';

const Info = (props) => {
    return (
        <motion.div
        variants={fadeIn('right', 0.7)}
        initial='hidden'
        whileInView={"show"}
        viewport={{once: false, amount: 0.3}}
        className='info'>
            <div className='info-data'>
                <h1><TiTickOutline /> Task List</h1>
                <p>Use this template to track your personal tasks.</p>
                <p>Click <span>+ New</span> to create a new task directly on this  board.</p>
                <p>Click an existing task to add additional context or subtasks.</p>
            </div>
            <div className='info-progress'>
                <CircleProgress  
                backgroundColor= {'#ffffff'}
                strokeBackgroundColor = {'#ffc8c8'}
                strokeColor={'#ff6a6a'}
                radius={100}
                size={ 200 } 
                progressValue={ props.progress } />
            </div>
        </motion.div>
        )
}
export default Info