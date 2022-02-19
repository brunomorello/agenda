export class Task {
    id!: string;
    shortDescription!: string;
    description: string | undefined;
    status: string | undefined;
    dueDate: Date | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
}