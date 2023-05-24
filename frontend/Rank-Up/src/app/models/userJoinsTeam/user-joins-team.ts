import { UserJoinsTeamKey } from "../keys/userJoinsTeamKey/user-joins-team-key";
import { Team } from "../team/team";
import { User } from "../user/user";

export class UserJoinsTeam {
    id!: number;
    user!: User;
    team!: Team;
    points!: number;
    accepted!: number;
}
