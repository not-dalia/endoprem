import axios from 'axios';

const HOST = 'http://localhost:4000'

function postInteraction(logItem) {
  axios.post(`${HOST}/interaction`, logItem)
    .then(function (response) {
      // console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getDownload(id, studyId) {
  return `${HOST}/download?id=${id}&studyId=${studyId}`;
}

async function postSurvey(survey) {
  try {
    let response = await axios.post(`${HOST}/submission`, survey)
    console.log(response.data && response.data.success);
    return response.data && response.data.id;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getSignedS3(file, result) {
  try {
    let response = await axios
      .get(`${HOST}/sign-s3?file-name=endoprem/${encodeURIComponent(file.filename||Date.now())}&file-type=${encodeURIComponent(file.type)}`)

    let uploadedFile = await uploadFile(file, response.data.signedRequest, response.data.url, result)
    if (!uploadedFile) throw new Error('Failed to upload file')
    let uploadUrl = response.data.url

    console.log(response.data && response.data.success);
    return uploadUrl;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function uploadFile(file, signedRequest, url, result) {
  try {
    let options = {
      headers: {
        'Content-Type': file.type
      }
    }
    let response = await axios
      .put(signedRequest, file, options)

    console.log(response.data && response.data.success);
    return response.data && response.data.success;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export {
  postInteraction,
  postSurvey,
  getSignedS3,
  getDownload
}