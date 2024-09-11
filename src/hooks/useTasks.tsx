import { DragEvent, useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores";
import { TaskStatus } from "../interfaces";

interface Options {
    status: TaskStatus
}


export const useTasks = ({ status }: Options) => {

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
            addTask(value, status)
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
        onTaskDrop(status)
    }

    return {
        isDragging,
        onTaskDrop,
        addTask,
        onDragOver,
        handleAddTask,
        handleDragOver,
        handleDragLeave,
        handleDrop
    }
}
