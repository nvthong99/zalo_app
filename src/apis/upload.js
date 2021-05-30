import API from './api';

const uploadFile = async ({ formData }) => {
  try {
    const response = await API({
      method: 'POST',
      url: '/uploads/file',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

const uploadFileToCloudinary = async ({ formData }) => {
  try {
    const response = await API({
      method: 'POST',
      url: '/uploads-cloudinary/file',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export { uploadFile, uploadFileToCloudinary };
