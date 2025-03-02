//GET /all photos
const getPhotos = () => {
  try {
    const photoData = fs.readFileSync("./data/photos.json", "utf-8");
    console.log("photos maybe?", photoData);
    return JSON.parse(photoData);
    /* console.log(JSON.parse(photoData)); */
  } catch (error) {
    return [];
  }
};

app.get("/photos", (req, res) => {
  const photos = getPhotos();
  /* res.json(photos); */

  /*   const photoURLS = photos.map((photo) => photo.photo); 
    res.json (photoURLS)*/

  const photosWithoutComments = photos.map(({ comments, ...rest }) => rest);
  res.json(photosWithoutComments);
});

//GET /single photo
app.get("/photos/:id", (req, res) => {
  const { id } = req.params;
  const photos = getPhotos();
  const singlePhoto = photos.find((photo) => photo.id === id);

  if (singlePhoto) {
    res.json(singlePhoto);
  } else {
    res.status(404).json({ message: "photo not found" });
  }
});

//GET /comments
app.get("/photos/:id/comments", (req, res) => {
  const { id } = req.params;
  const photos = getPhotos();
  const singlePhoto = photos.find((photo) => photo.id === id);

  if (singlePhoto) {
    res.json(singlePhoto.comments);
  } else {
    res.status(404).json({ message: "no photo yo" });
  }
});

//POST /comments
app.post("/photos/:id/comments", (req, res) => {
  const { id } = req.params;
  const { name, comment } = req.body;
  const photosList = getPhotos();
  console.log("posted comments");

  const photos = photosList.find((photo) => photo.id === id);
  /*   const foundIndex = photosList.findIndex((photo) => photo.id === id); */

  if (photos) {
    const newComment = {
      id: uuidv4(),
      name,
      comment,
      timestamp: Date.now(),
    };
    photos.comments.push(newComment);
    /*     photosList[foundIndex].comments.push(newComment); */
    fs.writeFileSync("./data/photos.json", JSON.stringify(photosList, null, 2));
    res.status(201).json(newComment);
  }
});

///troubleshoot 1: console log route, ask yourself am i making it to the route?
//troubleshoot 2: play with what is being returned, ask why
