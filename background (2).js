
class Bookmark {
  static async save(url) {
    browser.bookmarks.create({ url });
  }

  static async load() {
    return new Promise(async (resolve, reject) => {

      await browser.bookmarks.getTree().then(root => {
          const url = root[0].children[2].children;

          const data = [];
          for (let i = 0; i < url.length; i++){
            console.log();

            data.push({"id": url[i].id, "data": decodeURIComponent(JSON.parse(url[i].url.split("data:text/json,")[1])["data"])})
          }

          resolve(data);
        }).catch((error) => reject(error));
    });
  }

  static async delete(id) {
    browser.bookmarks.remove(id)
      .catch((error) => console.error("Error deleting bookmark:", error));
  }
}

browser.runtime.onMessage.addListener((message) => {
  if (message.action === "setBookmark")
    Bookmark.save(message.url);
  else if (message.action === "getBookmark")
    return Bookmark.load()
  else if (message.action === "deleteBookmark")
  Bookmark.delete(message.id)
});