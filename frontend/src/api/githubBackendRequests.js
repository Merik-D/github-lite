import axios from "axios";

const http = axios.create({ baseURL: "http://localhost:5173/" });

export const getGitHubProfile = async (username) => {
    try {
        const response = await http.get(username);
        return response.data;
    } catch (error) {
        console.error('Error fetching GitHub profile:', error);
        throw error;
    }
};


export const getRepositories = async (username) => {
    try {
        const response = await http.get(`repos/${username}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching repositories:', error);
        throw error;
    }
};


export const getRepoContents = async (username, repoName, currentPath) => {
    try {
        const response = await http.get(`repo/${username}/${repoName}`, {
            params: { path: currentPath },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching repository content:', error);
        throw error;
    }
};
