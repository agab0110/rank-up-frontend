import { Timestamp } from "rxjs";
import { Rule } from "../rule/rule";
import { Admin } from "../admin/admin";
import { User } from "../user/user";

export class RuleCompleted {
    id!: number;
    attached!: string;
    timestamp!: Timestamp<any>;
    rule!: Rule;
    admin!: Admin;
    user!: User;
    revisionDate!: Date;
    bonus!: number;
    comment!: string;
    status!: number;
}
