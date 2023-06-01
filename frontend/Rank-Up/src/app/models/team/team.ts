import { Admin } from "../admin/admin";
import { Prize } from "../prize/prize";
import { Rule } from "../rule/rule";
import { UserJoinsTeam } from "../userJoinsTeam/user-joins-team";

export class Team {
    code!: String;
    codice!: number;
    name!: string;
    photo!: string;
    privacy!: boolean;
    pointVisibility!: boolean;
    prizes!: Prize[];
    notifications!: Notification[];
    rules!: Rule[];
    tasks!: Task[];
    userJoinsTeam!: UserJoinsTeam[];
    creatorAdmin!: Admin;
    admins!: Admin[];
}
