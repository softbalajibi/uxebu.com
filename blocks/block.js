var md = require('markdown').markdown;

function _prepareBlock(block){
    var obj = {
        h1: [""],
        ul: []
    }
}

exports.simpleBox = function(block){
	// Summary:
	// 		This is a simple textbox which renders a title, text
    // 		and an optional link at the bottom.
    //
    // Markdown:
    // 		Sample markup:
    //
	// 		Title						| Required
	// 		=====						|
	//								    	|
	// 		Some text.					| Required [+1, at least one]
	//                                  	|
	// 		[Link](http://uxebu.com)	| Optional, if available as last item.
	//
	// Returns:
	// 		title:
	// 		content:
	//		link:

    var view = {};
    view.title = block.shift()[1]; // Remove the first element which is the title.
    if (block[block.length-1][0]=='a'){
        view.link = md.renderJsonML(["html", block.pop()]); // Remove the last element if it is an a-href.
    }
    view.content = block.map(function(i){return md.renderJsonML(["html", i]);}).join(" ");
	return view;
};

exports.listBox = function(block){
    var view = {};
    view.title = block.shift()[1]; // Remove the first element which is the title.
    // Now we expect a "ul"
    // We take all the "li"s and pass them separately into the list-array that we iterate over in the tpl.
    view.list = block[0].slice(1).map(function(i){ var split = i[1].split("\n"); return {header:split[0], text:split[1]}; });
console.log(JSON.stringify(view.list))
    return view;
}