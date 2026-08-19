/**
 * Central API Gateway.
 * Components import login, getFriends, getFriendById, and createFriend from this module.
 *
 * TO SWITCH TO THE REAL BACKEND:
 * Swap the uncommented export below from "./mockApi" to "./apiClient".
 */

// Currently active API provider (Mock Mode for prototype testing)
export * from "./mockApi"

// Uncomment below to connect to live backend API:
// export * from "./apiClient"
