import { useEffect, useState } from "react";
import axios from "axios";

const useUserProjects = userId => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = "http://localhost:3005/api/admin/user/project";

  const getUserProject = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      // Ensure that the response is an array before setting
      setProjects(
        Array.isArray(response.data.projects) ? response.data.projects : []
      );
    } catch (error) {
      console.error("Error fetching project data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserProject();
    }
  }, [userId]);

  return { projects, isLoading, getUserProject };
};

export default useUserProjects;
