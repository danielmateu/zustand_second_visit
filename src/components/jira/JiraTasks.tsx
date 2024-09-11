import { IoAddOutline, IoCheckmarkCircleOutline, IoEllipsisHorizontalOutline } from 'react-icons/io5';
import { Task, TaskStatus } from '../../interfaces';
import { SingleTask } from './Single-Task';
import { DragEvent, useState } from 'react';
import { useTaskStore } from '../../stores';
import classNames from 'classnames';
import Swal from 'sweetalert2';



interface Props {
  title: string;
  status: TaskStatus;
  tasks: Task[];
}


export const JiraTasks = ({ title, status: value, tasks }: Props) => {

  const isDragging = useTaskStore(state => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore(state => state.onTaskDrop);
  const addTask = useTaskStore(state => state.addTask);

  const [onDragOver, setOnDragOver] = useState(false);

  const handleAddTask = async () => {

    const { isConfirmed, value } = await Swal.fire({
      title: 'Nueva Tarea',
      input: 'text',
      // color: '#afafaf',
      inputLabel: 'Ingrese el nombre de la tarea',
      inputPlaceholder: 'Nombre de la tarea',
      showCancelButton: true,
      cancelButtonColor: '#ff5252',
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#4c93af',
      // background: '#252525',
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar un nombre para la tarea'
        }
      }
    })

    if (isConfirmed) {
      addTask(value, 'open')
    }
    // addTask('New Task', value)
  }

  // console.log({ isDragging });

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    // console.log('Drag over')
    setOnDragOver(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setOnDragOver(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setOnDragOver(false)
    // changeTaskStatus(draggingTaskId!, value)
    onTaskDrop(value)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={classNames("!text-black relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]",
        { 'border-4 border-red-500 border-dotted': isDragging },
        { 'border-4 border-green-500 border-dotted': isDragging && onDragOver },
      )}>
      {/* Task Header */}
      <div className="relative flex flex-row justify-between">

        <div className="flex items-center justify-center">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={{ fontSize: '50px' }} />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
        </div>

        <button
          onClick={handleAddTask}
        >
          <IoAddOutline
          />
        </button>

      </div>

      {/* Task Items */}
      <div className="h-full w-full">

        {
          tasks.map(task => (
            <SingleTask key={task.id} task={task} />
          ))
        }
      </div>
    </div>
  );
};