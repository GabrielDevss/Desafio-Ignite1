import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';
import { Header } from '../components/Header';

export type editTaskArgs = {
  taskId: number,
  taskNewTitlte: string,
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find(task => task.title === newTaskTitle);
    if (taskWithSameTitle) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks(oldTasks => [...oldTasks, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const itemFound = updatedTasks.find(item => item.id === id);

    if (!itemFound) {
      return;
    }

    itemFound.done = !itemFound.done;
    setTasks(updatedTasks);

  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        style: 'cancel',
        text: 'não'
      },
      {
        onPress: () => {
          setTasks(oldTasks => oldTasks.filter(
            task => task.id !== id
          ));
        }
      },
    ])
   
  }

  function handleEditTask({ taskId, taskNewTitlte }: editTaskArgs) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    
      const taskTobeUpdated = updatedTasks.find(item => item.id === taskId);

      if(!taskTobeUpdated)
      return;

      taskTobeUpdated.title = taskNewTitlte ;
      setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})