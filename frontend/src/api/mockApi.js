/**
 * Temporary mock API client providing simulated backend functionality.
 * Exports identical function signatures to api.js.
 * Uses localStorage to persist created friends and simulated network delay (500ms).
 */

const STORAGE_KEY = "friends_manager_mock_data"

// Initial seed data with high quality avatar URLs and realistic profiles
const INITIAL_FRIENDS = [
  {
    id: "1",
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    role: "Senior Frontend Engineer",
    bio: "Passionate about React, UI design systems, and building accessible web apps. Loves coffee and hiking on weekends.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    createdAt: new Date("2026-01-15").toISOString(),
  },
  {
    id: "2",
    name: "Devon Chen",
    email: "devon.chen@example.com",
    role: "Product Designer",
    bio: "Crafting intuitive visual user experiences and interactive micro-animations. Figma power-user.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    createdAt: new Date("2026-02-01").toISOString(),
  },
  {
    id: "3",
    name: "Sophia Rodriguez",
    email: "sophia.r@example.com",
    role: "Fullstack Developer",
    bio: "Node.js, PostgreSQL, and GraphQL practitioner. Open-source contributor and technical writer.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    createdAt: new Date("2026-02-10").toISOString(),
  },
  {
    id: "4",
    name: "Marcus Vance",
    email: "marcus.vance@example.com",
    role: "DevOps Specialist",
    bio: "Automating cloud deployments, Docker container orchestration, and CI/CD pipelines.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    createdAt: new Date("2026-02-14").toISOString(),
  },
]

// Initialize localStorage if not present
function getStoredFriends() {
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_FRIENDS))
    return INITIAL_FRIENDS
  }
  try {
    return JSON.parse(data)
  } catch {
    return INITIAL_FRIENDS
  }
}

function saveStoredFriends(friends) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(friends))
}

// Utility to simulate artificial network delay
function delay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Mock login function.
 * Accepts any email/password as long as password matches standard test rules or non-empty.
 */
export async function login({ email, password }) {
  await delay(600)

  // Simple mock credentials check: reject invalid format or blank credentials
  if (!email || !password) {
    throw { message: "Email and password are required.", status: 400 }
  }

  if (email === "error@example.com") {
    throw { message: "Invalid email or password.", status: 401 }
  }

  return {
    token: "mock-jwt-token-xyz-123",
    user: {
      id: "user-101",
      name: "Demo Admin",
      email: email,
    },
  }
}

/**
 * Mock getFriends function.
 */
export async function getFriends() {
  await delay(600)
  return getStoredFriends()
}

/**
 * Mock getFriendById function.
 */
export async function getFriendById(id) {
  await delay(500)
  const friends = getStoredFriends()
  const friend = friends.find((f) => String(f.id) === String(id))

  if (!friend) {
    throw { message: `Friend with ID "${id}" was not found.`, status: 404 }
  }

  return friend
}

/**
 * Mock createFriend function.
 */
export async function createFriend(friendData) {
  await delay(700)
  const friends = getStoredFriends()

  const newFriend = {
    id: String(Date.now()),
    name: friendData.name,
    email: friendData.email,
    role: friendData.role || "Friend",
    bio: friendData.bio || "",
    imageUrl: friendData.imageUrl || "",
    createdAt: new Date().toISOString(),
  }

  const updated = [newFriend, ...friends]
  saveStoredFriends(updated)

  return newFriend
}
