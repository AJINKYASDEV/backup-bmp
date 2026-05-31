// pan.mock.js

export const mockPanResponse = ({ panNumber, fullName, dob }) => {
  // simulate invalid PAN
  if (panNumber === "INVALID") {
    return {
      success: false,
      message: "Invalid PAN number",
    };
  }

  return {
    success: true,
    message: "PAN verified successfully (Mock)",
    data: {
      personal_info: {
        pan_number: panNumber,
        provided_name: fullName,
        registered_name: fullName.toUpperCase(),
        first_name: fullName.split(" ")[0],
        last_name: fullName.split(" ")[1] || "",
        gender: "Male",
        pan_type: "Individual",
        date_of_birth: dob,
      },
      contact_info: {
        full_address: "FLAT NO 303, SR NO 17/1A, SAI ENCLAVE-B TUSHAR PARK, Dhanori, DHANORI POLICE STATION, Pune City, Pune411015, Maharashtra, India",
      },
      kyc_status: {
        masked_aadhaar: "XXXX-XXXX-1234",
        aadhaar_linked: true,
        kyc_status: "Verified",
      },
    },
  };
};