export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const response = await fetch("https://issueflow-kyr6.onrender.com/dashboard", {
      method: "GET",
      credentials: "include",
    });

    return response.ok;
  } catch (error) {
    console.error("Auth check failed:", error);
    return false;
  }
};

export const getStatusStyles = (status: string) => {
  return (
    {
      open: "bg-green-100 text-green-800",
      "in-progress": "bg-blue-100 text-blue-800",
      closed: "bg-red-100 text-red-800",
    }[status] || ""
  );
};

export const getLayout = (lIndex: number) => {
  return (
    [
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
      "flex flex-col gap-y-2",
    ][lIndex] || ""
  );
};

export const getProjectLayout = (lIndex: number) => {
  return (
    [
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
      "flex items-center flex-col flex-grow",
    ][lIndex] || ""
  );
};
