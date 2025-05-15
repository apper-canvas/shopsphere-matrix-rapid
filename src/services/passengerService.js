/**
 * Service for handling passenger data operations
 */

// Table name from the provided Tables & Fields JSON
const TABLE_NAME = 'passenger1';

/**
 * Fetch passengers with optional filtering
 * @param {Object} params - Search and filter parameters
 * @returns {Promise<Array>} - List of passengers
 */
export const fetchPassengers = async (params = {}) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Default query parameters
    const queryParams = {
      Fields: [
        { Field: { Name: "Id" } },
        { Field: { Name: "Name" } },
        { Field: { Name: "first_name" } },
        { Field: { Name: "last_name" } },
        { Field: { Name: "dob" } },
        { Field: { Name: "passport_number" } },
        { Field: { Name: "flight_booking" } }
      ],
      ...params
    };

    const response = await apperClient.fetchRecords(TABLE_NAME, queryParams);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching passengers:", error);
    throw error;
  }
};

/**
 * Fetch a single passenger by ID
 * @param {number} passengerId - The ID of the passenger to fetch
 * @returns {Promise<Object>} - The passenger object
 */
export const getPassengerById = async (passengerId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const response = await apperClient.getRecordById(TABLE_NAME, passengerId);
    return response.data || null;
  } catch (error) {
    console.error(`Error fetching passenger with ID ${passengerId}:`, error);
    throw error;
  }
};

/**
 * Create a new passenger
 * @param {Object} passengerData - The passenger data to create
 * @returns {Promise<Object>} - The created passenger
 */
export const createPassenger = async (passengerData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const response = await apperClient.createRecord(TABLE_NAME, { record: passengerData });
    return response.data || null;
  } catch (error) {
    console.error("Error creating passenger:", error);
    throw error;
  }
};

/**
 * Update an existing passenger
 * @param {number} passengerId - The ID of the passenger to update
 * @param {Object} passengerData - The updated passenger data
 * @returns {Promise<Object>} - The updated passenger
 */
export const updatePassenger = async (passengerId, passengerData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const response = await apperClient.updateRecord(TABLE_NAME, {
      record: {
        Id: passengerId,
        ...passengerData
      }
    });
    return response.data || null;
  } catch (error) {
    console.error(`Error updating passenger with ID ${passengerId}:`, error);
    throw error;
  }
};

/**
 * Delete a passenger
 * @param {number} passengerId - The ID of the passenger to delete
 * @returns {Promise<boolean>} - True if deletion was successful
 */
export const deletePassenger = async (passengerId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    await apperClient.deleteRecord(TABLE_NAME, { RecordIds: [passengerId] });
    return true;
  } catch (error) {
    console.error(`Error deleting passenger with ID ${passengerId}:`, error);
    throw error;
  }
};