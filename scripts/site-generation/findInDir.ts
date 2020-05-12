import * as fs from "fs";
import * as path from "path";

export const findInDir = (startPath: string, filter: string): string[] => {
  console.log(
    `Finding files in directory '${startPath}' containing '${filter}'`
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
    if (
      stat.isDirectory() &&
      filename.indexOf("node_modules") === -1 &&
      filename.indexOf(".git") === -1 &&
      filename.indexOf("public") === -1
    ) {
      foundFiles = [...foundFiles, ...findInDir(filename, filter)]; //recurse
    } else if (filename.indexOf(filter) >= 0) {
      foundFiles.push(filename);
    }
  }

  console.log(`Found ${foundFiles.length} files`);
  return foundFiles;
};

export default findInDir;
