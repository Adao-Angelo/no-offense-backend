import axios from "axios";

const fetchImageDescription = async (url: string): Promise<string> => {
  const serviceUrl = process.env.FETCH_IMAGE_DESCRIPTION_SERVICE_URL;

  if (!serviceUrl) {
    throw new Error("SERVICE_URL is not defined in the environment variables.");
  }

  try {
    const response = await axios.get(serviceUrl, {
      params: {
        url: url,
      },
    });
    return response.data.description;
  } catch (error) {
    console.error("Error fetching description:", error);
    throw new Error("Could not fetch description");
  }
};

export default fetchImageDescription;
