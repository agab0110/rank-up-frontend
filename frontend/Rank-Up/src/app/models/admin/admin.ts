import { Prize } from "../prize/prize";
import { Rule } from "../rule/rule";
import { RuleCompleted } from "../ruleCompleted/rule-completed";
import { TaskCompleted } from "../taskCompleted/task-completed";
import { Team } from "../team/team";
import { User } from "../user/user";

export class Admin {
    id!: number;
    userToAdmin!: User;
    createdTasks!: Task[];
    createdRules!: Rule[];
    createdPrizes!: Prize[];
    createdTeams!: Team[];
    rulesRevisioned!: RuleCompleted[];
    taskRevisioned!: TaskCompleted[];
}
