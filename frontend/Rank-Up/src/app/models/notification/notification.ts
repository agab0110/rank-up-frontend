import { AdminReciveNotification } from "../adminReciveNotification/admin-recive-notification";
import { Team } from "../team/team";
import { UserReciveNotification } from "../userReciveNotification/user-recive-notification";

export class Notification {
    id!: number;
    title!: string;
    description!: string;
    date!: Date;
    team!: Team;
    user!: UserReciveNotification[];
    admin!: AdminReciveNotification[];
}
