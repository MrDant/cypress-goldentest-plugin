const path = require("path");
const fs = require("fs");
const { PNG } = require("pngjs");
const pixelmatch = require("pixelmatch");
const { matcher } = require("./constants");

module.exports = function (on, config) {
  on("after:screenshot", function (element) {
    // if screenshot hasn't the matcher, pass
    if (!element.blackout.includes(matcher)) return;
    // retrieve snapshotPath
    const snapshotPath = element.path.replace(
      config.screenshotsFolder,
      config.fixturesFolder + "/snapshots"
    );
    if (fs.existsSync(snapshotPath)) {
      // if file exist check diff
      return new Promise((resolve, reject) => {
        // retrieve images data
        const img1 = PNG.sync.read(fs.readFileSync(element.path));
        const img2 = PNG.sync.read(fs.readFileSync(snapshotPath));
        const { width, height } = img1;
        const diff = new PNG({ width, height });
        if (
          pixelmatch(img1.data, img2.data, diff.data, width, height, {
            threshold: 0.0,
          })
        ) {
          // create screen diff and actual
          const fileName = path.basename(element.path);
          fs.writeFileSync(
            element.path.replace(fileName, "diff:" + fileName),
            PNG.sync.write(diff)
          );
          fs.renameSync(
            element.path,
            element.path.replace(fileName, "actual:" + fileName)
          );
          return reject(new Error("Les images sont différentes"));
        }
        fs.unlinkSync(element.path);
        resolve({});
      });
    } else {
      // else save in snapshot folder
      return new Promise((resolve, reject) => {
        const newSnapshotDir = path.dirname(snapshotPath);
        if (!fs.existsSync(newSnapshotDir)) {
          fs.mkdirSync(newSnapshotDir, { recursive: true });
        }
        // move in snapshot
        fs.rename(element.path, snapshotPath, (err) => {
          if (err) return reject(err);
          resolve({ path: snapshotPath });
        });
      });
    }
  });
};
