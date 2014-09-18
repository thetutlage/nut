#!/usr/bin/env node

var nut = require('../nut');

// Your app command eg bower
nut.bootCommand('gitHut');

nut.addCommand('download','[repo:String]','Enter repo name you want to download');
nut.addCommand('info','[repo:String]','Enter repo info');
nut.addCommand('whoami',false,'Find who you are on gitHut');

nut.addCommandOptions('download','--path','[<path/from/cwd>:Path]','Enter path where you want to save this repo');
nut.addCommandOptions('info','--long','[<Boolean>:Boolean]','Will show complete descriptions');

var commands = nut.parse();

console.log(commands);