import { Admin } from "../admin/admin";
import { RuleCompleted } from "../ruleCompleted/rule-completed";
import { Team } from "../team/team";

export class Rule {
    id!: number;
    name!: string;
    points!: number;
    description!: string;
    team!: Team;
    admin!: Admin;
    rulesCompleted!: RuleCompleted[];
}
