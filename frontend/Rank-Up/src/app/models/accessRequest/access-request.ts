import { AccessRequestKey } from "../keys/accessRequestKey/access-request-key";
import { User } from "../user/user";

export class AccessRequest {
    key!: AccessRequestKey;
    user!: User;
    //team!: Team;
    points!: number;
    accepted!: boolean;
}
