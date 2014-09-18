var commands = [];
var bootCommand;
var commandOptions = [];
var commandsData = [];
var commandOptionsData = [];

var _ = require("underscore");
var fs = require('fs');
var chalk = require('chalk');
var Table = require('easy-table');

var nut = module.exports;

function addCommand(command,args,description){
	commands.push(command);
	commandsData[command] = {'command':command,'args':args,'description':description};
}
function bootCommand(command){
	bootCommand = command;
}
function addCommandOptions(command,options,args,description){
	commandOptions.push(options);
	commandOptionsData[options] = {'options':options,'command':command,'args':args,'description':description};
}
function showHelp(){
	console.log("");
	console.log("Usage:");
	console.log("");
	console.log("\ \ \ \ \ \ " + chalk.green(bootCommand) + ' <command> [<args>] [<options>]');
	console.log("");
	var t = new Table;
	for(d in commandsData){
		if(commandsData[d].args){
			var args = commandsData[d].args.replace('[','').replace(']','').split(':');
			var ar = args[0];
		}else{
			var ar = '';
		}
		t.cell('Command',commandsData[d].command+'\ \ \ \ \ \ \ \ \ \ \ ');
		t.cell('<args>	',ar+ '\ \ \ ');
		t.cell('<description>	',commandsData[d].description);
		t.newRow();				
	}
	console.log("Commands:");
	console.log("");
	console.log(t.print());
	console.log("");
	console.log(chalk.bgCyan("See '"+bootCommand+" help <command>' for more information on a specific command."));
	console.log("");
}
function showCommandHelp(command){
	console.log("");
	console.log("Usage:");
	console.log("");
	console.log("\ \ \ \ \ \ " + chalk.green(command) + ' [<args>] [<options>]');
	console.log("");
	var optionsData = commandOptionsData[command];
	var commandSubOptions = [];
	var t = new Table;
	for(d in commandOptionsData){
		if(commandOptionsData[d].command == command){
			if(commandOptionsData[d].args){
				var args = commandOptionsData[d].args.replace('[','').replace(']','').split(':');
				var ar = args[0];
			}else{
				var ar = '';
			}
			t.cell('option',commandOptionsData[d].options+'\ \ \ \ \ \ \ \ \ \ \ ');
			t.cell('<args>	',ar+ '\ \ \ ');
			t.cell('<description>	',commandOptionsData[d].description);
			t.newRow();
		}
	}
	console.log("Options:");
	console.log("");
	console.log(t.print());
	console.log("");
}
function parse(){
	var arguments = process.argv.slice(2);
	var userCommands = {};
	if(arguments[0] == 'help'){
		if(typeof(arguments[1]) == 'undefined'){
			showHelp();
		}else if(_.contains(commands,arguments[1])){
			showCommandHelp(arguments[1]);					
		}else{
			showHelp();
		}
		process.exit(0);
	}
	for(x=0;x<arguments.length;x++){
		if(x%2 == 0 && _.contains(commands,arguments[x])){
			var checkArgs = commandsData[arguments[x]].args;
			if(checkArgs){
				var argsType = checkArgs.replace('[','').replace(']','').split(':');
				if(argsType[1] == 'String' && typeof(arguments[x+1]) !== 'undefined'){
					userCommands[arguments[x]] = arguments[x+1];
				}else if(argsType[1] == 'Boolean'){
					if(typeof(arguments[x+1]) == 'boolean'){
						userCommands[arguments[x]] = arguments[x+1];
					}else{
						userCommands[arguments[x]] = true;
					}
				}
			}else{
				userCommands[arguments[x]] = true;
			}
		}
		if(x%2 == 0 && _.contains(commandOptions,arguments[x])){
			var checkArgs = commandOptionsData[arguments[x]].args;
			if(checkArgs){
				var argsType = checkArgs.replace('[','').replace(']','').split(':');
				if(typeof(arguments[x+1]) == 'undefined'){
					if(argsType[1] == 'Boolean'){
						userCommands[arguments[x]] = true;
					}else{
						userCommands[arguments[x]] = 'NAN';
					}
				}else{
					if(argsType[1] == 'String'){
						userCommands[arguments[x]] = arguments[x+1];
					}else if(argsType[1] == 'Boolean'){
						if(typeof(arguments[x+1]) == 'boolean'){
							userCommands[arguments[x+1]] = arguments[x+1]
						}else{
							userCommands[arguments[x]] = true;									
						}
					}else if(argsType[1] == 'Select'){
						var selectOptions = argsType[0].split(',');
						if(_.contains(selectOptions,arguments[x+1])){
							userCommands[arguments[x]] = arguments[x+1];
						}else{
							userCommands[arguments[x]] = 'NAN';									
						}
					}else if(argsType[1] == 'Int'){
						if(!isNaN(parseInt(arguments[x+1]),10)){
							userCommands[arguments[x]] = arguments[x+1];
						}else{
							userCommands[arguments[x]] = 'NAN';	
						}
					}else if(argsType[1] == 'Path'){
						if (fs.existsSync(arguments[x+1])) {
							userCommands[arguments[x]] = arguments[x+1];
						}else{
							userCommands[arguments[x]] = 'NAN';	
						}
					}
				}
			}else{
				userCommands[arguments[x]] = true;
			}
		}
	}
	return userCommands;
}

nut.addCommand = addCommand;
nut.bootCommand = bootCommand;
nut.addCommandOptions = addCommandOptions;
nut.showHelp = showHelp;
nut.parse = parse;