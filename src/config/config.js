const baseUrl = "https://dev.backend.mobigarage.com/";
const version = "v1/";
const mode = "mp/";
const role = "accounts/";
const sendOtpEndPoint = "send_otp";
const otpVerificationEndPoint = "verify_otp";
const resendOtpEndPoint = "resend_otp";
const profileDataEndPoint = "get_profile";
const updateProfileDataEndPoint = "update_profile";
const uploadImageEndPoint = "upload?file_name=hmmm.zip";

/**VRP**/

const vrpListEndPoint = "vrp/";
const vrpProductDetailEndPoint = (requestId) =>
  `details?request_id=${requestId}`;

const vrpProductModelTableEndPoint = (requestId) =>
  `item_n_price?request_id=${requestId}`;

const vrpProductBrandTableEndPoint = (requestId) =>
  `brand_details?request_id=${requestId}`;

const vrpProductModelTableExpandedEndPoint = "&mode=all";

const vrpProductLotTableEndPoint = (requestId) =>
  `vrp_wise_details?request_id=${requestId}`;

const vrpProductDetailDownloadEndPoint = "download_file?request_id=";

const vrpSortingListEndPoint = "sorting_list";

//***********************************************************//

//**Spares***//

const spareListEndPoint = "spares/";

export const requestOtpUrl = `${baseUrl}${version}${mode}${role}${sendOtpEndPoint}`;

export const otpVerificationUrl = `${baseUrl}${version}${mode}${role}${otpVerificationEndPoint}`;

export const resendOtpUrl = `${baseUrl}${version}${mode}${role}${resendOtpEndPoint}`;

export const profileDataUrl = `${baseUrl}${version}${mode}${role}${profileDataEndPoint}`;

export const updateProfileDataUrl = `${baseUrl}${version}${mode}${role}${updateProfileDataEndPoint}`;

export const uploadImageUrl = `${baseUrl}${version}${mode}${role}${uploadImageEndPoint}`;

export const vrpListUrl = `${baseUrl}${version}${mode}${vrpListEndPoint}`;

export const vrpProductDetailUrl = (requestId) =>
  `${baseUrl}${version}${mode}${vrpListEndPoint}${vrpProductDetailEndPoint(
    requestId
  )}`;

export const vrpProductModelTableUrl = (requestId) =>
  `${baseUrl}${version}${mode}${vrpListEndPoint}${vrpProductModelTableEndPoint(
    requestId
  )}`;

export const vrpProductBrandTableUrl = (requestId) =>
  `${baseUrl}${version}${mode}${vrpListEndPoint}${vrpProductBrandTableEndPoint(
    requestId
  )}`;

export const vrpProductLotTableUrl = (requestId) =>
  `${baseUrl}${version}${mode}${vrpListEndPoint}${vrpProductLotTableEndPoint(
    requestId
  )}`;

export const vrpProductModelTableExpandedUrl = (requestId) =>
  `${baseUrl}${version}${mode}${vrpListEndPoint}${vrpProductModelTableEndPoint(
    requestId
  )}${vrpProductModelTableExpandedEndPoint}`;

export const vrpProductDetailDownloadUrl = (requestId) =>
  `${baseUrl}${version}${mode}${vrpListEndPoint}${vrpProductDetailDownloadEndPoint}${requestId}`;

export const vrpSortingListUrl = `${baseUrl}${version}${mode}${vrpListEndPoint}${vrpSortingListEndPoint}`;

export const spareListUrl = `${baseUrl}${version}${mode}${spareListEndPoint}`;
