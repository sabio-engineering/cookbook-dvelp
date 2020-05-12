import * as fs from "fs";
import * as path from "path";

export const findInDir = (
  startPath: string,
  filter: string,
  recursive: boolean = true,
  dirsOnly: boolean = false
): string[] => {
  console.log(
    `Finding ${
      dirsOnly ? "directories" : "files"
    } in directory '${startPath}' ${filter ? "containing" + filter : ""}'`
  );
  if (!fs.existsSync(startPath)) {
    console.error("No dir " + startPath);
    return [];
  }

  let foundFiles: string[] = [];
  const files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (!dirsOnly) {
      if (
        stat.isDirectory() &&
        recursive &&
        filename.indexOf("node_modules") === -1 &&
        filename.indexOf(".git") === -1 &&
        filename.indexOf("public") === -1
      ) {
        foundFiles = [
          ...foundFiles,
          ...findInDir(filename, filter, recursive, dirsOnly),
        ]; //recurse
      } else if (!filter || filename.indexOf(filter) >= 0) {
        foundFiles.push(filename);
      }
    } else {
      if (stat.isDirectory()) {
        foundFiles.push(filename);

        if (recursive) {
          foundFiles = [
            ...foundFiles,
            ...findInDir(filename, filter, recursive, dirsOnly),
          ];
        }
      }
    }
  }

  console.log(
    `Found ${foundFiles.length} ${dirsOnly ? "directories" : "files"}`
  );
  return foundFiles;
};

export default findInDir;
