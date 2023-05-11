import { Admin } from "../admin/admin";
import { Team } from "../team/team";
import { UserGetPrize } from "../userGetPrize/user-get-prize";

export class Prize {
    id!: number;
    name!: string;
    price!: number;
    beloggingTeam!: Team;
    admin!: Admin;
    userGetPrizes!: UserGetPrize;
}
