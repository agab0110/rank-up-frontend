import { Admin } from "../admin/admin";
import { RuleCompleted } from "../ruleCompleted/rule-completed";
import { Task } from "../task/task";
import { TaskCompleted } from "../taskCompleted/task-completed";
import { UserGetPrize } from "../userGetPrize/user-get-prize";
import { UserJoinsTeam } from "../userJoinsTeam/user-joins-team";
import { UserReciveNotification } from "../userReciveNotification/user-recive-notification";

export class User {
    id!: number;
    name!: string;
    surname!: string;
    email!: string;
    username!: string;
    password!: string;
    photo!: string;
    adminToUser!: Admin;
    tasksCompleted!: TaskCompleted[];
    rulesCompleted!: RuleCompleted[];
    notifications!: UserReciveNotification[];
    assignedTasks!: Task[];
    userJoinsTeams!: UserJoinsTeam[];
    userGetPrize!: UserGetPrize[];
}
