export const sendQuery = async (query) => {
  try {
    const response = await fetch(
      "https://weo.ai/api/v2/ai/weo/chat?queryString=" + query
    );
    const data = await response.json();
    console.log(data);
    return data.data;
  } catch (err) {
    console.log("Something went wrong in voice api", err);
    return "";
  }
};
