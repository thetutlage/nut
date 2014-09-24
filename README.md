nut
===
Nut is an ultimate nodejs command line arguments manager,it helps you in setting up help menu and listen to user arguments in a linear fashion

Example
===
```javascript

	#!/usr/bin/env node
	var nut = require('nut-cli');

	// Your app command eg bower
	nut.bootCommand('gitHut');

	nut.addCommand('download','[repo:String]','Enter repo name you want to download');
	nut.addCommand('info','[repo:String]','Enter repo info');
	nut.addCommand('whoami',false,'Find who you are on gitHut');

	nut.addCommandOptions('download','--path','[<path/from/cwd>:Path]','Enter path where you want to save this repo');
	nut.addCommandOptions('info','--long','[<Boolean>:Boolean]','Will show complete descriptions');
	var commands = nut.parse();
	console.log(commands);
```

Above example will help you in registering 3 simple commands with options.Below is the usage guide.

```
./index.js help info

```

![help screen for info command](http://i1117.photobucket.com/albums/k594/thetutlage/ScreenShot2014-09-17at55115pm_zps018a6202.png)


```
./index.js help download

```

![help screen for download command](http://i1117.photobucket.com/albums/k594/thetutlage/ScreenShot2014-09-17at55103pm_zpsc974b3d0.png)


```
./index.js help

```

![help screen](http://i1117.photobucket.com/albums/k594/thetutlage/ScreenShot2014-09-17at54134pm_zps9f084b1b.png)

```
./index.js download jquery --path "/Users/harmindervirk/"

```

![help screen](http://i1117.photobucket.com/albums/k594/thetutlage/ScreenShot2014-09-17at55159pm_zps42381caf.png)

