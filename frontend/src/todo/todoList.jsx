import React from 'react'
import IconButton from '../template/iconButton.jsx'

import {connect} from 'react-redux'

import {bindActionCreators} from 'redux'
import {concluido, desfazer, deletarTodo} from './todoActions.js'


const todoList = props => {

    const renderRows = () => {
        const list = props.list || []
        return list.map(todo => (
            <tr key={todo._id}> 
                <td className={(todo.done) ? 'markedAsDone' : ''} > {todo.description} </td>
                <td>
                    <IconButton style="success" icon="check" hide={todo.done}
                        onClick={() => props.concluido(todo)}>
                    </IconButton> 
                    <IconButton style="warning" icon="undo" hide={!todo.done}
                        onClick={() => props.desfazer(todo)}>
                    </IconButton> 
                    <IconButton style="danger" icon="trash-o" hide={!todo.done}
                        onClick={() => props.deletarTodo(todo)}>
                    </IconButton> 
                </td>
            </tr>
        ))
    }

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Descricao</th>
                    <th className="tableActions">Acoes</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}

const mapStateToProps = (state) => ({ list : state.todo.list })
const mapDispatchToProps = (dispatch) => bindActionCreators({concluido, desfazer, deletarTodo}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(todoList)