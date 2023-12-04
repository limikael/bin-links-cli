#!/usr/bin/env node

import path from "path";
import fs from "fs";
import os from "os";
import yargs from "yargs/yargs";
import {hideBin} from "yargs/helpers";

let yargsConf=yargs(hideBin(process.argv))
    .option("link-dir",{
        default: path.join(os.homedir(),".local/bin"),
        description: "Directory where to create links.",
    })
    .option("package-dir",{
        default: process.cwd(),
        description: "Npm package dir.",
    })
    .option("create",{
    	type: "boolean",
        default: false,
        description: "Create links.",
    })
    .strict()
    .usage("bin-links -- Show or create npm package bins.")
    .epilog("For more info, see https://github.com/limikael/bin-links-cli")

let options=yargsConf.parse();

let pkg=JSON.parse(fs.readFileSync(path.join(options.packageDir,"package.json")));

for (let binName in pkg.bin) {
	let target=path.join(options.packageDir,pkg.bin[binName]);
	let link=path.join(options.linkDir,binName)

	if (options.create)
		fs.symlinkSync(target,link);

	console.log(link,"->",target);
}
