import type { CoffeeCommand } from "../class/command";

import judge from "../commands/judge";
import codeforce from "./codeforces/userProfiles";
import leetcodeProfiles from "./leetcode/userProfiles";

export default [judge, leetcodeProfiles, codeforce] as CoffeeCommand[];
