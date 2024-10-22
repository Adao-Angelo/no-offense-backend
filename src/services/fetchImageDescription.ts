import axios from "axios";

const fetchImageDescription = async (url: string): Promise<string> => {
  const serviceUrl = process.env.FETCH_IMAGE_DESCRIPTION_SERVICE_URL;

  if (!serviceUrl) {
    throw new Error("SERVICE_URL is not defined in the environment variables.");
  }

  try {
    const response = await axios.get(`${serviceUrl}/process-image`, {
      params: {
        url: url,
      },
    });
    return response.data[0].generated_text;
  } catch (error) {
    throw new Error("Could not fetch description");
  }
};

export { fetchImageDescription };
