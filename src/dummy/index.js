import data from "./data.json";

function getPatientData() {
  return Array.from(data.patientrecords);
}

export  default getPatientData;
