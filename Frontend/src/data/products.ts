const API_URL: string | undefined = import.meta.env
  .VITE_APP_TRAVEL_JOURNAL_API_URL as string | undefined;
if (!API_URL)
  throw new Error("API URL is required, are you missing a .env file?");
const baseURL: string = `${API_URL}/posts`;

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(baseURL);
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while fetching the products");
    }
    throw new Error(errorData.error);
  }
  const data: Product[] = await res.json();
  return data;
};
