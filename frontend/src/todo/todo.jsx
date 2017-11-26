import React from 'react'

import PageHeader from '../template/pageHeader.jsx'
import TodoForm from './todoForm.jsx'
import TodoList from './todoList.jsx'

export default props => (
    <div>
        <PageHeader name="Tarefas" small="cadastro"></PageHeader>
        <TodoForm  />
        <TodoList />
    </div>
)
