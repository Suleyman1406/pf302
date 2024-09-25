import axios from "axios";
import toast from "react-hot-toast";

export async function getCreators() {
  try {
    const { data } = await axios("http://localhost:3000/api/creators");
    return data;
  } catch (err) {
    console.error(err);
    toast.error("Failed to get data");
    return [];
  }
}
