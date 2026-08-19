/**
 * Real API client wrapper using native fetch.
 * Reads VITE_API_BASE_URL from environment variables.
 * Normalizes error responses into { message, status } objects.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("friends_auth_token")

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  let response
  try {
    response = await fetch(`${BASE_URL}${endpoint}`, config)
  } catch (networkError) {
    throw {
      message: networkError.message || "Network error. Unable to connect to backend server.",
      status: 0,
    }
  }

  let data = null
  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok) {
    throw {
      message: data?.message || data?.error || `Request failed with status ${response.status}`,
      status: response.status,
    }
  }

  return data
}

export async function login(credentials) {
  return request("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  })
}

export async function getFriends() {
  return request("/friends", {
    method: "GET",
  })
}

export async function getFriendById(id) {
  return request(`/friends/${id}`, {
    method: "GET",
  })
}

export async function createFriend(friendData) {
  return request("/friends", {
    method: "POST",
    body: JSON.stringify(friendData),
  })
}
