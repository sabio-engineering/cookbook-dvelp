import * as fs from "fs";
import showdown from "showdown";

import findInDir from "./findInDir";

console.log("/// Beginning generation of pages");

const templates = findInDir("./templates/partials", ".html");

console.log(`Processing layout`);

// Constants
const siteRoot = "http://localhost:5000/";
const description = "Our DVELP'ment cookbook!";

// Get page contents
let pageContents = fs.readFileSync("./templates/layout.html", "utf8");

// Replace with partials where possible
templates.forEach((template) => {
  const templateContents = fs.readFileSync(template, "utf8");

  pageContents = pageContents.replace(
    new RegExp(`{${template.replace("templates/partials/", "")}}`, "g"),
    templateContents
  );
});

console.log("Finding articles");
const articleLocations = findInDir("./", ".md");
console.log(`Found ${articleLocations.length} articles`);

const mdConverter = new showdown.Converter({
  tables: true,
  ghCodeBlocks: true,
  ghCompatibleHeaderId: true,
});

articleLocations.forEach((articleLocation) => {
  const htmlContent = mdConverter.makeHtml(
    fs.readFileSync(articleLocation, "utf8")
  );

  const splitLocation = articleLocation.split("/");
  let pageName = splitLocation[splitLocation.length - 1]
    .replace(/-/g, " ")
    .replace(".md", "");
  switch (pageName.trim().toUpperCase()) {
    case "README":
      pageName = "Cookbook";
      break;
    default:
    // do nothing
  }

  console.log(`Processing ${pageName}, ${articleLocation}`);

  // deep copy and replace
  const newPageContents = `${pageContents}`
    .replace(/{description}/g, description)
    .replace(/{page}/g, pageName)
    .replace(/{content}/, htmlContent)
    .replace(/{site_root}/g, siteRoot)
    .replace(/\.md/g, ""); // replace .md with nothing to make links work

  let writeLocation = articleLocation
    .replace(".md", ".html")
    .replace("Readme", "index");

  console.log(`Writing to ./public/${writeLocation}`);

  // Create directories if required
  if (writeLocation.indexOf("/") > -1) {
    fs.mkdirSync(
      `./public/${writeLocation.substr(0, writeLocation.lastIndexOf("/"))}`,
      { recursive: true }
    );
  }

  // Write file
  fs.writeFileSync(`./public/${writeLocation}`, newPageContents, "utf8");
});

console.log("/// Finished generation of pages");
