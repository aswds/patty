import { useEffect } from "react";

const useFetchUserData = (
  fetchFunction: () => Promise<void>,
  dependencies: any[]
) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchFunction();
      } catch (error) {
        // Handle errors
      }
    };

    fetchData();
  }, dependencies);
};
export default useFetchUserData;
