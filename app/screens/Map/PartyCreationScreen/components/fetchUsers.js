import axios from "axios";

export const fetchUsers_ = async (setCreators) => {
  const responce = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  setCreators(responce.data.slice(0, 3));
};
