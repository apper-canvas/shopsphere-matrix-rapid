/**
 * Service for handling trip plan data operations
 */

// Table name from the provided Tables & Fields JSON
const TABLE_NAME = 'trip_plan1';

/**
 * Fetch trip plans with optional filtering
 * @param {Object} params - Search and filter parameters
 * @returns {Promise<Array>} - List of trip plans
 */
export const fetchTripPlans = async (params = {}) => {
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
        { Field: { Name: "trip_name" } },
        { Field: { Name: "created_at" } }
      ],
      ...params
    };

    const response = await apperClient.fetchRecords(TABLE_NAME, queryParams);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching trip plans:", error);
    throw error;
  }
};

/**
 * Fetch a single trip plan by ID
 * @param {number} tripPlanId - The ID of the trip plan to fetch
 * @returns {Promise<Object>} - The trip plan object
 */
export const getTripPlanById = async (tripPlanId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const response = await apperClient.getRecordById(TABLE_NAME, tripPlanId);
    return response.data || null;
  } catch (error) {
    console.error(`Error fetching trip plan with ID ${tripPlanId}:`, error);
    throw error;
  }
};

/**
 * Create a new trip plan
 * @param {Object} tripPlanData - The trip plan data to create
 * @returns {Promise<Object>} - The created trip plan
 */
export const createTripPlan = async (tripPlanData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const response = await apperClient.createRecord(TABLE_NAME, { record: tripPlanData });
    return response.data || null;
  } catch (error) {
    console.error("Error creating trip plan:", error);
    throw error;
  }
};

/**
 * Update an existing trip plan
 * @param {number} tripPlanId - The ID of the trip plan to update
 * @param {Object} tripPlanData - The updated trip plan data
 * @returns {Promise<Object>} - The updated trip plan
 */
export const updateTripPlan = async (tripPlanId, tripPlanData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const response = await apperClient.updateRecord(TABLE_NAME, {
      record: {
        Id: tripPlanId,
        ...tripPlanData
      }
    });
    return response.data || null;
  } catch (error) {
    console.error(`Error updating trip plan with ID ${tripPlanId}:`, error);
    throw error;
  }
};

/**
 * Delete a trip plan
 * @param {number} tripPlanId - The ID of the trip plan to delete
 * @returns {Promise<boolean>} - True if deletion was successful
 */
export const deleteTripPlan = async (tripPlanId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    await apperClient.deleteRecord(TABLE_NAME, { RecordIds: [tripPlanId] });
    return true;
  } catch (error) {
    console.error(`Error deleting trip plan with ID ${tripPlanId}:`, error);
    throw error;
  }
};