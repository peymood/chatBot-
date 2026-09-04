import axios from "axios";

export async function menuApi() {
  try {
    const res = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/search.php?f=a"
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
}