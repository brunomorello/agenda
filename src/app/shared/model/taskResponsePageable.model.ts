import { Task } from "./task.model";

export class TaskResponsePageable {
    content: Task[] | undefined;
    pageable: any[] | undefined;
    last: boolean | undefined;
    totalElements: number | undefined;
    totalPages: number | undefined;
    number: number | undefined;
    size: number | undefined;
    sort: any[] | undefined;
    first: boolean | undefined;
    numberOfElements: number | undefined;
    empty: boolean | undefined;
}