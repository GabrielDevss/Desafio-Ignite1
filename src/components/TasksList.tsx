import React from 'react';
import { editTaskArgs } from '../pages/Home';
import { ItemWrapper } from './ItemWrapper';
import { TasksItem } from './TasksItem';
import { FlatList } from 'react-native';


export type Task = {
  id: number;
  title: string;
  done: boolean;
}

type TasksListProps = {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitlte }: editTaskArgs) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  editTask
}: TasksListProps) {

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TasksItem
              task={item}
              toggleTaskDone={toggleTaskDone}
              editTask={editTask}
              removeTask={removeTask}
            />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}

