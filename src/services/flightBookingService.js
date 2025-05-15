/**
 * Service for handling flight booking data operations
 */

// Table name from the provided Tables & Fields JSON
const TABLE_NAME = 'flight_booking';

/**
 * Fetch flight bookings with optional filtering
 * @param {Object} params - Search and filter parameters
 * @returns {Promise<Array>} - List of flight bookings
 */
export const fetchFlightBookings = async (params = {}) => {
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
        { Field: { Name: "origin" } },
        { Field: { Name: "destination" } },
        { Field: { Name: "depart_date" } },
        { Field: { Name: "return_date" } },
        { Field: { Name: "passengers" } },
        { Field: { Name: "trip_type" } },
        { Field: { Name: "flight_number" } },
        { Field: { Name: "airline" } },
        { Field: { Name: "departure_time" } },
        { Field: { Name: "arrival_time" } },
        { Field: { Name: "price" } },
        { Field: { Name: "booking_reference" } }
      ],
      ...params
    };

    const response = await apperClient.fetchRecords(TABLE_NAME, queryParams);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching flight bookings:", error);
    throw error;
  }
};

/**
 * Fetch a single flight booking by ID
 * @param {number} bookingId - The ID of the flight booking to fetch
 * @returns {Promise<Object>} - The flight booking object
 */
export const getFlightBookingById = async (bookingId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const response = await apperClient.getRecordById(TABLE_NAME, bookingId);
    return response.data || null;
  } catch (error) {
    console.error(`Error fetching flight booking with ID ${bookingId}:`, error);
    throw error;
  }
};

/**
 * Create a new flight booking
 * @param {Object} bookingData - The flight booking data to create
 * @returns {Promise<Object>} - The created flight booking
 */
export const createFlightBooking = async (bookingData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const response = await apperClient.createRecord(TABLE_NAME, { record: bookingData });
    return response.data || null;
  } catch (error) {
    console.error("Error creating flight booking:", error);
    throw error;
  }
};

/**
 * Update an existing flight booking
 * @param {number} bookingId - The ID of the flight booking to update
 * @param {Object} bookingData - The updated flight booking data
 * @returns {Promise<Object>} - The updated flight booking
 */
export const updateFlightBooking = async (bookingId, bookingData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const response = await apperClient.updateRecord(TABLE_NAME, {
      record: {
        Id: bookingId,
        ...bookingData
      }
    });
    return response.data || null;
  } catch (error) {
    console.error(`Error updating flight booking with ID ${bookingId}:`, error);
    throw error;
  }
};

/**
 * Delete a flight booking
 * @param {number} bookingId - The ID of the flight booking to delete
 * @returns {Promise<boolean>} - True if deletion was successful
 */
export const deleteFlightBooking = async (bookingId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    await apperClient.deleteRecord(TABLE_NAME, { RecordIds: [bookingId] });
    return true;
  } catch (error) {
    console.error(`Error deleting flight booking with ID ${bookingId}:`, error);
    throw error;
  }
};