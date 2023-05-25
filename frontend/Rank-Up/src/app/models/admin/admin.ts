import { AdminReciveNotification } from "../adminReciveNotification/admin-recive-notification";
import { Team } from "../team/team";
import { User } from "../user/user";

export class Admin {
    id!: number;
    user!: User;
    team!: Team;
    notifications!: AdminReciveNotification[];
}
