export async function validateImages(imageUrls, dummyUrl = "") {
  const validUrls = [];

  for (const url of imageUrls) {
    const isValid = await checkImageUrl(url);
    console.log("imagUrl", url, isValid);

    if (isValid) {
      validUrls.push(url);
    }
  }

  // If no valid URLs found, push the dummy URL
  if (validUrls.length === 0) {
    validUrls.push(dummyUrl);
  }

  return validUrls;
}

function checkImageUrl(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
