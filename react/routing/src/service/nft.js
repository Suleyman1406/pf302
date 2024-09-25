import axios from "axios";
import toast from "react-hot-toast";

export async function getNfts({
  pageSize = 6,
  skip = 0,
  searchStr = "",
  sort = "",
  creators = "",
}) {
  try {
    const { data } = await axios(
      `http://localhost:3000/api/nfts?pageSize=${pageSize}&skip=${skip}&searchStr=${searchStr}&sort=${sort}&creators=${creators}`
    );
    return data;
  } catch (err) {
    console.error(err);
    toast.error("Failed to fetch data");
    return {
      nfts: [],
      hasMore: false,
      totalCount: 0,
    };
  }
}

export async function createNft(formData) {
  return axios.post("http://localhost:3000/api/nfts", formData);
}
