import axios from "axios";
import { AppError } from "../../error";

const fetchImageDescription = async (url: string): Promise<string> => {
  const serviceUrl = process.env.FETCH_IMAGE_DESCRIPTION_SERVICE_URL;

  if (!serviceUrl) {
    throw new AppError(
      "SERVICE_URL is not defined in the environment variables."
    );
  }

  try {
    const response = await axios.get(`${serviceUrl}/process-image`, {
      params: {
        url: url,
      },
    });

    return response.data[0].generated_text;
  } catch (error) {
    throw new AppError("Could not fetch description");
  }
};

export { fetchImageDescription };
