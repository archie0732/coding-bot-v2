import type { CoffeeCommand } from "../class/command";

import judge from "../commands/judge";
import leetcodeProfiles from "./leetcode/userProfiles";

export default [judge, leetcodeProfiles] as CoffeeCommand[];
