import * as fs from "fs";
import showdown from "showdown";

import findInDir from "./findInDir";

console.log("/// Beginning generation of page navs");

const mdConverter = new showdown.Converter();

const generateForDir = (dir: string, prevDir?: string): void => {
  console.log(`Finding files in ${dir}`);
  const files = findInDir(dir, ".html", false);
  console.log(`Found ${files.length} files in ${dir}`);

  console.log(`Finding directories in ${dir}`);
  const dirs = findInDir(dir, "", false, true);
  console.log(`Found ${dirs.length} directories in ${dir}`);

  files.forEach((file) => generateNavForPage(file, files, dirs, prevDir));

  dirs.forEach((directoryFound) => {
    generateForDir(directoryFound, dir);
  });
};

const generateNavForPage = (
  page: string,
  files: string[],
  dirs: string[],
  prevDir?: string
) => {
  console.log(
    `Generating nav for ${page} ${prevDir ? "Inside " + prevDir : ""}`
  );
  let inThisSection = "#### In this section\n";
  let subSections = "#### Sub-sections\n";

  files.forEach((file) => {
    const splitFile = file.split("/");
    const link = splitFile[splitFile.length - 1].replace(".html", "");
    inThisSection += `- [${link}](${link})\n`;
  });
  dirs.forEach((dir) => {
    const splitDir = dir.split("/");
    const link = splitDir[splitDir.length - 1];
    subSections += `- [${link}](${link})\n`;
  });

  let prevDirSplit = prevDir ? prevDir.split("/") : [];

  let backString = "[Home](/)";
  if (prevDirSplit.length) {
    prevDirSplit.forEach((prevDirSection, index) => {
      if (index === 0) {
        return;
      }

      let prevDirsForCurrentSection = "";
      for (let i = 1; i < index; i++) {
        prevDirsForCurrentSection += prevDirSplit[i];
      }

      backString += ` / [${prevDirSection}](${prevDirsForCurrentSection}/${prevDirSection})`;
    });
  }

  console.log(backString);

  const back = prevDirSplit.length ? mdConverter.makeHtml(backString) : "";

  const pageContents = fs
    .readFileSync(page, "utf8")
    .replace(
      /{in_this_section}/,
      files.length ? mdConverter.makeHtml(inThisSection) : ""
    )
    .replace(
      /{sub_sections}/,
      dirs.length ? mdConverter.makeHtml(subSections) : ""
    )
    .replace(/{back}/, back);

  fs.writeFileSync(`./${page}`, pageContents, "utf8");
  console.log(`Finished generating nav for ${page}`);
};

generateForDir("public");

console.log("/// Finished generation of page navs");
