import { useQuery } from "@tanstack/react-query";

import { vrpProductDetailDownloadRequest } from "../../utils/https-request/vrp/vrpProductDetailDownloadRequest";


function useGetVrpProductDetailDownLoad({ requestId }) { // Destructure as an object
  const {
    data,
    isError,
    isPending,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ["vrpProductDetail","vrpProductDetailDownload", requestId],
    queryFn: () => vrpProductDetailDownloadRequest({ requestId }), // Wrapped in a function
    refetchOnWindowFocus: false,
    retry:1
  });
  return { data, isError, isPending, isSuccess, refetch };
}

export default useGetVrpProductDetailDownLoad;
