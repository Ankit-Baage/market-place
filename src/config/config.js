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
const filterSortEndPoint = "filter?mode=spare";
const filterBrandEndPoint = "filter?mode=brand";
const filterModelEndPoint = "filter?mode=model";
const filterPriceEndPoint = "filter?mode=price";
const spareColorEndPoint = (sellerId, brand, model, part) =>
  `color_details?seller_id=${sellerId}&brand=${brand}&model=${model}&part_name=${part}`;

const spareDetailEndPoint = (requestId) => `details?request_id=${requestId}`;

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

//***********************************************************//

//**Spares***//

export const spareListUrl = `${baseUrl}${version}${mode}${spareListEndPoint}`;

export const spareDetailUrl = (requestId) =>
  `${baseUrl}${version}${mode}${spareListEndPoint}${spareDetailEndPoint(
    requestId
  )}`;

export const spareColorUrl = (sellerId, brand, model, partName) =>
  `${baseUrl}${version}${mode}${spareListEndPoint}${spareColorEndPoint(
    sellerId,
    brand,
    model,
    partName
  )}`;

export const filterSpareUrl = `${baseUrl}${version}${mode}${spareListEndPoint}${filterSortEndPoint}`;
export const filterBrandUrl = `${baseUrl}${version}${mode}${spareListEndPoint}${filterBrandEndPoint}`;
export const filterModelUrl = `${baseUrl}${version}${mode}${spareListEndPoint}${filterModelEndPoint}`;
export const filterPriceUrl = `${baseUrl}${version}${mode}${spareListEndPoint}${filterPriceEndPoint}`;
const spareFilterEndPoint = (filterType) => `filter?mode=${filterType}`;
export const spareFilterUrl = (filterType) =>
  `${baseUrl}${version}${mode}${spareListEndPoint}${spareFilterEndPoint(
    filterType
  )}`;

/////////////********newPhone*********************///////
const newPhoneDetailEndPoint = (requestId) => `details?request_id=${requestId}`;
const newPhoneListEndPoint = "new_phones/";
export const newPhoneListUrl = `${baseUrl}${version}${mode}${newPhoneListEndPoint}`;

const newPhoneFilterEndPoint = (filterType) => `filter?mode=${filterType}`;
export const newPhoneFilterUrl = (filterType) =>
  `${baseUrl}${version}${mode}${newPhoneListEndPoint}${newPhoneFilterEndPoint(
    filterType
  )}`;

export const newPhoneDetailUrl = (requestId) =>
  `${baseUrl}${version}${mode}${newPhoneListEndPoint}${newPhoneDetailEndPoint(
    requestId
  )}`;

const newPhoneColorEndPoint = (sellerId, brand, model, ram, rom) =>
  `color_details?seller_id=${sellerId}&brand=${brand}&model=${model}&ram=${ram}&rom=${rom}`;

export const newPhoneColorUrl = (sellerId, brand, model, ram, rom) =>
  `${baseUrl}${version}${mode}${newPhoneListEndPoint}${newPhoneColorEndPoint(
    sellerId,
    brand,
    model,
    ram,
    rom
  )}`;

  const newPhoneVariantEndPoint = (sellerId, brand, model, color) =>
    `variant_details?seller_id=${sellerId}&brand=${brand}&model=${model}&color=${color}`;
  
  export const newPhoneVariantUrl = (sellerId, brand, model,color) =>
    `${baseUrl}${version}${mode}${newPhoneListEndPoint}${newPhoneVariantEndPoint(
      sellerId,
      brand,
      model,
     color
    )}`;
