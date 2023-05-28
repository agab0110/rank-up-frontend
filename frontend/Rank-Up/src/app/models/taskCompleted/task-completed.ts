import { Timestamp } from "rxjs";
import { Admin } from "../admin/admin";
import { User } from "../user/user";
import { Task } from "../task/task";

export class TaskCompleted {
    id!: number;
    attached!: string;
    timestamp!: Timestamp<any>;
    task!: Task;
    admin!: Admin;
    user!: User;
    revisionDate!: Date;
    bonus!: number;
    comment!: string;
    status!: number;
}
