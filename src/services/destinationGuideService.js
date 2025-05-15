/**
 * Service for handling destination guide data operations
 */

// Table name from the provided Tables & Fields JSON
const TABLE_NAME = 'destination_guide';

/**
 * Fetch destination guides with optional filtering
 * @param {Object} params - Search and filter parameters
 * @returns {Promise<Array>} - List of destination guides
 */
export const fetchDestinationGuides = async (params = {}) => {
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
        { Field: { Name: "destination" } },
        { Field: { Name: "country" } },
        { Field: { Name: "offline_saved_at" } }
      ],
      ...params
    };

    const response = await apperClient.fetchRecords(TABLE_NAME, queryParams);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching destination guides:", error);
    throw error;
  }
};

/**
 * Fetch a single destination guide by ID
 * @param {number} guideId - The ID of the destination guide to fetch
 * @returns {Promise<Object>} - The destination guide object
 */
export const getDestinationGuideById = async (guideId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const response = await apperClient.getRecordById(TABLE_NAME, guideId);
    return response.data || null;
  } catch (error) {
    console.error(`Error fetching destination guide with ID ${guideId}:`, error);
    throw error;
  }
};

/**
 * Create a new destination guide
 * @param {Object} guideData - The destination guide data to create
 * @returns {Promise<Object>} - The created destination guide
 */
export const createDestinationGuide = async (guideData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const response = await apperClient.createRecord(TABLE_NAME, { record: guideData });
    return response.data || null;
  } catch (error) {
    console.error("Error creating destination guide:", error);
    throw error;
  }
};

/**
 * Update an existing destination guide
 * @param {number} guideId - The ID of the destination guide to update
 * @param {Object} guideData - The updated destination guide data
 * @returns {Promise<Object>} - The updated destination guide
 */
export const updateDestinationGuide = async (guideId, guideData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const response = await apperClient.updateRecord(TABLE_NAME, {
      record: {
        Id: guideId,
        ...guideData
      }
    });
    return response.data || null;
  } catch (error) {
    console.error(`Error updating destination guide with ID ${guideId}:`, error);
    throw error;
  }
};

/**
 * Delete a destination guide
 * @param {number} guideId - The ID of the destination guide to delete
 * @returns {Promise<boolean>} - True if deletion was successful
 */
export const deleteDestinationGuide = async (guideId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    await apperClient.deleteRecord(TABLE_NAME, { RecordIds: [guideId] });
    return true;
  } catch (error) {
    console.error(`Error deleting destination guide with ID ${guideId}:`, error);
    throw error;
  }
};