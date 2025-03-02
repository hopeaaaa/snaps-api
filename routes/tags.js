//GET /tags
const getTags = () => {
  try {
    const data = fs.readFileSync("./data/tags.json", "utf-8");
    console.log(data);
    console.log(JSON.parse(data));
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading tags.json:", error);
    return [];
  }
};

app.get("/tags", (req, res) => {
  const tags = getTags();
  res.json(tags);
});
