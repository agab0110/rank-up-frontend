import { Admin } from "../admin/admin";
import { Notification } from "../notification/notification"

export class AdminReciveNotification {
    id!: number;
    user!: Admin;
    notification!: Notification;
}
