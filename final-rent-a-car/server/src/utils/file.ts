import fs from "fs";

export function deleteFiles(files: Express.Multer.File[]) {
  files.forEach((file) => {
    fs.unlink(file.path, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
}

export function deleteFilesByPaths(paths: string[]) {
  paths.forEach((path) => {
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
}
