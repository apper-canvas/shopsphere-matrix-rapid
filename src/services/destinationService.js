/**
 * Service for handling destination data operations
 */

// Table name from the provided Tables & Fields JSON
const TABLE_NAME = 'destination';

/**
 * Fetch destinations with optional filtering
 * @param {Object} params - Search and filter parameters
 * @returns {Promise<Array>} - List of destinations
 */
export const fetchDestinations = async (params = {}) => {
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
        { Field: { Name: "country" } },
        { Field: { Name: "continent" } },
        { Field: { Name: "description" } },
        { Field: { Name: "imageUrl" } },
        { Field: { Name: "rating" } },
        { Field: { Name: "reviewCount" } },
        { Field: { Name: "tags" } }
      ],
      ...params
    };

    const response = await apperClient.fetchRecords(TABLE_NAME, queryParams);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching destinations:", error);
    throw error;
  }
};

/**
 * Fetch a single destination by ID
 * @param {number} destinationId - The ID of the destination to fetch
 * @returns {Promise<Object>} - The destination object
 */
export const getDestinationById = async (destinationId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const response = await apperClient.getRecordById(TABLE_NAME, destinationId);
    return response.data || null;
  } catch (error) {
    console.error(`Error fetching destination with ID ${destinationId}:`, error);
    throw error;
  }
};

/**
 * Create a new destination
 * @param {Object} destinationData - The destination data to create
 * @returns {Promise<Object>} - The created destination
 */
export const createDestination = async (destinationData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const response = await apperClient.createRecord(TABLE_NAME, { record: destinationData });
    return response.data || null;
  } catch (error) {
    console.error("Error creating destination:", error);
    throw error;
  }
};

/**
 * Update an existing destination
 * @param {number} destinationId - The ID of the destination to update
 * @param {Object} destinationData - The updated destination data
 * @returns {Promise<Object>} - The updated destination
 */
export const updateDestination = async (destinationId, destinationData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const response = await apperClient.updateRecord(TABLE_NAME, {
      record: {
        Id: destinationId,
        ...destinationData
      }
    });
    return response.data || null;
  } catch (error) {
    console.error(`Error updating destination with ID ${destinationId}:`, error);
    throw error;
  }
};

/**
 * Delete a destination
 * @param {number} destinationId - The ID of the destination to delete
 * @returns {Promise<boolean>} - True if deletion was successful
 */
export const deleteDestination = async (destinationId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    await apperClient.deleteRecord(TABLE_NAME, { RecordIds: [destinationId] });
    return true;
  } catch (error) {
    console.error(`Error deleting destination with ID ${destinationId}:`, error);
    throw error;
  }
};