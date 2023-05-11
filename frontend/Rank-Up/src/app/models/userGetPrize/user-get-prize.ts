import { UserGetPrizeKey } from "../keys/userGetPrizeKey/user-get-prize-key";
import { Prize } from "../prize/prize";
import { User } from "../user/user";

export class UserGetPrize {
    key!: UserGetPrizeKey;
    user!: User;
    prize!: Prize;
    date!: Date;
}
