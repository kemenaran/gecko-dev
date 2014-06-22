/* Any copyright is dedicated to the Public Domain.
   http://creativecommons.org/publicdomain/zero/1.0/ */

/**
 * Check if self closign <script/> tags are parsed by Parser.jsm
 */

function test() {
  let {Parser } = Cu.import("resource:///modules/devtools/Parser.jsm", {});

  let source = [
    '<script type="application/javascript" src="chrome://first.js"/>',
    '<script type="application/javascript;version=1.8" src="chrome://second.js"/>',
    '<script type="application/javascript">"hello third!"</script>',
    '<script>"hello fourth!"</script>'
  ].join("\n");

  let parser = new Parser();
  let parsed = parser.get(source);

  ok(parsed,
    "HTML code should be parsed correctly.");
  
  is(parser.errors.length, 0,
    "There should be no errors logged while parsing.");

  is(parsed.scriptCount, 4,
    "There should be 4 script parsed in the parent HTML source.");

  is(parsed.getScriptInfo(source.indexOf("hello third!")).toSource(), "({start:178, length:14, index:2})",
    "The third script was located correctly.");
  is(parsed.getScriptInfo(source.indexOf("hello fourth!")).toSource(), "({start:210, length:15, index:3})",
    "The fourth script was located correctly.");
    
  finish();
}
