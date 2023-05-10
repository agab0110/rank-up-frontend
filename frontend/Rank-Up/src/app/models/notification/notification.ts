import { Team } from "../team/team";
import { User } from "../user/user";

export class Notification {
    id!: number;
    title!: string;
    description!: string;
    date!: Date;
    team!: Team;
    user!: User;
}
