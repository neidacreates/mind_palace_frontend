const getVideoId = (link) => {
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = link.match(regExp);
  if (match && match[2].length === 11) {
    console.log(match[2]);
    return match[2];
  } else {
    return false;
  }
};

export default getVideoId;
