export const getFetch = async (url, method, json) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    });
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};
