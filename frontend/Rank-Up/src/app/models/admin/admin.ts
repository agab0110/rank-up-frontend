import { AdminReciveNotification } from "../adminReciveNotification/admin-recive-notification";
import { Prize } from "../prize/prize";
import { Rule } from "../rule/rule";
import { Team } from "../team/team";
import { User } from "../user/user";
import { Task } from "../task/task";
import { RuleCompleted } from "../ruleCompleted/rule-completed";
import { TaskCompleted } from "../taskCompleted/task-completed";

export class Admin {
    id!: number;
    team!: Team;
    user!: User;
    prizes!: Prize[];
    rules!: Rule[];
    tasks!: Task[];
    rulesCompleted!: RuleCompleted[];
    tasksCompleted!: TaskCompleted[];
    notifications!: AdminReciveNotification[];
}
