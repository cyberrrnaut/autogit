import axios from "axios";
import { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";

const UserDetails = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('accessToken'); 
      if (!token) {
        setError("No access token found.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
        });

        setUser(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div>Loading user details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <CardContainer className="inter-var">
        <CardBody className="bg-slate-400 flex flex-col justify-center items-center relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-black dark:text-white"
          >
            @{user.login}
          </CardItem>
       
          <CardItem translateZ="100" className="w-full mt-4 flex flex-col items-center">
            <img
              src={user.avatar_url}
              height="200" // Fixed height for the avatar
              width="200" // Fixed width for the avatar
              className="h-40 w-40 object-cover rounded-full" // Use same width and height for a full circle
              alt={`${user.login}'s avatar`}
            />
            <div className="flex items-center justify-center">
              <CardItem
                as="p"
                translateZ="60"
                className="text-black font-extrabold flex text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                {user.bio || ""}
              </CardItem>
            </div>
              
            <div className="flex justify-center gap-3 items-center">  
              <CardItem
                as="p"
                translateZ="60"
                className="text-black text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                {user.followers} Followers
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-black text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                {user.public_repos} Repos
              </CardItem>
            </div>
          </CardItem>

          <div className="flex justify-between items-center mt-4">
            <CardItem
              translateZ={20}
              as="a" // Use 'as' for anchor element
              href={user.html_url} // Correctly set the GitHub profile link
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              GitHub
            </CardItem>
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
              onClick={() => {
                if (user.email) {
                  window.location.href = `mailto:${user.email}`; // Correctly set the email link
                } else {
                  alert("Email not provided."); // Handle case where email is not available
                }
              }}
            >
              Mail
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
};

export default UserDetails;
