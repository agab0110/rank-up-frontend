import { Admin } from "../admin/admin";
import { TaskCompleted } from "../taskCompleted/task-completed";
import { Team } from "../team/team";
import { User } from "../user/user";

export class Task {
    id!: number;
    name!: string;
    points!: number;
    description!: string;
    endDate!: Date;
    startDate!: Date;
    team!: Team;
    admin!: Admin;
    taskCompleted!: TaskCompleted;
    specificUsers!: User[];
}
