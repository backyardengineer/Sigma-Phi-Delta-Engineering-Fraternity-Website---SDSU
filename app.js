var express = require("express");
var fs = require("fs");


function runServer(port)
{
	var app = express();

	app.use(express.static("static"));

	app.get("/", (req, resp) => {resp.send(fs.readFileSync("templates/index.html").toString());});

	app.get("/:suburl", function(req, resp){
		const TEMPLATES_DIR = "templates/";
		var template_path = TEMPLATES_DIR + req.params.suburl;
		if (fs.existsSync(template_path))
		{
			resp.send(fs.readFileSync(template_path).toString());
		}
		else
		{
			resp.send(fs.readFileSync(TEMPLATES_DIR + "error.html").toString());
		}
	});

	app.listen(port, () => {console.log("running at 0.0.0.0:%d", port)});
}

function main()
{
	if (process.argv.length != 3)
	{
		console.log("usage: node app <PORT>");
		process.exit(1);
	}
	runServer(port=process.argv[2]);
}

if (!module.parent)
{
	main()
}
