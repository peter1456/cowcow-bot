const { promises: fs } = require("fs");
const path = require("path");

CACHEFOLDER = path.join(__dirname, "..", "cache");
TIMELIMIT = 10000;


async function clearCache() {
    currentTime = Date.now()
    files = await fs.readdir(CACHEFOLDER);
    pngFiles = files.filter((file) => file.endsWith(".png")).map((file) => path.join(__dirname, "..", "cache", file));
    pngFilesMtime = (await Promise.all(pngFiles.map((file) => fs.stat(file)))).map((stat) => stat.mtime);
    pngFilesToRemove = pngFiles.filter((file, idx) => currentTime - pngFilesMtime[idx] > TIMELIMIT);
    await Promise.all(pngFilesToRemove.map((file) => fs.unlink(file)));
}

module.exports = clearCache;